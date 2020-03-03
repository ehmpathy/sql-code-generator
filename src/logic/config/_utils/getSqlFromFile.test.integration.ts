import { getSqlFromFile } from './getSqlFromFile';

describe('getSqlFromFile', () => {
  it('should be able to read sql from a sql file', async () => {
    const contents = await getSqlFromFile({ filePath: `${__dirname}/__test_assets__/user.table.sql` });
    expect(contents).toMatchSnapshot();
  });
  it('should be able to read sql from a ts file with a named "sql" export', async () => {
    const contents = await getSqlFromFile({ filePath: `${__dirname}/__test_assets__/findUserById.ts` });
    expect(contents).toMatchSnapshot();
  });
});
