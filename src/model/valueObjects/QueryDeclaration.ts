import Joi from 'joi';
import SchematicJoiModel from 'schematic-joi-model';

const schema = Joi.object().keys({
  path: Joi.string().required(),
  sql: Joi.string().required(),
});
export interface QueryDeclaration {
  path: string;
  sql: string;
}
export class QueryDeclaration extends SchematicJoiModel<QueryDeclaration> implements QueryDeclaration {
  public static schema = schema;
}
