import { QueryDefinition, ResourceDefinition, ResourceType } from '../../../../model';
import { flattenDefinitionsRecursive } from './flattenDefinitionsRecursive';
import { readYmlFile } from './utils/readYmlFile';
import { validateAndHydrateDefinitionsYmlContents } from './validateAndHydrateDefinitionsYmlContents';

jest.mock('./utils/readYmlFile');
const readYmlFileMock = readYmlFile as jest.Mock;

jest.mock('./validateAndHydrateDefinitionsYmlContents');
const validateAndHydrateDefinitionsYmlContentsMock = validateAndHydrateDefinitionsYmlContents as jest.Mock;
validateAndHydrateDefinitionsYmlContentsMock.mockResolvedValue([
  new QueryDefinition({
    name: '__NAME__',
    sql: '__SOME_SQL__',
  }),
]);

describe('flattenDefinitionsRecursive', () => {
  beforeEach(() => jest.clearAllMocks());
  it('should return all definitions given to it, if all are DefinitionObjects', async () => {
    // i.e., the end case
    const definitions = [
      new QueryDefinition({
        name: '__NAME__',
        sql: '__SOME_SQL__',
      }),
      new QueryDefinition({
        name: '__NAME__',
        sql: '__SOME_SQL__',
      }),
      new ResourceDefinition({ sql: '__SOME_SQL__', type: ResourceType.TABLE, name: '__SOME_NAME__' }),
    ];
    const returnedDefinitions = await flattenDefinitionsRecursive({ definitions, readRoot: '__READ_ROOT__' });
    expect(returnedDefinitions).toEqual(definitions); // we should just return them all, since theres no flattening to be done
  });
  it('should should attempt to read the contents of a each yml file, if a file path is defined as a definition', async () => {
    const definitions = [
      new QueryDefinition({
        name: '__NAME__',
        sql: '__SOME_SQL__',
      }),
      '../path/to/a/file1.yml',
      new QueryDefinition({
        name: '__NAME__',
        sql: '__SOME_SQL__',
      }),
      '../path/to/a/file2.yml',
      '../path/to/a/file3.yml',
    ];
    await flattenDefinitionsRecursive({ definitions, readRoot: '__READ_ROOT__' });
    expect(readYmlFileMock.mock.calls.length).toEqual(3);
    expect(readYmlFileMock.mock.calls[0][0]).toMatchObject({ filePath: `__READ_ROOT__/${definitions[1]}` }); // check accuracy
    expect(readYmlFileMock.mock.calls[1][0]).toMatchObject({ filePath: `__READ_ROOT__/${definitions[3]}` }); // check accuracy
    expect(readYmlFileMock.mock.calls[2][0]).toMatchObject({ filePath: `__READ_ROOT__/${definitions[4]}` }); // check accuracy
  });
  it('should parse the contents of the yml file into definitions, if a file path is returned as a definition', async () => {
    readYmlFileMock.mockResolvedValueOnce(['__CONTENT_1__', '__CONTENT_2__', '__CONTENT_3__']);
    validateAndHydrateDefinitionsYmlContentsMock.mockResolvedValueOnce([
      new QueryDefinition({
        name: '__NAME__',
        sql: '__SOME_SQL__',
      }),
      new QueryDefinition({
        name: '__NAME__',
        sql: '__SOME_SQL__',
      }),
    ]);
    const definitions = [
      new QueryDefinition({
        name: '__NAME__',
        sql: '__SOME_SQL__',
      }),
      '../path/to/a/file.yml', // a file to hydrate
      new QueryDefinition({
        name: '__NAME__',
        sql: '__SOME_SQL__',
      }),
    ];
    const returnedDefinitions = await flattenDefinitionsRecursive({ definitions, readRoot: '__READ_ROOT__' });
    expect(returnedDefinitions).toEqual([
      new QueryDefinition({
        name: '__NAME__',
        sql: '__SOME_SQL__',
      }),
      new QueryDefinition({
        name: '__NAME__',
        sql: '__SOME_SQL__',
      }),
      new QueryDefinition({
        name: '__NAME__',
        sql: '__SOME_SQL__',
      }),
      new QueryDefinition({
        name: '__NAME__',
        sql: '__SOME_SQL__',
      }),
    ]);
  });
  describe('paths should be relative to the file they were defined in; derive relative root from flattened configs', () => {
    it('should use new readRoot for validateAndHydrateDefinitionsYmlContents', async () => {
      const definitions = ['../path/to/a/file.yml'];
      await flattenDefinitionsRecursive({ definitions, readRoot: '__READ_ROOT__' });

      // check that hydration was done with the new read root
      expect(validateAndHydrateDefinitionsYmlContentsMock.mock.calls.length).toEqual(1);
      expect(validateAndHydrateDefinitionsYmlContentsMock.mock.calls[0][0]).toMatchObject({
        readRoot: '__READ_ROOT__/../path/to/a', // now we're relative to the file that we imported
      });
    });
    it('should use new readRoot for the recursion', async () => {
      // note: only way to check this is to recurse twice
      const definitions = ['../path/to/a/file.yml'];
      validateAndHydrateDefinitionsYmlContentsMock.mockResolvedValueOnce(['../another/relative/path.yml']);
      await flattenDefinitionsRecursive({ definitions, readRoot: '__READ_ROOT__' });

      // check that hydration was done with the new read root - twise (second time for the second recursion)
      expect(validateAndHydrateDefinitionsYmlContentsMock.mock.calls.length).toEqual(2);
      expect(validateAndHydrateDefinitionsYmlContentsMock.mock.calls[0][0]).toMatchObject({
        readRoot: '__READ_ROOT__/../path/to/a', // now we're relative to the file that we imported
      });
      expect(validateAndHydrateDefinitionsYmlContentsMock.mock.calls[1][0]).toMatchObject({
        readRoot: '__READ_ROOT__/../path/to/a/../another/relative', // now we're relative to the second file that we imported
      });
    });
  });
});
