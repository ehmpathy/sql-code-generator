import { getConfig } from './getConfig';
import { readConfig } from './readConfig';

jest.mock('./readConfig');
const readConfigMock = readConfig as jest.Mock;

describe('getConfig', () => {
  beforeEach(() => jest.clearAllMocks());
  it('reads the config from a filepath', async () => {
    await getConfig({ configPath: '__CONFIG_PATH__' });
    expect(readConfigMock).toHaveBeenCalledTimes(1);
    expect(readConfigMock).toHaveBeenCalledWith({
      filePath: '__CONFIG_PATH__',
    });
  });
  it('returns the config', async () => {
    readConfigMock.mockResolvedValueOnce('__CONFIG_OBJECT__');
    const result = await getConfig({ configPath: '__CONFIG_PATH__' });
    expect(result).toEqual('__CONFIG_OBJECT__');
  });
});
