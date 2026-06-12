import { pascalCase } from 'pascal-case';

import type { ResourceType } from '@src/domain.objects';

export const castResourceNameToTypescriptTypeName = ({
  name,
  resourceType,
}: {
  name: string;
  resourceType: ResourceType;
}) => {
  const resourceTypeInTitleCase =
    resourceType[0]!.toUpperCase() + resourceType.substr(1).toLowerCase();
  const resourceNameInPascalCase = pascalCase(name);
  return `Sql${resourceTypeInTitleCase}${resourceNameInPascalCase}`;
};
