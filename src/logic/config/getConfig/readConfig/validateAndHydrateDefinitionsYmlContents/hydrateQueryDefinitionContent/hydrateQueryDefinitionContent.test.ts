import { InvalidDefinitionError } from '../errors';
import { hydrateQueryDefinitionContent } from './hydrateQueryDefinitionContent';
import { getSqlFromFile } from '../../utils/getSqlFromFile';
import { DefinitionType, QueryDefinition } from '../../../../../../model';

jest.mock('../../utils/getSqlFromFile');
const getSqlFromFileMock = getSqlFromFile as jest.Mock;
getSqlFromFileMock.mockResolvedValue('__SQL_CONTENTS__');

describe('hydrateQueryDefinitionContent', () => {
  it('should throw an error if the path is not defined', async () => {
    try {
      await hydrateQueryDefinitionContent({ readRoot: '__READ_ROOT__', content: {} });
      throw new Error('should not reach here');
    } catch (error) {
      expect(error.constructor).toEqual(InvalidDefinitionError);
      expect(error.explanation).toEqual('path must be defined');
    }
  });
  it('should get the sql content from the path', async () => {
    const exampleContent = {
      type: DefinitionType.QUERY,
      name: '__NAME__',
      path: '__FILE_PATH__.ts',
    };
    await hydrateQueryDefinitionContent({ readRoot: '__READ_ROOT__', content: exampleContent });
    expect(getSqlFromFileMock.mock.calls.length).toEqual(1);
    expect(getSqlFromFileMock.mock.calls[0][0]).toMatchObject({
      filePath: '__READ_ROOT__/__FILE_PATH__.ts',
    });
  });
  it('should return a QueryDefinition object, with a hash on it', async () => {
    const exampleContent = {
      type: DefinitionType.QUERY,
      name: '__NAME__',
      path: '__FILE_PATH__.ts',
    };
    const result = await hydrateQueryDefinitionContent({ readRoot: '__READ_ROOT__', content: exampleContent });
    expect(result.constructor).toEqual(QueryDefinition);
    expect(result.name).toEqual('__NAME__');
    expect(result.sql).toEqual('__SQL_CONTENTS__');
  });
});
