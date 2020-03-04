import { pascalCase } from 'pascal-case';

import { ResourceType } from '../../../../model';

export const castResourceNameToInterfaceName = ({
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
