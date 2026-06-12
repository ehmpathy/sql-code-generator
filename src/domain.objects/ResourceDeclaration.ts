import { DomainObject } from 'domain-objects';
import { z } from 'zod';

const schema = z.object({
  path: z.string(),
  sql: z.string(),
});

export interface ResourceDeclaration {
  path: string;
  sql: string;
}
export class ResourceDeclaration
  extends DomainObject<ResourceDeclaration>
  implements ResourceDeclaration
{
  public static schema = schema;
}
