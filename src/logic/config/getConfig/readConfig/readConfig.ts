import { GeneratorConfig } from '../../../../domain';
import { getAllPathsMatchingGlobs } from '../getAllPathsMatchingGlobs/getAllPathsMatchingGlobs';
import {
  DeclarationType,
  extractDeclarationFromGlobedFile,
} from './extractDeclarationFromGlobedFile';
import { readYmlFile } from './utils/readYmlFile';

/*
  1. read the yml file
  2. get the connection (i.e., import from the specified connection file)
  3. get the definitions and flatten them
*/
export const readConfig = async ({ filePath }: { filePath: string }) => {
  const configDir = filePath.split('/').slice(0, -1).join('/'); // drops the file name

  // get the yml
  const contents = await readYmlFile({ filePath });

  // get the output dir
  if (!contents.generates) throw new Error('generates key must be defined');
  if (!contents.generates.types)
    throw new Error(
      'generates.types must specify where to output the generated types',
    );

  // get the language and dialect
  if (!contents.language) throw new Error('language must be defined');
  const language = contents.language;
  if (!contents.dialect) throw new Error('dialect must be defined');
  const dialect = `${contents.dialect}`; // ensure that we read it as a string, as it could be a number

  // get the resource declarations
  const resourceGlobs = contents.resources;
  const resourcePaths = await getAllPathsMatchingGlobs({
    globs: resourceGlobs,
    root: configDir,
  });
  const resourceDeclarations = await Promise.all(
    resourcePaths
      .sort() // for determinism in order
      .map((relativePath) =>
        extractDeclarationFromGlobedFile({
          rootDir: configDir,
          relativePath,
          type: DeclarationType.RESOURCE,
        }),
      ),
  );

  // get the query declarations
  const queryDeclarations = await (async () => {
    const queryGlobs = contents.queries;
    if (!queryGlobs) return [];
    const queryPaths = await getAllPathsMatchingGlobs({
      globs: queryGlobs,
      root: configDir,
    });
    return await Promise.all(
      queryPaths
        .sort() // for determinism in order
        .map((relativePath) =>
          extractDeclarationFromGlobedFile({
            rootDir: configDir,
            relativePath,
            type: DeclarationType.QUERY,
          }),
        ),
    );
  })();

  // return the results
  return new GeneratorConfig({
    rootDir: configDir,
    generates: {
      types: contents.generates.types,
      queryFunctions: contents.generates.queryFunctions,
    },
    language,
    dialect,
    declarations: [...resourceDeclarations, ...queryDeclarations],
  });
};
