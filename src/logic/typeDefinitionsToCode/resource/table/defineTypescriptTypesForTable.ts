import { TypeDefinitionOfResourceTable, ResourceType } from '../../../../model';
import { castResourceNameToTypescriptTypeName } from '../../common/castResourceNameToTypescriptTypeName';
import { castTableReferenceableResourceNameToTypescriptQueryReferenceTypeName } from '../../common/castTableReferenceableResourceNameToTypescriptQueryReferenceTypeName';

export const defineTypescriptTypesForTable = ({ definition }: { definition: TypeDefinitionOfResourceTable }) => {
  // define column types in typescript format
  const typescriptInterfaceColumnDefinitions = definition.columns.map((column) => {
    return `${column.name}: ${column.type.join(' | ')};`;
  });

  // define interface
  const typescriptTypeName = castResourceNameToTypescriptTypeName({
    name: definition.name,
    resourceType: ResourceType.TABLE,
  });
  const typescriptInterfaceDefinition = `
export interface ${typescriptTypeName} {
  ${typescriptInterfaceColumnDefinitions.join('\n  ')}
}
  `.trim();

  // define a type alias that can be used to reference this generically
  const typescriptQueryReferenceableTypeName = castTableReferenceableResourceNameToTypescriptQueryReferenceTypeName({
    name: definition.name,
    resourceType: ResourceType.TABLE,
  });
  const typescriptReferencableTypeAliasDefinition = `
export type ${typescriptQueryReferenceableTypeName} = ${typescriptTypeName};
  `.trim();

  // return typescript types
  return `
${typescriptInterfaceDefinition}
${typescriptReferencableTypeAliasDefinition}
  `.trim();
};
