import { stage, Stage } from './src/utils/environment';

// set a longer timeout
// eslint-disable-next-line no-undef
jest.setTimeout(90000); // since we're calling downstream apis

/**
 * sanity check that integration tests are only run in 'test' environment
 * - if they are run in prod environment, we could load a bunch of junk data into our prod databases, which would be no bueno
 */
if (stage !== Stage.TEST && process.env.I_KNOW_WHAT_IM_DOING !== 'true')
  throw new Error(`integration-test is not targeting stage 'test'`);

/**
 * specify that dynamodb should use the local dynamodb database, if running in test env
 */
if (stage === Stage.TEST)
  process.env.USE_CUSTOM_DYNAMODB_ENDPOINT = 'http://localhost:7337';
