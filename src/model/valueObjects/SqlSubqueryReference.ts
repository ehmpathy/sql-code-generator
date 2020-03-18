import Joi from 'joi';
import SchematicJoiModel from 'schematic-joi-model';

const schema = Joi.object().keys({
  id: Joi.string().required(),
  sql: Joi.string().required(),
});
export interface SqlSubqueryReference {
  id: string;
  sql: string;
}
export class SqlSubqueryReference extends SchematicJoiModel<SqlSubqueryReference> implements SqlSubqueryReference {
  public static schema = schema;
}
