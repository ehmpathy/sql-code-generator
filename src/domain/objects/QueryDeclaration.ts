import Joi from 'joi';
import { DomainObject } from 'domain-objects';

const schema = Joi.object().keys({
  path: Joi.string().required(),
  sql: Joi.string().required(),
});
export interface QueryDeclaration {
  path: string;
  sql: string;
}
export class QueryDeclaration extends DomainObject<QueryDeclaration> implements QueryDeclaration {
  public static schema = schema;
}
