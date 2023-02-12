import { Command, Flags } from '@oclif/core';
import { generate } from '../../logic/commands/generate/generate';

export default class Generate extends Command {
  public static description = 'generate typescript code by parsing sql definitions for types and usage';

  public static flags = {
    help: Flags.help({ char: 'h' }),
    config: Flags.string({
      char: 'c',
      description: 'path to config yml',
      required: true,
      default: 'codegen.sql.yml',
    }),
  };

  public async run() {
    const { flags } = await this.parse(Generate);
    const config = flags.config!;

    // generate the code
    const configPath = config.slice(0, 1) === '/' ? config : `${process.cwd()}/${config}`; // if starts with /, consider it as an absolute path
    await generate({ configPath });
  }
}
