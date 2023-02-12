import Joi from 'joi';
import { DomainObject } from 'domain-objects';
import { DatabaseLanguage, GeneratedOutputPaths } from '../constants';
import { QueryDeclaration } from './QueryDeclaration';
import { ResourceDeclaration } from './ResourceDeclaration';

const generatorConfigSchema = Joi.object().keys({
  rootDir: Joi.string().required(), // dir of config file, to which all config paths are relative
  language: Joi.string().valid(Object.values(DatabaseLanguage)),
  dialect: Joi.string().required(),
  generates: Joi.object().keys({
    types: Joi.string().required(),
    queryFunctions: Joi.string().optional(),
  }),
  declarations: Joi.array().items(QueryDeclaration.schema, ResourceDeclaration.schema),
});

type DeclarationObject = QueryDeclaration | ResourceDeclaration;
export interface GeneratorConfig {
  rootDir: string;
  generates: GeneratedOutputPaths;
  language: DatabaseLanguage;
  dialect: string;
  declarations: DeclarationObject[];
}
export class GeneratorConfig extends DomainObject<GeneratorConfig> implements GeneratorConfig {
  public static schema = generatorConfigSchema;
}
