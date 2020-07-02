import { DatabaseLanguage, GeneratedOutputPaths, TypeDefinition, TypeDefinitionOfQuery } from '../../../../model';
import { defineTypescriptCommonExportsForQueryFunctions } from './defineTypescriptCommonExportsForQueryFunctions';
import { defineTypescriptExecuteQueryWithBestPracticesFunction } from './defineTypescriptExecuteQueryWithBestPracticesFunction';
import { defineTypescriptFunctionCodeForQueryFunctions } from './defineTypescriptFunctionCodeForQueryFunctions';
import { defineTypescriptImportGeneratedTypesCodeForQueryFunctions } from './defineTypescriptImportGeneratedTypesCodeForQueryFunctions';
import { defineTypescriptImportQuerySqlCodeForQueryFunctions } from './defineTypescriptImportQuerySqlCodeForQueryFunctions';

export const defineTypescriptQueryFunctionsFileCodeFromTypeDefinitions = ({
  language,
  definitions,
  generatedOutputPaths,
}: {
  language: DatabaseLanguage;
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

  // define the "prepare" module (i.e., yesql) import
  const prepareModuleImportCode = (() => {
    if (language === DatabaseLanguage.MYSQL) return "import { mysql as prepare } from 'yesql';";
    if (language === DatabaseLanguage.POSTGRES) return "import { pg as prepare } from 'yesql';";
    throw new Error('unsupported language');
  })();

  // define the common exports
  const commonExportsCode = defineTypescriptCommonExportsForQueryFunctions({ language });

  // define the generic executeQuery function
  const genericExecuteQueryCode = defineTypescriptExecuteQueryWithBestPracticesFunction({ language });

  // define code for query functions
  const queryFunctionsCode = defineTypescriptFunctionCodeForQueryFunctions({ queryDefinitions });

  // merge the codes
  const typescriptQueryFunctionCode = `
${prepareModuleImportCode}
${queryImportCode}
${generatedTypesImportCode}

${commonExportsCode}

${genericExecuteQueryCode}

${queryFunctionsCode}
  `.trim();

  // return it
  return `${typescriptQueryFunctionCode}\n`;
};
