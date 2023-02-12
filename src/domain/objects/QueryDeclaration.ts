import { DomainObject } from 'domain-objects';
import Joi from 'joi';

const schema = Joi.object().keys({
  path: Joi.string().required(),
  sql: Joi.string().required(),
});
export interface QueryDeclaration {
  path: string;
  sql: string;
}
export class QueryDeclaration
  extends DomainObject<QueryDeclaration>
  implements QueryDeclaration
{
  public static schema = schema;
}
