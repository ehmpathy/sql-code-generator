import { ResourceType, type TypeDefinition } from '@src/domain.objects';
import type { TypeDefinitionOfResourceView } from '@src/domain.objects/TypeDefinitionOfResourceView';
import { castResourceNameToTypescriptTypeName } from '@src/domain.operations/typeDefinitionsToCode/common/castResourceNameToTypescriptTypeName';
import { defineTypescriptTypeFromReference } from '@src/domain.operations/typeDefinitionsToCode/common/defineTypescriptTypeFromReference/defineTypescriptTypeFromReference';

export const defineTypescriptTypesForView = ({
  definition,
  allDefinitions,
}: {
  definition: TypeDefinitionOfResourceView;
  allDefinitions: TypeDefinition[];
}) => {
  // define column types in typescript format
  const typescriptInterfaceColumnDefinitions = definition.selectExpressions.map(
    (selectExpression) => {
      const typescriptTypeForReference = defineTypescriptTypeFromReference({
        reference: selectExpression.typeReference,
        queryTableReferences: definition.tableReferences,
        typeDefinitions: allDefinitions,
      });
      return `${selectExpression.alias}: ${typescriptTypeForReference};`;
    },
  );

  // output
  const typescriptInterfaceDefinition = `
export interface ${castResourceNameToTypescriptTypeName({
    name: definition.name,
    resourceType: ResourceType.VIEW,
  })} {
  ${typescriptInterfaceColumnDefinitions.join('\n  ')}
}
  `.trim();

  // return typescript types
  return typescriptInterfaceDefinition;
};
