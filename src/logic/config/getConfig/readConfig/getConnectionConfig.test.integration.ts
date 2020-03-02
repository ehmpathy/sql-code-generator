import { ConnectionConfig } from '../../../../types';
import { getConnectionConfig } from './getConnectionConfig';

// note: this is an integration test because we cant mock out the require method and because its worth proving that this works

describe('getConnectionConfig', () => {
  it('should be able to read db connection from a predefined ts module', async () => {
    const modulePath = `${__dirname}/_test_assets/connection.config.ts`;
    const config = await getConnectionConfig({ modulePath });
    expect(config.constructor).toEqual(ConnectionConfig);
  });
  it('should be able to read db connection from a predefined js module', async () => {
    const modulePath = `${__dirname}/_test_assets/connection.config.js`;
    const config = await getConnectionConfig({ modulePath });
    expect(config.constructor).toEqual(ConnectionConfig);
  });
});
