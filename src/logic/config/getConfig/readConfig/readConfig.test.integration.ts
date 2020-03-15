import { GeneratorConfig } from '../../../../model';
import { readConfig } from './readConfig';

describe('readConfig', () => {
  it('should be able to read the example config provisioned in __test_assets__', async () => {
    const config = await readConfig({
      filePath: `${__dirname}/../../../__test_assets__/exampleProject/codegen.sql.yml`,
    });
    expect(config).toBeInstanceOf(GeneratorConfig);
    expect(config.language).toEqual('mysql');
    expect(config.dialect).toEqual('5.7');
    expect(config.declarations.length).toEqual(8);
    expect({ ...config, rootDir: '__DIR__' }).toMatchSnapshot(); // to log an example of the output; note we mask dir to make it machine independent
  });
});
