import { ConnectionConfig } from '../../../../types';
/*
  we ask the user to define the path to a node module which exports a promiseConfig method
  this promiseConfig method returns the expected db connection config
*/
export const getConnectionConfig = async ({ modulePath }: { modulePath: string }): Promise<ConnectionConfig> => {
  // 1. import the module
  const module = require(modulePath);

  // 2. get the config from the module
  if (!module.promiseConfig) throw new Error('connection module must export a promiseConfig method');
  const config = await module.promiseConfig();

  // 3. validate that the config has the required attributes
  const validatedConfig = new ConnectionConfig(config); // the connection config runtime typechecks the inputs

  // 4. return the validated connection config
  return validatedConfig;
};
