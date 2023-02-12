import { DataType, TypeDefinitionReference, TypeDefinition, TypeDefinitionOfQueryTableReference } from '../../../domain';
import { defineTypescriptTypeFromReference } from './defineTypescriptTypeFromReference/defineTypescriptTypeFromReference';
import { defineTypescriptTypeFromDataTypeArray } from './defineTypescriptTypeFromDataTypeArray';

export const defineTypescriptTypeFromDataTypeArrayOrReference = ({
  type,
  queryTableReferences,
  typeDefinitions,
}: {
  type: DataType[] | TypeDefinitionReference;
  typeDefinitions: TypeDefinition[];
  queryTableReferences: TypeDefinitionOfQueryTableReference[];
}) => {
  // if its a type reference, then use that handler
  if (type instanceof TypeDefinitionReference) {
    return defineTypescriptTypeFromReference({
      reference: type,
      queryTableReferences,
      typeDefinitions,
    });
  }

  // else, it must be data array. use that handler
  return defineTypescriptTypeFromDataTypeArray({ type });
};
