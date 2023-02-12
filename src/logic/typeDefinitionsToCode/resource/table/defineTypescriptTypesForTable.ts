import { TypeDefinitionOfResourceTable, ResourceType } from '../../../../domain';
import { castResourceNameToTypescriptTypeName } from '../../common/castResourceNameToTypescriptTypeName';
import { defineTypescriptTypeFromDataTypeArray } from '../../common/defineTypescriptTypeFromDataTypeArray';

export const defineTypescriptTypesForTable = ({ definition }: { definition: TypeDefinitionOfResourceTable }) => {
  // define column types in typescript format
  const typescriptInterfaceColumnDefinitions = definition.columns.map((column) => {
    return `${column.name}: ${defineTypescriptTypeFromDataTypeArray({ type: column.type })};`;
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
