import { ResourceDeclaration, ResourceType } from '../../../../../model';
import { extractSqlFromFile } from '../../../../common/extractSqlFromFile';
import { extractResourceDeclarationFromGlobedFile } from './extractResourceDeclarationFromGlobedFile';
import { extractResourceTypeAndNameFromDDL } from './extractResourceTypeAndNameFromDDL';

jest.mock('./extractResourceTypeAndNameFromDDL');
const extractResourceTypeAndNameFromDDLMock = extractResourceTypeAndNameFromDDL as jest.Mock;
extractResourceTypeAndNameFromDDLMock.mockReturnValue({
  name: '__RESOURCE_NAME__',
  type: ResourceType.FUNCTION,
});

jest.mock('../../../../common/extractSqlFromFile');
const getSqlFromFileMock = extractSqlFromFile as jest.Mock;
getSqlFromFileMock.mockResolvedValue('__SQL_CONTENTS__');

describe('extractResourceDeclarationFromGlobedFile', () => {
  beforeEach(() => jest.clearAllMocks());
  it('should get the sql content from the path', async () => {
    await extractResourceDeclarationFromGlobedFile({ rootDir: '__ROOT_DIR__', relativePath: '__FILE_PATH__.sql' });
    expect(getSqlFromFileMock.mock.calls.length).toEqual(1);
    expect(getSqlFromFileMock.mock.calls[0][0]).toMatchObject({
      filePath: '__ROOT_DIR__/__FILE_PATH__.sql',
    });
  });
  it('should get the type and name from extractResourceTypeAndNameFromDDL', async () => {
    await extractResourceDeclarationFromGlobedFile({ rootDir: '__ROOT_DIR__', relativePath: '__FILE_PATH__.sql' });
    expect(extractResourceTypeAndNameFromDDLMock.mock.calls.length).toEqual(1);
    expect(extractResourceTypeAndNameFromDDLMock.mock.calls[0][0]).toMatchObject({
      ddl: '__SQL_CONTENTS__',
    });
  });
  it('should return a ResourceDefinition object', async () => {
    const result = await extractResourceDeclarationFromGlobedFile({
      rootDir: '__ROOT_DIR__',
      relativePath: '__FILE_PATH__.sql',
    });
    expect(result.constructor).toEqual(ResourceDeclaration);
    expect(result.sql).toEqual('__SQL_CONTENTS__');
    expect(result.name).toEqual('__RESOURCE_NAME__');
    expect(result.type).toEqual(ResourceType.FUNCTION);
  });
});
