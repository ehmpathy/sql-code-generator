import { generate } from '@src/domain.operations/commands/generate/generate';

describe('generate', () => {
  it('should generate code for valid config and sql with both types and query functions', async () => {
    await generate({
      configPath: `${__dirname}/../.test.assets/codegen.sql.yml`,
    });
  });
  it('should generate code for valid config and sql with only types', async () => {
    await generate({
      configPath: `${__dirname}/../.test.assets/codegen.sql.only-types.yml`,
    });
  });
});
