import { DomainObject } from 'domain-objects';
import { z } from 'zod';

import { TypeDefinitionOfQuerySelectExpression } from './TypeDefinitionOfQuerySelectExpression';
import { TypeDefinitionOfQueryTableReference } from './TypeDefinitionOfQueryTableReference';

const schema = z.object({
  name: z.string(),
  selectExpressions: z.array(TypeDefinitionOfQuerySelectExpression.schema),
  tableReferences: z.array(TypeDefinitionOfQueryTableReference.schema),
});
export interface TypeDefinitionOfResourceView {
  name: string;
  selectExpressions: TypeDefinitionOfQuerySelectExpression[];
  tableReferences: TypeDefinitionOfQueryTableReference[];
}
export class TypeDefinitionOfResourceView
  extends DomainObject<TypeDefinitionOfResourceView>
  implements TypeDefinitionOfResourceView
{
  public static schema = schema;
}
