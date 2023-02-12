import { pascalCase } from 'pascal-case';

export const castQueryNameToTypescriptTypeName = ({
  name,
}: {
  name: string;
}) => {
  const queryNameInPascalCase = pascalCase(name);
  return `SqlQuery${queryNameInPascalCase}`;
};
