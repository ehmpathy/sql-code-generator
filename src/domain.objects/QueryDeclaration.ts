import { DomainObject } from 'domain-objects';
import { z } from 'zod';

const schema = z.object({
  path: z.string(),
  sql: z.string(),
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
