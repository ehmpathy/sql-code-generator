import { DomainObject } from 'domain-objects';
import Joi from 'joi';

import { TypeDefinitionReference } from './TypeDefinitionReference';

const schema = Joi.object().keys({
  alias: Joi.string().required(), // e.g., "v.id as version_id" => "version_id"
  typeReference: TypeDefinitionReference.schema.required(),
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
