import chalk from 'chalk';
import { readConfig } from '../../config/getConfig/readConfig';
import { saveCode } from './saveCode';
import { getTypeDefinitionFromDeclarationWithHelpfulError } from './getTypeDefinitionFromDeclarationWithHelpfulError';
import { defineTypescriptTypesFileCodeFromTypeDefinitions } from './defineTypescriptTypesFileCodeFromTypeDefinition/defineTypescriptTypesFileCodeFromTypeDefinition';
import { defineTypescriptQueryFunctionsFileCodeFromTypeDefinitions } from './defineTypescriptQueryFunctionsFileCodeFromTypeDefinitions/defineTypescriptQueryFunctionsFileCodeFromTypeDefinitions';

export const generate = async ({ configPath }: { configPath: string }) => {
  // 1. read the declarations from config
  const config = await readConfig({ filePath: configPath });

  // 2. get type definitions for each resource and query
  console.log(chalk.bold('Parsing sql and extracting type definitions...')); // tslint:disable-line no-console
  const definitions = config.declarations.map((declaration) =>
    getTypeDefinitionFromDeclarationWithHelpfulError({ declaration }),
  );

  // 3. get the typescript types code and client methods code
  console.log(chalk.bold('Generating types and query functions code...')); // tslint:disable-line no-console
  const typescriptTypesFileCode = defineTypescriptTypesFileCodeFromTypeDefinitions({
    definitions,
  });
  const typescriptQueryFunctionsFileCode = defineTypescriptQueryFunctionsFileCodeFromTypeDefinitions({
    definitions,
    declarations: config.declarations,
    generatedOutputPaths: config.generates,
  });

  // 4. output them to desired files
  await saveCode({
    rootDir: config.rootDir,
    filePath: config.generates.types,
    code: typescriptTypesFileCode,
  });
  await saveCode({
    rootDir: config.rootDir,
    filePath: config.generates.queryFunctions,
    code: typescriptQueryFunctionsFileCode,
  });
};
