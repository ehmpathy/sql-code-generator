import { GeneratorConfig } from '../../../../model';
import { readConfig } from './readConfig';

describe('readConfig', () => {
  it('should be able to read the example config provisioned in __test_assets__', async () => {
    const config = await readConfig({ filePath: `${__dirname}/__test_assets__/sql.yml` });
    expect(config).toBeInstanceOf(GeneratorConfig);
    expect(config.language).toEqual('mysql');
    expect(config.dialect).toEqual('5.7');
    expect(config.definitions.length).toEqual(4); // 4 total: 2 queries, 2 resources
    expect(config).toMatchSnapshot(); // to log an example of the output
  });
});
