import Joi from 'joi';
import SchematicJoiModel from 'schematic-joi-model';
import { TypeDefinitionReference } from './TypeDefinitionReference';

const schema = Joi.object().keys({
  name: Joi.string().required(),
  typeReference: TypeDefinitionReference.schema.required(),
});
export interface TypeDefinitionOfQueryInputVariable {
  /**
   * e.g., ":externalId" => "externalId"
   */
  name: string;

  typeReference: TypeDefinitionReference;
}
export class TypeDefinitionOfQueryInputVariable extends SchematicJoiModel<TypeDefinitionOfQueryInputVariable>
  implements TypeDefinitionOfQueryInputVariable {
  public static schema = schema;
}
