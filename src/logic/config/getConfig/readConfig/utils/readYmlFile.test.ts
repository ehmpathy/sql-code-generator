import YAML from 'yaml';

import { readFileAsync } from '../../../../common/readFileAsync';
import { readYmlFile } from './readYmlFile';

jest.mock('../../../../common/readFileAsync');
const readFileAsyncMock = readFileAsync as jest.Mock;
readFileAsyncMock.mockResolvedValue(`
- type: change
  path: 'init/service_user.sql'
  id: 'init_20190619_1'
  reapplyOnUpdate: false # we'll do it manually for now

- type: change
  id: 'data_20190619_1'
  path: 'data/data_sources.sql'
  reapplyOnUpdate: false # only run each insert once

- type: change
  id: 'procedures_20190619_1'
  path: 'procedures/awesome_sproc.sql'
  reapplyOnUpdate: true
`);

describe('readDefinitionsFileRecursive', () => {
  beforeEach(() => jest.clearAllMocks());
  it('should throw an error if the filepath defined does not point to a yml file', async () => {
    try {
      await readYmlFile({ filePath: 'some.json' });
      throw new Error('should not reach here');
    } catch (error) {
      expect(error.message).toMatch('file path point to a .yml file.');
    }
  });
  it('should attempt to read the file', async () => {
    await readYmlFile({ filePath: 'some.yml' });
    expect(readFileAsyncMock.mock.calls.length).toEqual(1);
    expect(readFileAsyncMock.mock.calls[0][0]).toEqual({
      filePath: 'some.yml',
    });
  });
  it('should parse the contents into yml with the YAML library', async () => {
    const spy = jest.spyOn(YAML, 'parse');
    expect(spy.mock.calls.length).toEqual(0);
    await readYmlFile({ filePath: 'some.yml' });
    expect(spy.mock.calls.length).toEqual(1);
  });
  it('should return the parsed yml content', async () => {
    readFileAsyncMock.mockResolvedValueOnce(`
    - type: change
      path: 'init/service_user.sql'
      id: 'init_20190619_1'
      reapplyOnUpdate: false # we'll do it manually for now

    - type: change
      id: 'data_20190619_1'
      path: 'data/data_sources.sql'
      reapplyOnUpdate: false # only run each insert once

    - type: change
      id: 'procedures_20190619_1'
      path: 'procedures/awesome_sproc.sql'
      reapplyOnUpdate: true
    `);
    const result = await readYmlFile({ filePath: 'some.yml' });
    expect(result).toMatchObject([
      {
        type: 'change',
        path: 'init/service_user.sql',
        id: 'init_20190619_1',
        reapplyOnUpdate: false,
      },
      {
        type: 'change',
        id: 'data_20190619_1',
        path: 'data/data_sources.sql',
        reapplyOnUpdate: false,
      },
      {
        type: 'change',
        id: 'procedures_20190619_1',
        path: 'procedures/awesome_sproc.sql',
        reapplyOnUpdate: true,
      },
    ]);
  });
});
