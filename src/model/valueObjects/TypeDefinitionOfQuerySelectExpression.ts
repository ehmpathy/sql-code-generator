import Joi from 'joi';
import SchematicJoiModel from 'schematic-joi-model';

/*
  key value map of any key string -> data type[] (we join the array into a union)
*/
const schema = Joi.object().keys({
  name: Joi.string().required(), // e.g., "v.id as version_id" => "version_id"
  sourcePath: Joi.string().required(), // e.g., "id" or "s.id" or "job.uuid"
});
export interface TypeDefinitionOfQuerySelectExpression {
  name: string;
  sourcePath: string;
}
export class TypeDefinitionOfQuerySelectExpression extends SchematicJoiModel<TypeDefinitionOfQuerySelectExpression>
  implements TypeDefinitionOfQuerySelectExpression {
  public static schema = schema;
}
