import { GeneratorConfig } from '../../../model';
import { readConfig } from './readConfig';

/*
  1. read the config
  2. validate the config
*/
export const getConfig = async ({ configPath }: { configPath: string }): Promise<GeneratorConfig> => {
  // 1. read the config
  const config = await readConfig({ filePath: configPath });

  // 2. validate the config; TODO:

  // 3. return the config, since valid
  return config;
};
