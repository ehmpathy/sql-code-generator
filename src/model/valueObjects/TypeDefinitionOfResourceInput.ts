import Joi from 'joi';
import SchematicJoiModel from 'schematic-joi-model';
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
export interface TypeDefinitionOfResourceInput {
  name: string;
  type: DataType[];
}
export class TypeDefinitionOfResourceInput extends SchematicJoiModel<TypeDefinitionOfResourceInput>
  implements TypeDefinitionOfResourceInput {
  public static schema = schema;
}
