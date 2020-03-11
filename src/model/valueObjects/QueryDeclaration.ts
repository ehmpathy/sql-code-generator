import Joi from 'joi';
import SchematicJoiModel from 'schematic-joi-model';

const schema = Joi.object().keys({
  name: Joi.string().required(),
  path: Joi.string().required(),
  sql: Joi.string().required(),
});
export interface QueryDeclaration {
  name: string;
  path: string;
  sql: string;
}
export class QueryDeclaration extends SchematicJoiModel<QueryDeclaration> implements QueryDeclaration {
  public static schema = schema;
}
