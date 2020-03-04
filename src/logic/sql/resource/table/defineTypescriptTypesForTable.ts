import { TypeDefinitionOfResourceTable } from '../../../../model';
import { castTableNameToInterfaceName } from './castTableNameToInterfaceName';

export const defineTypescriptTypesForTable = ({ definition }: { definition: TypeDefinitionOfResourceTable }) => {
  // define column types in typescript format
  const typescriptInterfaceColumnDefinitions = definition.columns.map((column) => {
    return `${column.name}: ${column.type.join(' | ')};`;
  });

  // output
  const typescriptInterfaceDefinition = `
export interface ${castTableNameToInterfaceName(definition.name)} {
  ${typescriptInterfaceColumnDefinitions.join('\n  ')}
}
  `.trim();

  // return typescript types
  return typescriptInterfaceDefinition;
};
