import { TypeDefinitionOfQuery, GeneratedOutputPaths, QueryDeclaration, ResourceDeclaration } from '../../../../model';
import { defineTypescriptQueryFunctionForQuery } from '../../../typeDefinitionsToCode/query/defineTypescriptQueryFunctionForQuery';
import { getRelativePathFromFileToFile } from './utils/getRelativePathFromFileToFile';

const defineTypescriptImportQuerySqlCodeForAQueryFunction = ({
  definition,
  declarations,
  generatedOutputPaths,
}: {
  definition: TypeDefinitionOfQuery;
  declarations: (QueryDeclaration | ResourceDeclaration)[]; // to find it's declaration, to know from where to import the sql
  generatedOutputPaths: GeneratedOutputPaths; // to find the relative path from here to the sql declaration file path
}) => {
  // find the declaration for the query
  const declarationForQuery = declarations.find(
    (declaration) => declaration instanceof QueryDeclaration && declaration.name === definition.name,
  );
  if (!declarationForQuery) throw new Error('unexpected; could not find declaration for query definition'); // fail fast

  // determine the path from the generated code to the query sql export
  const relativePathToExport = getRelativePathFromFileToFile({
    fromFile: generatedOutputPaths.queryFunctions,
    toFile: declarationForQuery.path,
  });

  // determine the query name alias to use for this function
  const importAlias = defineTypescriptQueryFunctionForQuery({ name: definition.name }).imports.queryNameAlias;

  // return the import statement
  return `import { query as ${importAlias} } from '${relativePathToExport}'`;
};

export const defineTypescriptImportQuerySqlCodeForQueryFunctions = ({
  queryDefinitions,
  declarations,
  generatedOutputPaths,
}: {
  queryDefinitions: TypeDefinitionOfQuery[];
  declarations: (QueryDeclaration | ResourceDeclaration)[];
  generatedOutputPaths: GeneratedOutputPaths;
}) => {
  // define all of the imports needed
  const importStatements = queryDefinitions
    .sort((a, b) => (a.name < b.name ? -1 : 1))
    .map((definition) =>
      defineTypescriptImportQuerySqlCodeForAQueryFunction({ definition, declarations, generatedOutputPaths }),
    );

  // define the import code
  const importCode = `
${importStatements.join('\n')}
  `.trim();

  // return it
  return importCode;
};
