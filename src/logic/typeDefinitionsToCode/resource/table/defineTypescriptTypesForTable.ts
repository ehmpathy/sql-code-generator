import { TypeDefinitionOfResourceTable, ResourceType } from '../../../../model';
import { castResourceNameToTypescriptTypeName } from '../../common/castResourceNameToTypescriptTypeName';

export const defineTypescriptTypesForTable = ({ definition }: { definition: TypeDefinitionOfResourceTable }) => {
  // define column types in typescript format
  const typescriptInterfaceColumnDefinitions = definition.columns.map((column) => {
    return `${column.name}: ${column.type.join(' | ')};`;
  });

  // output
  const typescriptInterfaceDefinition = `
export interface ${castResourceNameToTypescriptTypeName({ name: definition.name, resourceType: ResourceType.TABLE })} {
  ${typescriptInterfaceColumnDefinitions.join('\n  ')}
}
  `.trim();

  // return typescript types
  return typescriptInterfaceDefinition;
};
