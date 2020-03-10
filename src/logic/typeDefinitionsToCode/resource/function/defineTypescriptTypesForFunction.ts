import { TypeDefinitionOfResourceFunction } from '../../../../model/valueObjects/TypeDefinitionOfResourceFunction';
import { castResourceNameToTypescriptTypeName } from '../../common/castResourceNameToTypescriptTypeName';
import { ResourceType } from '../../../../model';

export const defineTypescriptTypesForFunction = ({ definition }: { definition: TypeDefinitionOfResourceFunction }) => {
  // 0. define the typescript type namespace for this function
  const typescriptTypeName = castResourceNameToTypescriptTypeName({
    name: definition.name,
    resourceType: ResourceType.FUNCTION,
  });

  // 1. define the interface for the input; note: because order is the real key for the function inputs, the input is keyed by index
  const typescriptInterfaceInputVariablesDefinitions = definition.inputs.map((input, index) => {
    return `${index}: ${input.type.join(' | ')};`;
  });
  const inputInterfaceTypescript = `
export interface ${typescriptTypeName}Input {
  ${typescriptInterfaceInputVariablesDefinitions.join('\n  ')}
}
  `.trim();

  // 2. define a map of function input name => input index; since we know the name that the function gives to each input variable by index, expose that to users; maybe it will help them with debugging
  const typescriptInterfaceInputVariableIndexToNameMapDefinitions = definition.inputs.map((input, index) => {
    return `${input.name}: ${typescriptTypeName}Input['${index}'];`;
  });
  const inputByNameInterfaceTypescript = `
export interface ${typescriptTypeName}InputByName {
  ${typescriptInterfaceInputVariableIndexToNameMapDefinitions.join('\n  ')}
}
  `.trim();

  // 3. define the type for the output
  const outputTypeTypescript = `
export type ${typescriptTypeName}Output = ${definition.output};
  `.trim();

  // 4. return the combined typescript code
  return `
${inputInterfaceTypescript}
${inputByNameInterfaceTypescript}
${outputTypeTypescript}
  `.trim();
};
