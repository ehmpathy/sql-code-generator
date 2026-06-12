import { DomainObject } from 'domain-objects';
import { z } from 'zod';

import { TypeDefinitionOfQueryInputVariable } from './TypeDefinitionOfQueryInputVariable';
import { TypeDefinitionOfQuerySelectExpression } from './TypeDefinitionOfQuerySelectExpression';
import { TypeDefinitionOfQueryTableReference } from './TypeDefinitionOfQueryTableReference';

const schema = z.object({
  name: z.string(),
  path: z.string(), // path to the sql that the typedef was based on
  selectExpressions: z.array(TypeDefinitionOfQuerySelectExpression.schema),
  tableReferences: z.array(TypeDefinitionOfQueryTableReference.schema),
  inputVariables: z.array(TypeDefinitionOfQueryInputVariable.schema),
});
export interface TypeDefinitionOfQuery {
  name: string;
  path: string;
  selectExpressions: TypeDefinitionOfQuerySelectExpression[];
  tableReferences: TypeDefinitionOfQueryTableReference[];
  inputVariables: TypeDefinitionOfQueryInputVariable[];
}
export class TypeDefinitionOfQuery
  extends DomainObject<TypeDefinitionOfQuery>
  implements TypeDefinitionOfQuery
{
  public static schema = schema;
}
