import { hydrateResourceDefinitionContent } from './hydrateResourceDefinitionContent';
import { readFileAsync } from './../../../../_utils/readFileAsync';
import { InvalidDefinitionError } from '../errors';
import { ResourceDefinition, DefinitionType, ResourceType } from '../../../../../../types';
import { extractResourceTypeAndNameFromDDL } from './extractResourceTypeAndNameFromDDL';

jest.mock('./../../../../_utils/readFileAsync');
const readFileAsyncMock = readFileAsync as jest.Mock;
readFileAsyncMock.mockResolvedValue('__SQL_CONTENTS__');

jest.mock('./extractResourceTypeAndNameFromDDL');
const extractResourceTypeAndNameFromDDLMock = extractResourceTypeAndNameFromDDL as jest.Mock;
extractResourceTypeAndNameFromDDLMock.mockReturnValue({
  name: '__RESOURCE_NAME__',
  type: ResourceType.FUNCTION,
});

describe('hydrate change definition content', () => {
  beforeEach(() => jest.clearAllMocks());
  it('should throw an error if the path is not defiend', async () => {
    try {
      await hydrateResourceDefinitionContent({ readRoot: '__READ_ROOT__', content: {} });
      throw new Error('should not reach here');
    } catch (error) {
      expect(error.constructor).toEqual(InvalidDefinitionError);
      expect(error.explanation).toEqual('path must be defined');
    }
  });
  it('should throw an error if the extension is not .sql', async () => {
    try {
      await hydrateResourceDefinitionContent({ readRoot: '__READ_ROOT__', content: { path: 'somefile.json' } });
      throw new Error('should not reach here');
    } catch (error) {
      expect(error.constructor).toEqual(InvalidDefinitionError);
      expect(error.explanation).toEqual('path must specify a .sql file');
    }
  });
  it('should get the sql content from the path', async () => {
    const exampleContent = {
      type: DefinitionType.RESOURCE,
      path: '__FILE_PATH__.sql',
    };
    await hydrateResourceDefinitionContent({ readRoot: '__READ_ROOT__', content: exampleContent });
    expect(readFileAsyncMock.mock.calls.length).toEqual(1);
    expect(readFileAsyncMock.mock.calls[0][0]).toMatchObject({
      filePath: '__READ_ROOT__/__FILE_PATH__.sql',
    });
  });
  it('should get the type and name from extractResourceTypeAndNameFromDDL', async () => {
    const exampleContent = {
      type: DefinitionType.RESOURCE,
      path: '__FILE_PATH__.sql',
    };
    await hydrateResourceDefinitionContent({ readRoot: '__READ_ROOT__', content: exampleContent });
    expect(extractResourceTypeAndNameFromDDLMock.mock.calls.length).toEqual(1);
    expect(extractResourceTypeAndNameFromDDLMock.mock.calls[0][0]).toMatchObject({
      ddl: '__SQL_CONTENTS__',
    });
  });
  it('should return a ResourceDefinition object', async () => {
    const exampleContent = {
      type: DefinitionType.RESOURCE,
      path: '__FILE_PATH__.sql',
    };
    const result = await hydrateResourceDefinitionContent({ readRoot: '__READ_ROOT__', content: exampleContent });
    expect(result.constructor).toEqual(ResourceDefinition);
    expect(result.sql).toEqual('__SQL_CONTENTS__');
    expect(result.path).toEqual(exampleContent.path);
    expect(result.name).toEqual('__RESOURCE_NAME__');
    expect(result.type).toEqual(ResourceType.FUNCTION);
  });
});
