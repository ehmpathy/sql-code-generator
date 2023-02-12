import { Stage, stage } from '../src/utils/environment';

export const locally = process.env.LOCALLY === 'true'; // whether we want to acceptance test locally or deployed lambda

export const testInProdOnly = stage === Stage.PRODUCTION ? test : test.skip; // allow testing in prod env only (sometimes we don't deploy certain things in dev / test)
