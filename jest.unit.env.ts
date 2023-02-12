import { stage, Stage } from './src/utils/environment';

jest.mock('./src/utils/config/getConfig', () => ({
  getConfig: jest.fn().mockImplementation(() => require('./config/test.json')), // mock that getConfig just returns plaintext test env config in unit tests
}));

/**
 * sanity check that unit tests are only run in 'test' environment
 * - if they are run in prod environment, we could load a bunch of junk data into our prod databases, which would be no bueno
 */
if (stage !== Stage.TEST && process.env.I_KNOW_WHAT_IM_DOING !== 'true')
  throw new Error(`unit-test is not targeting stage 'test'`);
