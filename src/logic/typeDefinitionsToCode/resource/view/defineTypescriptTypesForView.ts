import { ResourceType, TypeDefinition } from '../../../../model';
import { castResourceNameToTypescriptTypeName } from '../../common/castResourceNameToTypescriptTypeName';
import { TypeDefinitionOfResourceView } from '../../../../model/valueObjects/TypeDefinitionOfResourceView';
import { defineTypescriptTypeFromReference } from '../../common/defineTypescriptTypeFromReference/defineTypescriptTypeFromReference';

export const defineTypescriptTypesForView = ({
  definition,
  allDefinitions,
}: {
  definition: TypeDefinitionOfResourceView;
  allDefinitions: TypeDefinition[];
}) => {
  // define column types in typescript format
  const typescriptInterfaceColumnDefinitions = definition.selectExpressions.map((selectExpression) => {
    const typescriptTypeForReference = defineTypescriptTypeFromReference({
      reference: selectExpression.typeReference,
      queryTableReferences: definition.tableReferences,
      typeDefinitions: allDefinitions,
    });
    return `${selectExpression.alias}: ${typescriptTypeForReference};`;
  });

  // output
  const typescriptInterfaceDefinition = `
export interface ${castResourceNameToTypescriptTypeName({ name: definition.name, resourceType: ResourceType.VIEW })} {
  ${typescriptInterfaceColumnDefinitions.join('\n  ')}
}
  `.trim();

  // return typescript types
  return typescriptInterfaceDefinition;
};
