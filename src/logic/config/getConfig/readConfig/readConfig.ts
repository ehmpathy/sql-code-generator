import { ControlConfig } from '../../../../types';
import { readYmlFile } from './_utils/readYmlFile';
import { getReadFilePath } from './_utils/getReadFilePath';
import { validateAndHydrateDefinitionsYmlContents } from './validateAndHydrateDefinitionsYmlContents';
import { flattenDefinitionsRecursive } from './flattenDefinitionsRecursive';
import { getConnectionConfig } from './getConnectionConfig';

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

  // determine if schema control should be strict
  const strict = contents.strict === undefined ? true : contents.strict;
  if (typeof strict !== 'boolean') throw new Error('strict must be a boolean');

  // get the connection config
  if (!contents.connection) throw new Error('connection must be defined');
  const connectionPath = contents.connection;
  const connection = await getConnectionConfig({
    modulePath: getReadFilePath({ readRoot: configDir, relativePath: connectionPath }),
  }); // NOTE: we expect connection path to be relative to the config path

  // get the resource and change definitions
  if (!contents.definitions) throw new Error('definitions must be defined');
  const definitionContents = contents.definitions;
  const nestedDefinitions = await validateAndHydrateDefinitionsYmlContents({
    readRoot: configDir,
    contents: definitionContents,
  });
  const definitions = await flattenDefinitionsRecursive({ readRoot: configDir, definitions: nestedDefinitions });

  // return the results
  return new ControlConfig({
    language,
    dialect,
    strict,
    connection,
    definitions,
  });
};
