import { DomainObject } from 'domain-objects';
import { z } from 'zod';

import { TypeDefinitionOfResourceColumn } from './TypeDefinitionOfResourceColumn';

/*
  key value map of any key string -> data type[] (we join the array into a union)
*/
const schema = z.object({
  name: z.string(),
  columns: z.array(TypeDefinitionOfResourceColumn.schema),
});
export interface TypeDefinitionOfResourceTable {
  name: string;
  columns: TypeDefinitionOfResourceColumn[];
}
export class TypeDefinitionOfResourceTable
  extends DomainObject<TypeDefinitionOfResourceTable>
  implements TypeDefinitionOfResourceTable
{
  public static schema = schema;
}
