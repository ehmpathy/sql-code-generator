import { DomainObject } from 'domain-objects';
import Joi from 'joi';

import { DataType } from '../constants';

/*
  key value map of any key string -> data type[] (we join the array into a union)
*/
const schema = Joi.object().keys({
  name: Joi.string().required(),
  type: Joi.array().items(
    Joi.string()
      .valid(...Object.values(DataType))
      .required(),
  ),
});
export interface TypeDefinitionOfResourceInput {
  name: string;
  type: DataType[];
}
export class TypeDefinitionOfResourceInput
  extends DomainObject<TypeDefinitionOfResourceInput>
  implements TypeDefinitionOfResourceInput
{
  public static schema = schema;
}
