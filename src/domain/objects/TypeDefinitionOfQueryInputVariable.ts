import { DomainObject } from 'domain-objects';
import Joi from 'joi';

import { DataType } from '../constants';
import { TypeDefinitionReference } from './TypeDefinitionReference';

const schema = Joi.object().keys({
  name: Joi.string().required(),
  type: Joi.alternatives([
    TypeDefinitionReference.schema.required(),
    Joi.array().items(Joi.string().valid(...Object.values(DataType))),
  ]),
  plural: Joi.boolean().required(),
});
export interface TypeDefinitionOfQueryInputVariable {
  /**
   * e.g., ":externalId" => "externalId"
   */
  name: string;

  /**
   * e.g., either an explicit type or a reference to the type on a sql resource
   */
  type: TypeDefinitionReference | DataType[];

  /**
   * whether its a plural of this type or not
   */
  plural: boolean;
}
export class TypeDefinitionOfQueryInputVariable
  extends DomainObject<TypeDefinitionOfQueryInputVariable>
  implements TypeDefinitionOfQueryInputVariable
{
  public static schema = schema;
}
