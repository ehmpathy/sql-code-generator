import Joi from 'joi';
import SchematicJoiModel from 'schematic-joi-model';

const queryDefinitionSchema = Joi.object().keys({
  name: Joi.string().required(),
  sql: Joi.string().required(),
});
export interface QueryDefinition {
  name: string;
  sql: string;
}
export class QueryDefinition extends SchematicJoiModel<QueryDefinition> implements QueryDefinition {
  public static schema = queryDefinitionSchema;
}
