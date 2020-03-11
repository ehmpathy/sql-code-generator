import { TypeDefinitionOfQuery } from '../../../model/valueObjects/TypeDefinitionOfQuery';
import { castQueryNameToTypescriptTypeName } from '../common/castQueryNameToTypescriptTypeName';
import { defineTypescriptTypeFromReference } from '../common/defineTypescriptTypeFromReference/defineTypescriptTypeFromReference';

export const defineTypescriptTypesForQuery = ({ definition }: { definition: TypeDefinitionOfQuery }) => {
  // define the typescript type name for the query
  const typescriptTypeName = castQueryNameToTypescriptTypeName({ name: definition.name });

  // define the input interface
  const typescriptInputInterfacePropertyDefinitions = definition.inputVariables.map((inputVariable) => {
    const typescriptTypeForReference = defineTypescriptTypeFromReference({
      reference: inputVariable.typeReference,
      queryTableReferences: definition.tableReferences,
    });
    return `${inputVariable.name}: ${typescriptTypeForReference};`;
  });
  const typescriptInputInterfaceDefinition = `
export interface ${typescriptTypeName}Input {
  ${typescriptInputInterfacePropertyDefinitions.join('\n  ')}
}
  `.trim();

  // define the output interface
  const typescriptOutputInterfacePropertyDefinitions = definition.selectExpressions.map((selectExpression) => {
    const typescriptTypeForReference = defineTypescriptTypeFromReference({
      reference: selectExpression.typeReference,
      queryTableReferences: definition.tableReferences,
    });
    return `${selectExpression.alias}: ${typescriptTypeForReference};`;
  });
  const typescriptOutputInterfaceDefinition = `
export interface ${typescriptTypeName}Output {
  ${typescriptOutputInterfacePropertyDefinitions.join('\n  ')}
}
  `.trim();

  // return typescript types
  return `
${typescriptInputInterfaceDefinition}
${typescriptOutputInterfaceDefinition}
  `.trim();
};
