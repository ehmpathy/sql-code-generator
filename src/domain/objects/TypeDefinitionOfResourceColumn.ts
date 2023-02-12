import Joi from 'joi';
import { DomainObject } from 'domain-objects';
import { DataType } from '../constants';

/*
  key value map of any key string -> data type[] (we join the array into a union)
*/
const schema = Joi.object().keys({
  name: Joi.string().required(),
  type: Joi.array().items(
    Joi.string()
      .valid(Object.values(DataType))
      .required(),
  ),
});
export interface TypeDefinitionOfResourceColumn {
  name: string;
  type: DataType[];
}
export class TypeDefinitionOfResourceColumn extends DomainObject<TypeDefinitionOfResourceColumn>
  implements TypeDefinitionOfResourceColumn {
  public static schema = schema;
}
