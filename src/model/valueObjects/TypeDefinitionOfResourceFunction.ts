import Joi from 'joi';
import SchematicJoiModel from 'schematic-joi-model';

import { TypeDefinitionOfResourceInput } from './TypeDefinitionOfResourceInput';
import { DataType } from '../constants';

const schema = Joi.object().keys({
  name: Joi.string().required(),
  inputs: Joi.array()
    .items(TypeDefinitionOfResourceInput.schema)
    .required(),
  output: Joi.array()
    .items(Joi.string().valid(Object.values(DataType)))
    .required(),
});
export interface TypeDefinitionOfResourceFunction {
  name: string;
  inputs: TypeDefinitionOfResourceInput[];
  output: DataType[]; // functions return only one value
}
export class TypeDefinitionOfResourceFunction extends SchematicJoiModel<TypeDefinitionOfResourceFunction>
  implements TypeDefinitionOfResourceFunction {
  public static schema = schema;
}
