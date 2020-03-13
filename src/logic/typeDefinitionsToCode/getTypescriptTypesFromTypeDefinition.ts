import {
  TypeDefinitionOfQuery,
  TypeDefinitionOfResourceFunction,
  TypeDefinitionOfResourceTable,
  TypeDefinitionOfResourceView,
} from '../../model';
import { defineTypescriptTypesForQuery } from './query/defineTypescriptTypesForQuery';
import { defineTypescriptTypesForFunction } from './resource/function/defineTypescriptTypesForFunction';
import { defineTypescriptTypesForTable } from './resource/table/defineTypescriptTypesForTable';
import { defineTypescriptTypesForView } from './resource/view/defineTypescriptTypesForView';

export const getTypescriptTypesFromTypeDefinition = ({
  definition,
}: {
  definition:
    | TypeDefinitionOfQuery
    | TypeDefinitionOfResourceTable
    | TypeDefinitionOfResourceFunction
    | TypeDefinitionOfResourceView;
}) => {
  if (definition instanceof TypeDefinitionOfQuery) {
    return defineTypescriptTypesForQuery({
      definition,
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
    });
  }
  throw new Error('unexpected definition type'); // fail fast, this should never occur
};
