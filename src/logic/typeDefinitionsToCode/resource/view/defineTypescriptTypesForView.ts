import { ResourceType } from '../../../../model';
import { castResourceNameToTypescriptTypeName } from '../../common/castResourceNameToTypescriptTypeName';
import { TypeDefinitionOfResourceView } from '../../../../model/valueObjects/TypeDefinitionOfResourceView';
import { defineTypescriptTypeFromReference } from '../../common/defineTypescriptTypeFromReference/defineTypescriptTypeFromReference';
import { castTableReferenceableResourceNameToTypescriptQueryReferenceTypeName } from '../../common/castTableReferenceableResourceNameToTypescriptQueryReferenceTypeName';

export const defineTypescriptTypesForView = ({ definition }: { definition: TypeDefinitionOfResourceView }) => {
  // define column types in typescript format
  const typescriptInterfaceColumnDefinitions = definition.selectExpressions.map((selectExpression) => {
    const typescriptTypeForReference = defineTypescriptTypeFromReference({
      reference: selectExpression.typeReference,
      queryTableReferences: definition.tableReferences,
    });
    return `${selectExpression.alias}: ${typescriptTypeForReference};`;
  });

  // define interface
  const typescriptTypeName = castResourceNameToTypescriptTypeName({
    name: definition.name,
    resourceType: ResourceType.VIEW,
  });
  const typescriptInterfaceDefinition = `
export interface ${typescriptTypeName} {
  ${typescriptInterfaceColumnDefinitions.join('\n  ')}
}
  `.trim();

  // define a type alias that can be used to reference this generically
  const typescriptQueryReferenceableTypeName = castTableReferenceableResourceNameToTypescriptQueryReferenceTypeName({
    name: definition.name,
    resourceType: ResourceType.VIEW,
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
