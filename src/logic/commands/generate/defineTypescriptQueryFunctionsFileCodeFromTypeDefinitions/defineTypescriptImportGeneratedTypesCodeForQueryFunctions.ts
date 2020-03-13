import { TypeDefinitionOfQuery, GeneratedOutputPaths } from '../../../../model';
import { defineTypescriptQueryFunctionForQuery } from '../../../typeDefinitionsToCode/query/defineTypescriptQueryFunctionForQuery';
import { getRelativePathFromFileToFile } from './utils/getRelativePathFromFileToFile';

export const defineTypescriptImportGeneratedTypesCodeForQueryFunctions = ({
  queryDefinitions,
  generatedOutputPaths,
}: {
  queryDefinitions: TypeDefinitionOfQuery[];
  generatedOutputPaths: GeneratedOutputPaths;
}) => {
  // define all of the imports needed
  const generatedTypesToImport = queryDefinitions
    .map((def) => defineTypescriptQueryFunctionForQuery({ name: def.name }).imports.generatedTypes)
    .flat()
    .sort();

  // define the path to the generated imports file from the generated query functions file
  const pathToGeneratedImports = getRelativePathFromFileToFile({
    fromFile: generatedOutputPaths.queryFunctions,
    toFile: generatedOutputPaths.types,
  });

  // define the import code
  const importCode = `
import {
  ${generatedTypesToImport.join(',\n  ')},
} from '${pathToGeneratedImports}';
  `.trim();

  // return it
  return importCode;
};
