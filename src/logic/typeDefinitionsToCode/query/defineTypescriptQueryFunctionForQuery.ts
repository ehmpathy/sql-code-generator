import { camelCase } from 'change-case';
import { castQueryNameToTypescriptTypeName } from '../common/castQueryNameToTypescriptTypeName';

export interface QueryFunctionDefinition {
  code: string;
  imports: {
    queryNameAlias: string;
    generatedTypes: string[];
  };
}

/**
 * given:
 * - typescript type definition of input and output
 *
 * produce:
 * - typescript function that gets the inputs and returns promise of output
 * - typescript function that calls database in best practice way
 *   - uses yesql to pass inputs into parameterized statement
 *   - parses result and extracts output
 *   - logs inputs and output stats
 */
export const defineTypescriptQueryFunctionForQuery = ({ name }: { name: string }): QueryFunctionDefinition => {
  const typescriptTypeName = castQueryNameToTypescriptTypeName({ name });

  // define the query name alias, import { query as ... } under
  const queryNameAlias = `${camelCase(typescriptTypeName)}Sql`; // i.e., sqlQueryUpsertUserSql

  // define the generated types to import
  const outputTypeName = `${typescriptTypeName}Output`;
  const inputTypeName = `${typescriptTypeName}Input`;
  const generatedTypesToImport = [inputTypeName, outputTypeName];

  // define the function body
  const typescriptQueryFunctionName = camelCase(typescriptTypeName); // i.e., same as typename, except camel case
  const queryFunctionDefinition = `
export const ${typescriptQueryFunctionName} = async ({
  dbExecute,
  logDebug,
  input,
}: {
  dbExecute: DatabaseExecuteCommand;
  logDebug: LogMethod;
  input: ${inputTypeName};
}): Promise<${outputTypeName}[]> => {
  // 1. define the query with yesql
  const { sql: preparedSql, values: preparedValues } = prepare(${queryNameAlias})(input || {});

  // 2. log that we're running the request
  logDebug('${typescriptQueryFunctionName}.input', { input });

  // 3. execute the query
  const [output] = await dbExecute({ sql: preparedSql, values: preparedValues });

  // 4. log that we've executed the request
  logDebug('${typescriptQueryFunctionName}.output', { output });

  // 5. return the output
  return output;
};
  `.trim();
  return {
    imports: {
      queryNameAlias,
      generatedTypes: generatedTypesToImport,
    },
    code: queryFunctionDefinition,
  };
};
