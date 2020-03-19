import Joi from 'joi';
import SchematicJoiModel from 'schematic-joi-model';
import { TypeDefinitionReference } from './TypeDefinitionReference';
import { DataType } from '../constants';

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
export class TypeDefinitionOfQueryInputVariable extends SchematicJoiModel<TypeDefinitionOfQueryInputVariable>
  implements TypeDefinitionOfQueryInputVariable {
  public static schema = schema;
}
