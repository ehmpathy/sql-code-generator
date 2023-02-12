import { ResourceType } from '../../../domain';
import { castResourceNameToTypescriptTypeName } from './castResourceNameToTypescriptTypeName';

describe('castResourceNameToInterfaceName', () => {
  it('should correctly define resource name for a table', () => {
    const name = castResourceNameToTypescriptTypeName({
      name: 'some_awesome_table',
      resourceType: ResourceType.TABLE,
    });
    expect(name).toEqual('SqlTableSomeAwesomeTable');
  });
});
