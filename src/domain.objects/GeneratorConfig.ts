import { DomainObject } from 'domain-objects';
import { z } from 'zod';

import { DatabaseLanguage, type GeneratedOutputPaths } from './constants';
import { QueryDeclaration } from './QueryDeclaration';
import { ResourceDeclaration } from './ResourceDeclaration';

const generatorConfigSchema = z.object({
  rootDir: z.string(), // dir of config file, to which all config paths are relative
  language: z.nativeEnum(DatabaseLanguage),
  dialect: z.string(),
  generates: z.object({
    types: z.string(),
    queryFunctions: z.string().optional(),
  }),
  declarations: z.array(
    z.union([QueryDeclaration.schema, ResourceDeclaration.schema]),
  ),
});

type DeclarationObject = QueryDeclaration | ResourceDeclaration;
export interface GeneratorConfig {
  rootDir: string;
  generates: GeneratedOutputPaths;
  language: DatabaseLanguage;
  dialect: string;
  declarations: DeclarationObject[];
}
export class GeneratorConfig
  extends DomainObject<GeneratorConfig>
  implements GeneratorConfig
{
  public static schema = generatorConfigSchema;
}
