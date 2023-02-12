import { DomainObject } from 'domain-objects';
import Joi from 'joi';

const schema = Joi.object().keys({
  tableReferencePath: Joi.string().required().allow(null),
  functionReferencePath: Joi.string().required().allow(null),
});
export interface TypeDefinitionReference {
  /**
   * e.g., "i.externalId", if references a table defined in "tableReference"s for the query w/ alias i
   */
  tableReferencePath: string | null;

  /**
   * e.g., "upsert_image.0" if references first arg of function "upsert_image"
   */
  functionReferencePath: string | null;
}
export class TypeDefinitionReference
  extends DomainObject<TypeDefinitionReference>
  implements TypeDefinitionReference
{
  public static schema = schema;
}
