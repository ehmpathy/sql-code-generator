import { camelCase } from 'change-case';
import { castQueryNameToTypescriptTypeName } from '../common/castQueryNameToTypescriptTypeName';

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
export const defineTypescriptClientMethodForQuery = ({
  name,
  relativePathToQueryExport,
}: {
  name: string;
  relativePathToQueryExport: string;
}) => {
  const typescriptTypeName = castQueryNameToTypescriptTypeName({ name });
  const inputTypeName = `${typescriptTypeName}Input`;
  const outputTypeName = `${typescriptTypeName}Output`;
  const typescriptClientMethodName = camelCase(typescriptTypeName); // i.e., same as typename, except camel case
  const clientMethodDefinition = `
import { mysql as prepare } from 'yesql';
import { query } from '${relativePathToQueryExport}';
import { ${inputTypeName}, ${outputTypeName} } from '../types';
import { DatabaseExecuteCommand, LogMethod } from './common';

export const ${typescriptClientMethodName} = async ({
  dbExecute,
  logDebug,
  input,
}: {
  dbExecute: DatabaseExecuteCommand;
  logDebug: LogMethod;
  input: ${inputTypeName};
}): Promise<${outputTypeName}[]> => {
  // 1. define the query with yesql
  const { sql: preparedSql, values: preparedValues } = prepare(query)(input);

  // 2. log that we're running the request
  logDebug('${typescriptClientMethodName}.input', { input });

  // 3. execute the query
  const output = await dbExecute({ sql: preparedSql, values: preparedValues });

  // 4. log that we've executed the request
  logDebug('${typescriptClientMethodName}.output', { output });

  // 5. return the output
  return output;
};
  `.trim();
  return clientMethodDefinition;
};
