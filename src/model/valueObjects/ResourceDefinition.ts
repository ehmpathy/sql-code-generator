import Joi from 'joi';
import SchematicJoiModel from 'schematic-joi-model';

export enum ResourceType {
  TABLE = 'TABLE',
  FUNCTION = 'FUNCTION',
  PROCEDURE = 'PROCEDURE',
  VIEW = 'VIEW",',
}

const resourceDefinitionSchema = Joi.object().keys({
  type: Joi.string().valid(Object.values(ResourceType)),
  name: Joi.string().required(),
  sql: Joi.string().required(),
});

export interface ResourceDefinition {
  type: ResourceType;
  name: string; // e.g., table or sproc name
  sql: string;
}
export class ResourceDefinition extends SchematicJoiModel<ResourceDefinition> implements ResourceDefinition {
  public static schema = resourceDefinitionSchema;
}
