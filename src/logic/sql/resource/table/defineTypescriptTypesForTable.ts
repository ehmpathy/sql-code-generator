import { pascalCase } from 'change-case';

import { TypeDefinitionOfResourceTable } from '../../../../model';

export const defineTypescriptTypesForTable = ({ definition }: { definition: TypeDefinitionOfResourceTable }) => {
  // define column types in typescript format
  const typescriptInterfaceColumnDefinitions = definition.columns.map((column) => {
    return `${column.name}: ${column.type.join(' | ')};`;
  });

  // output
  const typescriptInterfaceDefinition = `
export interface ${pascalCase(definition.name)} {
  ${typescriptInterfaceColumnDefinitions.join('\n  ')}
}
  `.trim();

  // return typescript types
  return typescriptInterfaceDefinition;
};
