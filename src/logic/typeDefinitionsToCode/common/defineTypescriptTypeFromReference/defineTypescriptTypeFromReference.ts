import {
  TypeDefinitionOfQueryTableReference,
  TypeDefinition,
} from '../../../../domain';
import { TypeDefinitionReference } from '../../../../domain/objects/TypeDefinitionReference';
import { defineTypescriptTypeFromFunctionReference } from './defineTypescriptTypeFromFunctionReference';
import { defineTypescriptTypeFromTableReference } from './defineTypescriptTypeFromTableReference';

export const defineTypescriptTypeFromReference = ({
  reference,
  queryTableReferences,
  typeDefinitions,
}: {
  reference: TypeDefinitionReference;

  /**
   * table references are required, as queries can define custom aliases per table
   */
  queryTableReferences: TypeDefinitionOfQueryTableReference[];

  /**
   * type definitions are required, as table references can reference tables _or_ views - and we have to determine which one
   */
  typeDefinitions: TypeDefinition[];
}) => {
  // if its a table reference, return the table reference
  if (reference.tableReferencePath) {
    return defineTypescriptTypeFromTableReference({
      reference,
      queryTableReferences,
      typeDefinitions,
    });
  }

  // if its a function reference, return the function reference
  if (reference.functionReferencePath) {
    return defineTypescriptTypeFromFunctionReference({ reference });
  }

  // otherwise, we don't know how to handle this case
  throw new Error(
    'type definition reference does not reference a table or function; unexpected',
  ); // fail fast
};
