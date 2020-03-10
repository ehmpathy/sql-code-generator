import { TypeDefinitionOfQueryTableReference } from '../../../../model';
import { TypeDefinitionReference } from '../../../../model/valueObjects/TypeDefinitionReference';
import { defineTypescriptTypeFromFunctionReference } from './defineTypescriptTypeFromFunctionReference';
import { defineTypescriptTypeFromTableReference } from './defineTypescriptTypeFromTableReference';

export const defineTypescriptTypeFromReference = ({
  reference,
  queryTableReferences,
}: {
  reference: TypeDefinitionReference;

  /**
   * table references are required, as queries can define custom aliases per table
   */
  queryTableReferences: TypeDefinitionOfQueryTableReference[];
}) => {
  // if its a table reference, return the table reference
  if (reference.tableReferencePath) return defineTypescriptTypeFromTableReference({ reference, queryTableReferences });

  // if its a function reference, return the function reference
  if (reference.functionReferencePath) return defineTypescriptTypeFromFunctionReference({ reference });

  // otherwise, we don't know how to handle this case
  throw new Error('type definition reference does not reference a table or function; unexpected'); // fail fast
};
