import Joi from 'joi';
import SchematicJoiModel from 'schematic-joi-model';

const schema = Joi.object().keys({
  name: Joi.string().required(),
  tableReferencePath: Joi.string()
    .required()
    .allow(null),
  functionReferencePath: Joi.string()
    .required()
    .allow(null),
});
export interface TypeDefinitionOfQueryInputVariable {
  /**
   * e.g., ":externalId" => "externalId"
   */
  name: string;

  /**
   * e.g., "i.externalId", if references a table defined in "tableReference"s for query w/ alias i
   */
  tableReferencePath: string | null;

  /**
   * e.g., "upsert_image.0" if references first arg of function "upsert_image"
   */
  functionReferencePath: string | null;
}
export class TypeDefinitionOfQueryInputVariable extends SchematicJoiModel<TypeDefinitionOfQueryInputVariable>
  implements TypeDefinitionOfQueryInputVariable {
  public static schema = schema;
}
