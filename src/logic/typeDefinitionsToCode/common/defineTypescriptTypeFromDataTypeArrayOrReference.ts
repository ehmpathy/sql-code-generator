import {
  DataType,
  TypeDefinitionReference,
  TypeDefinition,
  TypeDefinitionOfQueryTableReference,
} from '../../../domain';
import { defineTypescriptTypeFromDataTypeArray } from './defineTypescriptTypeFromDataTypeArray';
import { defineTypescriptTypeFromReference } from './defineTypescriptTypeFromReference/defineTypescriptTypeFromReference';

export const defineTypescriptTypeFromDataTypeArrayOrReference = ({
  type,
  plural,
  queryTableReferences,
  typeDefinitions,
}: {
  type: DataType[] | TypeDefinitionReference;
  plural: boolean;
  typeDefinitions: TypeDefinition[];
  queryTableReferences: TypeDefinitionOfQueryTableReference[];
}) => {
  // if its a type reference, then use that handler
  if (type instanceof TypeDefinitionReference) {
    const defined = defineTypescriptTypeFromReference({
      reference: type,
      queryTableReferences,
      typeDefinitions,
    });
    if (plural) return `${defined}[]`;
    return defined;
  }

  // else, it must be data array. use that handler
  return defineTypescriptTypeFromDataTypeArray({ type });
};
