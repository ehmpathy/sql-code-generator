import { DatabaseLanguage, GeneratorConfig, QueryDefinition } from '../../../../model';
import { flattenDefinitionsRecursive } from './flattenDefinitionsRecursive';
import { readConfig } from './readConfig';
import { readYmlFile } from './utils/readYmlFile';
import { validateAndHydrateDefinitionsYmlContents } from './validateAndHydrateDefinitionsYmlContents';

jest.mock('./utils/readYmlFile');
const readYmlFileMock = readYmlFile as jest.Mock;
readYmlFileMock.mockResolvedValue({
  language: DatabaseLanguage.MYSQL,
  dialect: '__DIALECT__',
  connection: './__CONNECTION_PATH__',
  definitions: ['__DEF_1__', '__DEF_2__'],
});

jest.mock('./flattenDefinitionsRecursive');
const flattenDefinitionsRecursiveMock = flattenDefinitionsRecursive as jest.Mock;
const exampleDefinitions = [
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
];
flattenDefinitionsRecursiveMock.mockResolvedValue(exampleDefinitions);

jest.mock('./validateAndHydrateDefinitionsYmlContents');
const validateAndHydrateDefinitionsYmlContentsMock = validateAndHydrateDefinitionsYmlContents as jest.Mock;

describe('readConfig', () => {
  beforeEach(() => jest.clearAllMocks());
  it('should read the yml file at the file path specified', async () => {
    await readConfig({ filePath: '__CONFIG_PATH__' });
    expect(readYmlFileMock.mock.calls.length).toEqual(1);
    expect(readYmlFileMock.mock.calls[0][0]).toMatchObject({ filePath: '__CONFIG_PATH__' });
  });
  it('throws an error if language is not defined', async () => {
    readYmlFileMock.mockResolvedValueOnce({
      dialect: '__DIALECT__',
      connection: '__CONNECTION_PATH__',
      definitions: ['__DEF_1__', '__DEF_2__'],
    });
    try {
      await readConfig({ filePath: '__CONFIG_PATH__' });
    } catch (error) {
      expect(error.message).toEqual('language must be defined');
    }
  });
  it('throws an error if dialect is not defined', async () => {
    readYmlFileMock.mockResolvedValueOnce({
      language: DatabaseLanguage.MYSQL,
      connection: '__CONNECTION_PATH__',
      definitions: ['__DEF_1__', '__DEF_2__'],
    });
    try {
      await readConfig({ filePath: '__CONFIG_PATH__' });
    } catch (error) {
      expect(error.message).toEqual('dialect must be defined');
    }
  });
  it('throws an error if strict is not a boolean', async () => {
    readYmlFileMock.mockResolvedValueOnce({
      language: DatabaseLanguage.MYSQL,
      dialect: '__DIALECT__',
      connection: '__CONNECTION_PATH__',
      definitions: ['__DEF_1__', '__DEF_2__'],
      strict: 'true',
    });
    try {
      await readConfig({ filePath: '__CONFIG_PATH__' });
    } catch (error) {
      expect(error.message).toEqual('strict must be a boolean');
    }
  });
  it('throws an error if connection is not defined', async () => {
    readYmlFileMock.mockResolvedValueOnce({
      language: DatabaseLanguage.MYSQL,
      dialect: '__DIALECT__',
      definitions: ['__DEF_1__', '__DEF_2__'],
    });
    try {
      await readConfig({ filePath: '__CONFIG_PATH__' });
    } catch (error) {
      expect(error.message).toEqual('connection must be defined');
    }
  });
  it('gets and flattens the definitions', async () => {
    validateAndHydrateDefinitionsYmlContentsMock.mockResolvedValueOnce([
      '__HYDRATED_DEF_ONE__',
      '__HYDRATED_DEF_TWO__',
    ]);
    await readConfig({ filePath: '__CONFIG_DIR__/control.yml' });
    expect(validateAndHydrateDefinitionsYmlContentsMock.mock.calls.length).toEqual(1);
    expect(validateAndHydrateDefinitionsYmlContentsMock.mock.calls[0][0]).toMatchObject({
      contents: ['__DEF_1__', '__DEF_2__'],
    });
    expect(flattenDefinitionsRecursiveMock.mock.calls.length).toEqual(1);
    expect(flattenDefinitionsRecursiveMock.mock.calls[0][0]).toMatchObject({
      definitions: ['__HYDRATED_DEF_ONE__', '__HYDRATED_DEF_TWO__'],
      readRoot: '__CONFIG_DIR__',
    });
  });
  it('should return the full config - default strict to true', async () => {
    const config = await readConfig({ filePath: '__CONFIG_DIR__/control.yml' });
    expect(config.constructor).toEqual(GeneratorConfig);
    expect(config).toEqual({
      language: DatabaseLanguage.MYSQL,
      dialect: '__DIALECT__',
      definitions: exampleDefinitions,
    });
  });
});
