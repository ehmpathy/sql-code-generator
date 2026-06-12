import { DomainObject } from 'domain-objects';
import { z } from 'zod';

const schema = z.object({
  id: z.string(),
  sql: z.string(),
});
export interface SqlSubqueryReference {
  id: string;
  sql: string;
}
export class SqlSubqueryReference
  extends DomainObject<SqlSubqueryReference>
  implements SqlSubqueryReference
{
  public static schema = schema;
}
