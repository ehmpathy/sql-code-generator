import { GeneratedOutputPaths, TypeDefinition, TypeDefinitionOfQuery } from '../../../../model';
import { defineTypescriptCommonExportsForQueryFunctions } from './defineTypescriptCommonExportsForQueryFunctions';
import { defineTypescriptFunctionCodeForQueryFunctions } from './defineTypescriptFunctionCodeForQueryFunctions';
import { defineTypescriptImportGeneratedTypesCodeForQueryFunctions } from './defineTypescriptImportGeneratedTypesCodeForQueryFunctions';
import { defineTypescriptImportQuerySqlCodeForQueryFunctions } from './defineTypescriptImportQuerySqlCodeForQueryFunctions';
import { defineTypescriptExecuteQueryWithBestPracticesFunction } from './defineTypescriptExecuteQueryWithBestPracticesFunction';

export const defineTypescriptQueryFunctionsFileCodeFromTypeDefinitions = ({
  definitions,
  generatedOutputPaths,
}: {
  definitions: TypeDefinition[];
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
  });

  // define the common exports
  const commonExportsCode = defineTypescriptCommonExportsForQueryFunctions();

  // define the generic executeQuery function
  const genericExecuteQueryCode = defineTypescriptExecuteQueryWithBestPracticesFunction();

  // define code for query functions
  const queryFunctionsCode = defineTypescriptFunctionCodeForQueryFunctions({ queryDefinitions });

  // merge the codes
  const typescriptQueryFunctionCode = `
import { mysql as prepare } from 'yesql';
${queryImportCode}
${generatedTypesImportCode}

${commonExportsCode}

${genericExecuteQueryCode}

${queryFunctionsCode}
  `.trim();

  // return it
  return `${typescriptQueryFunctionCode}\n`;
};
