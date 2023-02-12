import { DomainObject } from 'domain-objects';
import Joi from 'joi';

import { DataType } from '../constants';
import { TypeDefinitionReference } from './TypeDefinitionReference';

const schema = Joi.object().keys({
  name: Joi.string().required(),
  type: Joi.alternatives([
    TypeDefinitionReference.schema.required(),
    Joi.array().items(Joi.string().allow(Object.keys(DataType))),
  ]),
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
}
export class TypeDefinitionOfQueryInputVariable
  extends DomainObject<TypeDefinitionOfQueryInputVariable>
  implements TypeDefinitionOfQueryInputVariable
{
  public static schema = schema;
}
