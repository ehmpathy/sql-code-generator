import chalk from 'chalk';
import { readConfig } from '../../config/getConfig/readConfig';
import { saveCode } from './saveCode';
import { defineTypescriptTypesFileCodeFromTypeDefinitions } from './defineTypescriptTypesFileCodeFromTypeDefinition/defineTypescriptTypesFileCodeFromTypeDefinition';
import { defineTypescriptQueryFunctionsFileCodeFromTypeDefinitions } from './defineTypescriptQueryFunctionsFileCodeFromTypeDefinitions/defineTypescriptQueryFunctionsFileCodeFromTypeDefinitions';
import { extractTypeDefinitionsFromDeclarations } from './extractTypeDefinitionsFromDeclarations/extractTypeDefinitionsFromDeclarations';

export const generate = async ({ configPath }: { configPath: string }) => {
  // 1. read the declarations from config
  const config = await readConfig({ filePath: configPath });

  // 2. get type definitions for each resource and query
  console.log(chalk.bold('Parsing sql and extracting type definitions...\n')); // tslint:disable-line no-console
  const definitions = extractTypeDefinitionsFromDeclarations({
    language: config.language,
    declarations: config.declarations,
  });

  // 3. get the typescript types code and client methods code
  console.log(chalk.bold('Generating types and query functions code...\n')); // tslint:disable-line no-console
  const typescriptTypesFileCode = defineTypescriptTypesFileCodeFromTypeDefinitions({
    definitions,
  });
  const typescriptQueryFunctionsFileCode = defineTypescriptQueryFunctionsFileCodeFromTypeDefinitions({
    definitions,
    language: config.language,
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
