import SqlCodeGenerator from './generate';

describe('generate', () => {
  it('should be able to generate code for valid config and sql', async () => {
    await SqlCodeGenerator.run(['-c', `${__dirname}/../__test_assets__/codegen.sql.yml`]);
  });
});
