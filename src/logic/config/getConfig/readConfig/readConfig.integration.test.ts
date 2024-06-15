import { GeneratorConfig } from '../../../../domain';
import { TEST_ASSETS_ROOT_DIR } from '../../../__test_assets__/directory';
import { readConfig } from './readConfig';

describe('readConfig', () => {
  it('should be able to read a fully declared config', async () => {
    const config = await readConfig({
      filePath: `${TEST_ASSETS_ROOT_DIR}/exampleProject/mysql/codegen.sql.yml`,
    });
    expect(config).toBeInstanceOf(GeneratorConfig);
    expect(config.language).toEqual('mysql');
    expect(config.dialect).toEqual('5.7');
    expect(config.declarations.length).toEqual(12);
    expect({ ...config, rootDir: '__DIR__' }).toMatchSnapshot(); // to log an example of the output; note we mask dir to make it machine independent
  });
  it('should be able to read a config without queries', async () => {
    const config = await readConfig({
      filePath: `${TEST_ASSETS_ROOT_DIR}/exampleProject/postgres-noqueries/codegen.sql.yml`,
    });
    expect(config).toBeInstanceOf(GeneratorConfig);
    expect(config.language).toEqual('postgres');
    expect(config.dialect).toEqual('10.7');
    expect(config.declarations.length).toEqual(3);
    expect({ ...config, rootDir: '__DIR__' }).toMatchSnapshot(); // to log an example of the output; note we mask dir to make it machine independent
  });
});
