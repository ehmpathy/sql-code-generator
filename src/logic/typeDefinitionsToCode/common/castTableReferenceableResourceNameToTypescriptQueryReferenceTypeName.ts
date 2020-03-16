import { ResourceType } from '../../../model';
import { castResourceNameToTypescriptTypeName } from './castResourceNameToTypescriptTypeName';

export const castTableReferenceableResourceNameToTypescriptQueryReferenceTypeName = ({
  name,
  resourceType,
}: {
  name: string;
  resourceType: ResourceType;
}) => {
  // 0. throw error if not view or table, only view and table are possible table references
  if (![ResourceType.TABLE, ResourceType.VIEW].includes(resourceType)) {
    throw new Error('not a table referenceable query');
  }

  // 1. get the regular typescript type name
  const typescriptTypeName = castResourceNameToTypescriptTypeName({ name, resourceType });

  // 2. return the referenceable name
  if (resourceType === ResourceType.TABLE) return typescriptTypeName.replace(/^SqlTable/, 'SqlTableOrView');
  if (resourceType === ResourceType.VIEW) return typescriptTypeName.replace(/^SqlView/, 'SqlTableOrView');
  throw new Error('unexpected'); // this should never occur, but fail fast
};
