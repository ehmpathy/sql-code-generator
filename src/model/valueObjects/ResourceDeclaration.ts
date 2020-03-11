import Joi from 'joi';
import SchematicJoiModel from 'schematic-joi-model';

export enum ResourceType {
  TABLE = 'TABLE',
  FUNCTION = 'FUNCTION',
  PROCEDURE = 'PROCEDURE',
  VIEW = 'VIEW",',
}

const schema = Joi.object().keys({
  type: Joi.string().valid(Object.values(ResourceType)),
  name: Joi.string().required(),
  path: Joi.string().required(),
  sql: Joi.string().required(),
});

export interface ResourceDeclaration {
  type: ResourceType;
  name: string;
  path: string;
  sql: string;
}
export class ResourceDeclaration extends SchematicJoiModel<ResourceDeclaration> implements ResourceDeclaration {
  public static schema = schema;
}
