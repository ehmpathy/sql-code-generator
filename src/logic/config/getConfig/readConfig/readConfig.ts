import { readYmlFile } from './utils/readYmlFile';
import { validateAndHydrateDefinitionsYmlContents } from './validateAndHydrateDefinitionsYmlContents';
import { flattenDefinitionsRecursive } from './flattenDefinitionsRecursive';
import { GeneratorConfig } from '../../../../model';

/*
  1. read the yml file
  2. get the connection (i.e., import from the specified connection file)
  3. get the definitions and flatten them
*/
export const readConfig = async ({ filePath }: { filePath: string }) => {
  const configDir = filePath
    .split('/')
    .slice(0, -1)
    .join('/'); // drops the file name

  // get the yml
  const contents = await readYmlFile({ filePath });

  // get the language
  if (!contents.language) throw new Error('language must be defined');
  const language = contents.language;

  if (!contents.dialect) throw new Error('dialect must be defined');
  const dialect = `${contents.dialect}`; // ensure that we read it as a string, as it could be a number

  // get the resource and query definitions
  if (!contents.definitions) throw new Error('definitions must be defined');
  const definitionContents = contents.definitions;
  const nestedDefinitions = await validateAndHydrateDefinitionsYmlContents({
    readRoot: configDir,
    contents: definitionContents,
  });
  const definitions = await flattenDefinitionsRecursive({ readRoot: configDir, definitions: nestedDefinitions });

  // return the results
  return new GeneratorConfig({
    language,
    dialect,
    definitions,
  });
};
