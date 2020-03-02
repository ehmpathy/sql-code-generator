import Joi from 'joi';
import SchematicJoiModel from 'schematic-joi-model';
import { DatabaseLanguage } from '../constants';
import { QueryDefinition } from './QueryDefinition';
import { ResourceDefinition } from './ResourceDefinition';

const generatorConfigSchema = Joi.object().keys({
  language: Joi.string().valid(Object.values(DatabaseLanguage)),
  dialect: Joi.string().required(),
  definitions: Joi.array().items(QueryDefinition.schema, ResourceDefinition.schema),
});

type DefinitionObject = QueryDefinition | ResourceDefinition;
export interface GeneratorConfig {
  language: DatabaseLanguage;
  dialect: string;
  definitions: DefinitionObject[];
}
export class GeneratorConfig extends SchematicJoiModel<GeneratorConfig> implements GeneratorConfig {
  public static schema = generatorConfigSchema;
}
