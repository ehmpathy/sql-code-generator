import { getConfig } from './getConfig';
import { readConfig } from './readConfig';
import { validateConfig } from './validateConfig';

jest.mock('./readConfig');
const readConfigMock = readConfig as jest.Mock;

jest.mock('./validateConfig');
const validateConfigMock = validateConfig as jest.Mock;

describe('getConfig', () => {
  beforeEach(() => jest.clearAllMocks());
  it('reads the config from a filepath', async () => {
    await getConfig({ configPath: '__CONFIG_PATH__' });
    expect(readConfigMock.mock.calls.length).toEqual(1);
    expect(readConfigMock.mock.calls[0][0]).toMatchObject({
      filePath: '__CONFIG_PATH__',
    });
  });
  it('validates the config', async () => {
    readConfigMock.mockResolvedValueOnce('__CONFIG_OBJECT__');
    await getConfig({ configPath: '__CONFIG_PATH__' });
    expect(validateConfigMock.mock.calls.length).toEqual(1);
    expect(validateConfigMock.mock.calls[0][0]).toMatchObject({
      config: '__CONFIG_OBJECT__',
    });
  });
  it('returns the config', async () => {
    readConfigMock.mockResolvedValueOnce('__CONFIG_OBJECT__');
    const result = await getConfig({ configPath: '__CONFIG_PATH__' });
    expect(result).toEqual('__CONFIG_OBJECT__');
  });
});
