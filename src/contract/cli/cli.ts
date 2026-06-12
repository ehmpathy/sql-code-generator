import { Command } from 'commander';

import { generate } from '@src/domain.operations/commands/generate/generate';

const program = new Command();

program
  .name('sql-code-generator')
  .description(
    'generate typescript code by parsing sql definitions for types and usage',
  )
  .version('0.10.1');

program
  .command('generate')
  .description(
    'generate typescript code by parsing sql definitions for types and usage',
  )
  .option('-c, --config <path>', 'path to config yml', 'codegen.sql.yml')
  .action(async (options: { config: string }) => {
    // derive config path
    const config = options.config;
    const configPath =
      config.slice(0, 1) === '/' ? config : `${process.cwd()}/${config}`;

    // generate the code
    await generate({ configPath });
  });

program.parse();
