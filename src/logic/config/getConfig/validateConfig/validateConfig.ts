import { ControlConfig } from '../../../../types';

/*
  validate the config
  - validates the connection
  - validates the definitions
  - throws error if anything is invalid; otherwise, does nothing
*/
export const validateConfig = async ({}: { config: ControlConfig }): Promise<void> => {
  // tslint:disable-line no-unused
  // 1. check that definitions are sound; TODO
  // 2. check that we can connect to the db with the connection config; TODO
  // 3. check that db connection user has adaquate privilages for schema control; TODO
  // 4. check that the language and dialect are supported; TODO
};
