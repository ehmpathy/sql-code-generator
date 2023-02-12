import {
  TypeDefinitionOfQuery,
  TypeDefinitionOfResourceFunction,
  TypeDefinitionOfResourceTable,
  TypeDefinitionOfResourceView,
  TypeDefinition,
} from '../../domain';
import { defineTypescriptTypesForQuery } from './query/defineTypescriptTypesForQuery';
import { defineTypescriptTypesForFunction } from './resource/function/defineTypescriptTypesForFunction';
import { defineTypescriptTypesForTable } from './resource/table/defineTypescriptTypesForTable';
import { defineTypescriptTypesForView } from './resource/view/defineTypescriptTypesForView';

export const getTypescriptTypesFromTypeDefinition = ({
  definition,
  allDefinitions,
}: {
  definition: TypeDefinition;
  allDefinitions: TypeDefinition[];
}) => {
  if (definition instanceof TypeDefinitionOfQuery) {
    return defineTypescriptTypesForQuery({
      definition,
      allDefinitions,
    });
  }
  if (definition instanceof TypeDefinitionOfResourceTable) {
    return defineTypescriptTypesForTable({
      definition,
    });
  }
  if (definition instanceof TypeDefinitionOfResourceFunction) {
    return defineTypescriptTypesForFunction({
      definition,
    });
  }
  if (definition instanceof TypeDefinitionOfResourceView) {
    return defineTypescriptTypesForView({
      definition,
      allDefinitions,
    });
  }
  throw new Error('unexpected definition type'); // fail fast, this should never occur
};
