import {
  GeneratedOutputPaths,
  QueryDeclaration,
  ResourceDeclaration,
  TypeDefinition,
  TypeDefinitionOfQuery,
} from '../../../../model';
import { defineTypescriptCommonExportsForQueryFunctions } from './defineTypescriptCommonExportsForQueryFunctions';
import { defineTypescriptFunctionCodeForQueryFunctions } from './defineTypescriptFunctionCodeForQueryFunctions';
import { defineTypescriptImportGeneratedTypesCodeForQueryFunctions } from './defineTypescriptImportGeneratedTypesCodeForQueryFunctions';
import { defineTypescriptImportQuerySqlCodeForQueryFunctions } from './defineTypescriptImportQuerySqlCodeForQueryFunctions';

export const defineTypescriptQueryFunctionsFileCodeFromTypeDefinitions = ({
  definitions,
  declarations,
  generatedOutputPaths,
}: {
  definitions: TypeDefinition[];
  declarations: (ResourceDeclaration | QueryDeclaration)[];
  generatedOutputPaths: GeneratedOutputPaths;
}) => {
  // pick out all query definitions
  const queryDefinitions = definitions.filter(
    (def): def is TypeDefinitionOfQuery => def instanceof TypeDefinitionOfQuery,
  );

  // define all of the required imports for query functions
  const generatedTypesImportCode = defineTypescriptImportGeneratedTypesCodeForQueryFunctions({
    queryDefinitions,
    generatedOutputPaths,
  });

  // define all of the query imports, based on query function defs
  const queryImportCode = defineTypescriptImportQuerySqlCodeForQueryFunctions({
    queryDefinitions,
    generatedOutputPaths,
    declarations,
  });

  // define the common exports
  const commonExportsCode = defineTypescriptCommonExportsForQueryFunctions();

  // define code for query functions
  const queryFunctionsCode = defineTypescriptFunctionCodeForQueryFunctions({ queryDefinitions });

  // merge the codes
  const typescriptQueryFunctionCode = `
import { mysql as prepare } from 'yesql';
${queryImportCode}
${generatedTypesImportCode}

${commonExportsCode}

${queryFunctionsCode}
  `.trim();

  // return it
  return `${typescriptQueryFunctionCode}\n`;
};
