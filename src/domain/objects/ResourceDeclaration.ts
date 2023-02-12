import Joi from 'joi';
import { DomainObject } from 'domain-objects';

const schema = Joi.object().keys({
  path: Joi.string().required(),
  sql: Joi.string().required(),
});

export interface ResourceDeclaration {
  path: string;
  sql: string;
}
export class ResourceDeclaration extends DomainObject<ResourceDeclaration> implements ResourceDeclaration {
  public static schema = schema;
}
