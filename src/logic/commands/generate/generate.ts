import chalk from 'chalk';
import { readConfig } from '../../config/getConfig/readConfig';
import { saveCode } from './saveCode';
import { defineTypescriptTypesFileCodeFromTypeDefinitions } from './defineTypescriptTypesFileCodeFromTypeDefinition/defineTypescriptTypesFileCodeFromTypeDefinition';
import { defineTypescriptQueryFunctionsFileCodeFromTypeDefinitions } from './defineTypescriptQueryFunctionsFileCodeFromTypeDefinitions/defineTypescriptQueryFunctionsFileCodeFromTypeDefinitions';
import { extractTypeDefinitionsFromDeclarations } from './extractTypeDefinitionsFromDeclarations/extractTypeDefinitionsFromDeclarations';

export const generate = async ({ configPath }: { configPath: string }) => {
  //  read the declarations from config
  const config = await readConfig({ filePath: configPath });

  // get type definitions for each resource and query
  console.log(chalk.bold('Parsing sql and extracting type definitions...\n')); // tslint:disable-line no-console
  const definitions = extractTypeDefinitionsFromDeclarations({
    language: config.language,
    declarations: config.declarations,
  });

  // begin generating the output code files
  console.log(chalk.bold('Generating code...\n')); // tslint:disable-line no-console

  // output the type definitions code
  const typescriptTypesFileCode = defineTypescriptTypesFileCodeFromTypeDefinitions({
    definitions,
  });
  await saveCode({
    rootDir: config.rootDir,
    filePath: config.generates.types,
    code: typescriptTypesFileCode,
  });

  // output the query functions (if requested)
  if (config.generates.queryFunctions) {
    const typescriptQueryFunctionsFileCode = defineTypescriptQueryFunctionsFileCodeFromTypeDefinitions({
      definitions,
      language: config.language,
      generatedOutputPaths: config.generates,
    });
    await saveCode({
      rootDir: config.rootDir,
      filePath: config.generates.queryFunctions,
      code: typescriptQueryFunctionsFileCode,
    });
  }
};
