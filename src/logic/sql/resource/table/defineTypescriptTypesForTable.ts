import { TypeDefinitionOfResourceTable, ResourceType } from '../../../../model';
import { castResourceNameToInterfaceName } from '../_utils/castResourceNameToInterfaceName';

export const defineTypescriptTypesForTable = ({ definition }: { definition: TypeDefinitionOfResourceTable }) => {
  // define column types in typescript format
  const typescriptInterfaceColumnDefinitions = definition.columns.map((column) => {
    return `${column.name}: ${column.type.join(' | ')};`;
  });

  // output
  const typescriptInterfaceDefinition = `
export interface ${castResourceNameToInterfaceName({ name: definition.name, resourceType: ResourceType.TABLE })} {
  ${typescriptInterfaceColumnDefinitions.join('\n  ')}
}
  `.trim();

  // return typescript types
  return typescriptInterfaceDefinition;
};
