import { extractQueryDeclarationFromGlobedFile } from './extractQueryDeclarationFromGlobedFile';

const rootDir = `${__dirname}/../../../__test_assets__/exampleProject`;

describe('extractQueryDeclarationFromGlobedFile', () => {
  it('should be able to extract a query declaration from a ts file that exports a query string', async () => {
    const declaration = await extractQueryDeclarationFromGlobedFile({
      rootDir,
      relativePath: 'src/dao/user/findAllByName.ts',
    });
    expect(declaration.name).toEqual('find_all_by_name');
    expect(declaration.sql).toContain('SELECT');
  });
  it('should throw an error if the query name is not declared in the query string', async () => {
    try {
      await extractQueryDeclarationFromGlobedFile({
        rootDir,
        relativePath: 'src/others/queryWithoutName.ts',
      });
      throw new Error('should not reach here');
    } catch (error) {
      expect(error.message).toContain('please define the query name');
    }
  });
});
