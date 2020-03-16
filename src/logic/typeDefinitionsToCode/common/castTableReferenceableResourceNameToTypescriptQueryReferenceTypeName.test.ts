import { castTableReferenceableResourceNameToTypescriptQueryReferenceTypeName } from './castTableReferenceableResourceNameToTypescriptQueryReferenceTypeName';
import { ResourceType } from '../../../model';

describe('castTableReferenceableResourceNameToTypescriptQueryReferenceTypeName', () => {
  it('should accurately cast table resource to the query referenceable typescript type name', () => {
    const queryReferenceableTypescriptTypeName = castTableReferenceableResourceNameToTypescriptQueryReferenceTypeName({
      name: 'user_status',
      resourceType: ResourceType.TABLE,
    });
    expect(queryReferenceableTypescriptTypeName).toEqual('SqlTableOrViewUserStatus');
  });
  it('should accurately cast table resource to the query referenceable typescript type name', () => {
    const queryReferenceableTypescriptTypeName = castTableReferenceableResourceNameToTypescriptQueryReferenceTypeName({
      name: 'view_user_status_current',
      resourceType: ResourceType.VIEW,
    });
    expect(queryReferenceableTypescriptTypeName).toEqual('SqlTableOrViewViewUserStatusCurrent');
  });
});
