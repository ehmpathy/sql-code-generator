import { DomainObject } from 'domain-objects';
import { z } from 'zod';

import { TypeDefinitionReference } from './TypeDefinitionReference';

const schema = z.object({
  alias: z.string(), // e.g., "v.id as version_id" => "version_id"
  typeReference: TypeDefinitionReference.schema,
});
export interface TypeDefinitionOfQuerySelectExpression {
  alias: string;
  typeReference: TypeDefinitionReference;
}
export class TypeDefinitionOfQuerySelectExpression
  extends DomainObject<TypeDefinitionOfQuerySelectExpression>
  implements TypeDefinitionOfQuerySelectExpression
{
  public static schema = schema;
}
