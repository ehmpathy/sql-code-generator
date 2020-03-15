import Joi from 'joi';
import SchematicJoiModel from 'schematic-joi-model';

const schema = Joi.object().keys({
  path: Joi.string().required(),
  sql: Joi.string().required(),
});

export interface ResourceDeclaration {
  path: string;
  sql: string;
}
export class ResourceDeclaration extends SchematicJoiModel<ResourceDeclaration> implements ResourceDeclaration {
  public static schema = schema;
}
