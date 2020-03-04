import { castResourceNameToInterfaceName } from './castResourceNameToInterfaceName';
import { ResourceType } from '../../../../model';

describe('castResourceNameToInterfaceName', () => {
  it('should correctly define resource name for a table', () => {
    const name = castResourceNameToInterfaceName({ name: 'some_awesome_table', resourceType: ResourceType.TABLE });
    expect(name).toEqual('SqlTableSomeAwesomeTable');
  });
});
