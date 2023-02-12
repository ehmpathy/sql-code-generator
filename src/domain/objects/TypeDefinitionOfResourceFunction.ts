import { DomainObject } from 'domain-objects';
import Joi from 'joi';

import { DataType } from '../constants';
import { TypeDefinitionOfResourceInput } from './TypeDefinitionOfResourceInput';
import { TypeDefinitionOfResourceTable } from './TypeDefinitionOfResourceTable';

const schema = Joi.object().keys({
  name: Joi.string().required(),
  inputs: Joi.array().items(TypeDefinitionOfResourceInput.schema).required(),
  output: Joi.alternatives(
    Joi.array()
      .items(Joi.string().valid(Object.values(DataType)))
      .required(),
    TypeDefinitionOfResourceTable.schema,
  ),
});
export interface TypeDefinitionOfResourceFunction {
  name: string;
  inputs: TypeDefinitionOfResourceInput[];
  output: DataType[] | TypeDefinitionOfResourceTable; // functions can return a value or a table (e.g., postgres functions can return tables)
}
export class TypeDefinitionOfResourceFunction
  extends DomainObject<TypeDefinitionOfResourceFunction>
  implements TypeDefinitionOfResourceFunction
{
  public static schema = schema;
}
