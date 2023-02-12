import { TypeDefinition } from '../../../domain';
import { TypeDefinitionOfQuery } from '../../../domain/objects/TypeDefinitionOfQuery';
import { castQueryNameToTypescriptTypeName } from '../common/castQueryNameToTypescriptTypeName';
import { defineTypescriptTypeFromReference } from '../common/defineTypescriptTypeFromReference/defineTypescriptTypeFromReference';
import { defineTypescriptTypeFromDataTypeArrayOrReference } from '../common/defineTypescriptTypeFromDataTypeArrayOrReference';
import { TypeDefinitionOfQueryInputVariable } from '../../../model/valueObjects/TypeDefinitionOfQueryInputVariable';

export const defineTypescriptTypesForQuery = ({
  definition,
  allDefinitions,
}: {
  definition: TypeDefinitionOfQuery;
  allDefinitions: TypeDefinition[];
}) => {
  // define the typescript type name for the query
  const typescriptTypeName = castQueryNameToTypescriptTypeName({
    name: definition.name,
  });

  // define the input interface
  const inputVariableNameToTypeDefinitionsMap = definition.inputVariables.reduce(
    (summary, thisDefinition) => {
      if (!summary[thisDefinition.name]) summary[thisDefinition.name] = [];
      summary[thisDefinition.name].push(thisDefinition);
      return summary;
    },
    {} as Record<string, TypeDefinitionOfQueryInputVariable[]>,
  );
  const typescriptInputInterfacePropertyDefinitions = Object.keys(
    inputVariableNameToTypeDefinitionsMap,
  ).map(inputVariableName => {
    // grab all the types for this input variable (there can be more than one, because an input variable can be used more than once in the same query. e.g., `WHERE x is null OR x = y`)
    const types = inputVariableNameToTypeDefinitionsMap[inputVariableName].map(
      def => def.type,
    );

    // cast each of those to their typescript-type
    const typescriptTypesForReference = types.map(type =>
      defineTypescriptTypeFromDataTypeArrayOrReference({
        type,
        queryTableReferences: definition.tableReferences,
        typeDefinitions: allDefinitions,
      }),
    );

    // and define the typescript property definition for this input variable as a union of all of those types; // TODO(#50): support intersection; https://github.com/uladkasach/sql-code-generator/issues/50
    return `${inputVariableName}: ${typescriptTypesForReference.join(' | ')};`;
  });
  const typescriptInputInterfaceDefinition = typescriptInputInterfacePropertyDefinitions.length // if no inputs, then interface; else, type = null
    ? `
export interface ${typescriptTypeName}Input {
  ${typescriptInputInterfacePropertyDefinitions.join('\n  ')}
}
  `.trim()
    : `
export type ${typescriptTypeName}Input = null;
`.trim();

  // define the output interface
  const typescriptOutputInterfacePropertyDefinitions = definition.selectExpressions.map(
    selectExpression => {
      const typescriptTypeForReference = defineTypescriptTypeFromReference({
        reference: selectExpression.typeReference,
        queryTableReferences: definition.tableReferences,
        typeDefinitions: allDefinitions,
      });
      return `${selectExpression.alias}: ${typescriptTypeForReference};`;
    },
  );
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
