import { castResourceNameToTypescriptTypeName } from './castResourceNameToTypescriptTypeName';
import { ResourceType } from '../../../../model';

describe('castResourceNameToInterfaceName', () => {
  it('should correctly define resource name for a table', () => {
    const name = castResourceNameToTypescriptTypeName({ name: 'some_awesome_table', resourceType: ResourceType.TABLE });
    expect(name).toEqual('SqlTableSomeAwesomeTable');
  });
});
