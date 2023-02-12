import SqlCodeGenerator from './generate';

describe('generate', () => {
  it('should be able to generate code for valid config and sql, generating both types and query functions', async () => {
    await SqlCodeGenerator.run(['-c', `${__dirname}/../__test_assets__/codegen.sql.yml`]);
  });
  it('should be able to generate code for valid config and sql, only generating types', async () => {
    await SqlCodeGenerator.run(['-c', `${__dirname}/../__test_assets__/codegen.sql.only-types.yml`]);
  });
});
