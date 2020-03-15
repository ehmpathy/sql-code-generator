import { TypeDefinitionOfQuery, GeneratedOutputPaths } from '../../../../model';
import { defineTypescriptQueryFunctionForQuery } from '../../../typeDefinitionsToCode/query/defineTypescriptQueryFunctionForQuery';
import { getRelativePathFromFileToFile } from './utils/getRelativePathFromFileToFile';

const defineTypescriptImportQuerySqlCodeForAQueryFunction = ({
  definition,
  generatedOutputPaths,
}: {
  definition: TypeDefinitionOfQuery;
  generatedOutputPaths: GeneratedOutputPaths; // to find the relative path from here to the sql declaration file path
}) => {
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
    .sort((a, b) => (a.name < b.name ? -1 : 1))
    .map((definition) => defineTypescriptImportQuerySqlCodeForAQueryFunction({ definition, generatedOutputPaths }));

  // define the import code
  const importCode = `
${importStatements.join('\n')}
  `.trim();

  // return it
  return importCode;
};
