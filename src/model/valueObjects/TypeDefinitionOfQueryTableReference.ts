import Joi from 'joi';
import SchematicJoiModel from 'schematic-joi-model';

const schema = Joi.object().keys({
  alias: Joi.string().required(), // e.g., "user u" => "u" or "user as u" => "u"
  tableName: Joi.string().required(), // e.g., "user"
});
export interface TypeDefinitionOfQueryTableReference {
  alias: string;
  tableName: string;
}
export class TypeDefinitionOfQueryTableReference extends SchematicJoiModel<TypeDefinitionOfQueryTableReference>
  implements TypeDefinitionOfQueryTableReference {
  public static schema = schema;
}
