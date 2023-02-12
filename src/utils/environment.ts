export enum Stage {
  PRODUCTION = 'prod',
  DEVELOPMENT = 'dev',
  TEST = 'test',
}

/**
 * this allows us to infer what the stage should be in environments that do not have STAGE specified
 * - e.g., when running locally
 * - e.g., when running tests
 */
const inferStageFromNodeEnv = () => {
  const nodeEnv = process.env.NODE_ENV; // default to test if not defined
  if (!nodeEnv) throw new Error('process.env.NODE_ENV must be defined');
  if (nodeEnv === 'production') return Stage.PRODUCTION;
  if (nodeEnv === 'development') return Stage.DEVELOPMENT;
  if (nodeEnv === 'test') return Stage.TEST;
  throw new Error(`unexpected nodeEnv '${nodeEnv}'`);
};

/**
 * a method that exposes relevant environmental variables in a standard way
 */
const getEnvironment = () => {
  const stage = process.env.STAGE ?? inferStageFromNodeEnv(); // figure it out from NODE_ENV if not explicitly defined
  if (!stage) throw new Error('process.env.STAGE must be defined');
  return { stage };
};

// export stage immediately, since it does not change
export const { stage } = getEnvironment();

// export service client stage
export const serviceClientStage =
  stage === Stage.PRODUCTION ? Stage.PRODUCTION : Stage.DEVELOPMENT; // i.e., if its prod, hit prod. otherwise, dev
