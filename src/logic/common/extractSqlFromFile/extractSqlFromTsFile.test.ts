import { extractSqlFromTsFile } from './extractSqlFromTsFile';

const TEST_ASSETS_DIR = `${__dirname}/__test_assets__`;

describe('extractSqlFromTsFile', () => {
  it('should extract sql from a file that only has sql exported', async () => {
    const sql = await extractSqlFromTsFile({
      filePath: `${TEST_ASSETS_DIR}/onlyExportSql.ts`,
    });
    expect(sql).toMatchSnapshot();
  });
  it('should extract sql that exports the sql and imports and exports other things', async () => {
    const sql = await extractSqlFromTsFile({
      filePath: `${TEST_ASSETS_DIR}/importAndExportThingsIncludingSql.ts`,
    });
    expect(sql).toMatchSnapshot();
  });
  it('should throw standard error if sql could not be extracted', async () => {
    try {
      await extractSqlFromTsFile({
        filePath: `${TEST_ASSETS_DIR}/dontExportSql.ts`,
      });
      throw new Error('should not reach here');
    } catch (error) {
      expect(error.message).toContain(
        'could not extract sql from file at path ',
      );
    }
  });
});
