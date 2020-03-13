import { getRelativePathFromFileToFile } from './getRelativePathFromFileToFile';

describe('getRelativeFilePathFromFileToFile', () => {
  it('should be able to get correct path between files in same dir', () => {
    const relativePath = getRelativePathFromFileToFile({
      fromFile: 'src/generated/fromSql/queryFunction.ts',
      toFile: 'src/generated/fromSql/types.ts',
    });
    expect(relativePath).toEqual('./types');
  });
  it('should be able to get correct path between files in different dirs', () => {
    const relativePath = getRelativePathFromFileToFile({
      fromFile: 'src/generated/fromSql/queryFunction.ts',
      toFile: 'src/dao/user/findAllByName.ts',
    });
    expect(relativePath).toEqual('../../dao/user/findAllByName');
  });
});
