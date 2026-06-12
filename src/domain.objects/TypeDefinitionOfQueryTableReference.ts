import { DomainObject } from 'domain-objects';
import { z } from 'zod';

const schema = z.object({
  alias: z.string(), // e.g., "user u" => "u" or "user as u" => "u" or "upsert_job(...) as dgv" => "dgv"
  tableName: z.string().nullable(), // e.g., "user"
  functionName: z.string().nullable(), // e.g., "upsert_job"
});
export interface TypeDefinitionOfQueryTableReference {
  alias: string;
  tableName: string | null; // not null when table refers to a persisted table
  functionName: string | null; // not null when table refers to the output of a function
}
export class TypeDefinitionOfQueryTableReference
  extends DomainObject<TypeDefinitionOfQueryTableReference>
  implements TypeDefinitionOfQueryTableReference
{
  public static schema = schema;
}
