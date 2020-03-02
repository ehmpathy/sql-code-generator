import { ControlConfig } from '../../../types';
import { readConfig } from './readConfig';
import { validateConfig } from './validateConfig';

/*
  1. read the config
  2. validate the config
*/
export const getConfig = async ({ configPath }: { configPath: string }): Promise<ControlConfig> => {
  // 1. read the config
  const config = await readConfig({ filePath: configPath });

  // 2. validate the config
  await validateConfig({ config });

  // 3. return the config, since valid
  return config;
};
