import { TypeDefinitionOfQuery, GeneratedOutputPaths } from '../../../../model';
import { defineTypescriptQueryFunctionForQuery } from '../../../typeDefinitionsToCode/query/defineTypescriptQueryFunctionForQuery';
import { QueryFunctionsOutputPathNotDefinedButRequiredError } from './QueryFunctionsOutputPathNotDefinedError';
import { getRelativePathFromFileToFile } from './utils/getRelativePathFromFileToFile';

const defineTypescriptImportQuerySqlCodeForAQueryFunction = ({
  definition,
  generatedOutputPaths,
}: {
  definition: TypeDefinitionOfQuery;
  generatedOutputPaths: GeneratedOutputPaths; // to find the relative path from here to the sql declaration file path
}) => {
  // check that the query functions output path was defined; if it was not, this code path should not have been called so fail fast
  if (!generatedOutputPaths.queryFunctions) throw new QueryFunctionsOutputPathNotDefinedButRequiredError();

  // determine the path from the generated code to the query sql export
  const relativePathToExport = getRelativePathFromFileToFile({
    fromFile: generatedOutputPaths.queryFunctions,
    toFile: definition.path,
  });

  // determine the query name alias to use for this function
  const importAlias = defineTypescriptQueryFunctionForQuery({ name: definition.name }).imports.queryNameAlias;

  // return the import statement
  return `import { sql as ${importAlias} } from '${relativePathToExport}';`;
};

export const defineTypescriptImportQuerySqlCodeForQueryFunctions = ({
  queryDefinitions,
  generatedOutputPaths,
}: {
  queryDefinitions: TypeDefinitionOfQuery[];
  generatedOutputPaths: GeneratedOutputPaths;
}) => {
  // define all of the imports needed
  const importStatements = queryDefinitions
    .sort((a, b) => (a.path < b.path ? -1 : 1))
    .map((definition) => defineTypescriptImportQuerySqlCodeForAQueryFunction({ definition, generatedOutputPaths }));

  // define the import code
  const importCode = `
${importStatements.join('\n')}
  `.trim();

  // return it
  return importCode;
};
