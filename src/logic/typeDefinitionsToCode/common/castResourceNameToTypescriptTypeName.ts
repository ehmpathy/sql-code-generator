import { pascalCase } from 'pascal-case';

import { ResourceType } from '../../../domain';

export const castResourceNameToTypescriptTypeName = ({
  name,
  resourceType,
}: {
  name: string;
  resourceType: ResourceType;
}) => {
  const resourceTypeInTitleCase = resourceType[0].toUpperCase() + resourceType.substr(1).toLowerCase();
  const resourceNameInPascalCase = pascalCase(name);
  return `Sql${resourceTypeInTitleCase}${resourceNameInPascalCase}`;
};
