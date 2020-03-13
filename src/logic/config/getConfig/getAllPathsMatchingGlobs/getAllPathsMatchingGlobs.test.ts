import { getAllPathsMatchingGlobs } from './getAllPathsMatchingGlobs';

const root = `${__dirname}/../../../__test_assets__/exampleProject`; // i.e., starting from the "codegen.sql.yml"

describe('getAllPathsMatchingGlobs', () => {
  it('should return paths that match a glob', async () => {
    const files = await getAllPathsMatchingGlobs({ globs: ['schema/**/*.sql'], root });
    expect(files).toContain('schema/tables/image.sql');
    expect(files).toContain('schema/functions/upsert_image.sql');
  });
  it('should return paths that match each glob', async () => {
    const files = await getAllPathsMatchingGlobs({ globs: ['schema/**/*.sql', 'src/dao/**/*.ts'], root });
    expect(files).toContain('schema/tables/image.sql');
    expect(files).toContain('src/dao/user/findAllByName.ts');
    expect(files).toContain('src/dao/user/findAllByName.test.ts');
  });
  it('should not return paths that match a glob that starts with "!"', async () => {
    const files = await getAllPathsMatchingGlobs({
      globs: ['schema/**/*.sql', 'src/dao/**/*.ts', '!src/dao/**/*.test.ts', '!src/dao/**/*.test.integration.ts'],
      root,
    });
    expect(files).toContain('schema/tables/image.sql');
    expect(files).toContain('src/dao/user/findAllByName.ts');
    expect(files).not.toContain('src/dao/user/findAllByName.test.ts');
    expect(files).not.toContain('src/dao/user/findAllByName.test.integration.ts');
  });
});
