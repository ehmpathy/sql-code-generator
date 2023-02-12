import { DomainObject } from 'domain-objects';
import Joi from 'joi';

import { TypeDefinitionOfResourceColumn } from './TypeDefinitionOfResourceColumn';

/*
  key value map of any key string -> data type[] (we join the array into a union)
*/
const schema = Joi.object().keys({
  name: Joi.string().required(),
  columns: Joi.array().items(TypeDefinitionOfResourceColumn.schema).required(),
});
export interface TypeDefinitionOfResourceTable {
  name: string;
  columns: TypeDefinitionOfResourceColumn[];
}
export class TypeDefinitionOfResourceTable
  extends DomainObject<TypeDefinitionOfResourceTable>
  implements TypeDefinitionOfResourceTable
{
  public static schema = schema;
}
