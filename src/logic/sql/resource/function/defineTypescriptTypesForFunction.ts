import { TypeDefinitionOfResourceFunction } from '../../../../model/valueObjects/TypeDefinitionOfResourceFunction';
import { castResourceNameToTypescriptTypeName } from '../common/castResourceNameToTypescriptTypeName';
import { ResourceType } from '../../../../model';

export const defineTypescriptTypesForFunction = ({ definition }: { definition: TypeDefinitionOfResourceFunction }) => {
  // 0. define the typescript type namespace for this function
  const typescriptTypeName = castResourceNameToTypescriptTypeName({
    name: definition.name,
    resourceType: ResourceType.FUNCTION,
  });

  // 1. define the interface for the input
  const typescriptInterfaceInputVariablesDefinitions = definition.inputs.map((input) => {
    return `${input.name}: ${input.type.join(' | ')};`;
  });
  const inputInterfaceTypescript = `
export interface ${typescriptTypeName}Input {
  ${typescriptInterfaceInputVariablesDefinitions.join('\n  ')}
}
  `.trim();

  // 2. define the type for the output
  const outputTypeTypescript = `
export type ${typescriptTypeName}Output = ${definition.output};
  `.trim();

  // 3. return the combined typescript code
  return `
${inputInterfaceTypescript}
${outputTypeTypescript}
  `.trim();
};
