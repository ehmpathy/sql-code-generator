import { TypeDefinitionReference } from '../../../../model/valueObjects/TypeDefinitionReference';
import { castResourceNameToTypescriptTypeName } from '../castResourceNameToTypescriptTypeName';
import { ResourceType } from '../../../../model';

export const defineTypescriptTypeFromFunctionReference = ({ reference }: { reference: TypeDefinitionReference }) => {
  // sanity check what this is called with, to help us debug if needed
  if (!reference.functionReferencePath) throw new Error('expected function reference to be defined'); // fail fast

  // grab the function name from the reference definition
  const [functionName, inputOrOutput, inputPropertyIndex] = reference.functionReferencePath.split('.');

  // grab the typescript name for this function
  const functionTypescriptName = castResourceNameToTypescriptTypeName({
    name: functionName,
    resourceType: ResourceType.FUNCTION,
  });

  // if its referencing the output, return that
  if (inputOrOutput === 'output') return `${functionTypescriptName}Output`;

  // if its referencing an input, return that
  if (inputOrOutput === 'input') return `${functionTypescriptName}Input['${inputPropertyIndex}']`;

  // if was neither, throw an error - it should always be one of the above
  throw new Error('type definition reference of function was not defined as "input" or "output"'); // fail fast, this is an invalid reference
};
