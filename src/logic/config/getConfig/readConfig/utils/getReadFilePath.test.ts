import { getReadFilePath } from './getReadFilePath';

describe('getReadFilePath', () => {
  it('should throw an error if the relativePath does not start with ./ or ../', () => {
    try {
      getReadFilePath({ readRoot: '__READ_ROOT__', relativePath: 'path/to/some/file.sql' });
      throw new Error('should not reach here');
    } catch (error) {
      expect(error.message).toEqual(
        "all paths must be relative, 'path/to/some/file.sql' is not; relative paths must start with ./ or ../",
      );
    }
  });
  it('merge the readRoot and the relative file path accurately when starting from root', () => {
    const filePath = getReadFilePath({ readRoot: '__READ_ROOT__', relativePath: './path/to/some/file.sql' });
    expect(filePath).toEqual('__READ_ROOT__/path/to/some/file.sql');
  });
  it('merge the readRoot and the relative file path accurately when starting from parent directory', () => {
    const filePath = getReadFilePath({ readRoot: '__READ_ROOT__', relativePath: '../path/to/some/file.sql' });
    expect(filePath).toEqual('__READ_ROOT__/../path/to/some/file.sql');
  });
});
