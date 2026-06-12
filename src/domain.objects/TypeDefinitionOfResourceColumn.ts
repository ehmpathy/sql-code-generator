import { DomainObject } from 'domain-objects';
import { z } from 'zod';

import { DataType } from './constants';

/*
  key value map of any key string -> data type[] (we join the array into a union)
*/
const schema = z.object({
  name: z.string(),
  type: z.array(z.nativeEnum(DataType)),
});
export interface TypeDefinitionOfResourceColumn {
  name: string;
  type: DataType[];
}
export class TypeDefinitionOfResourceColumn
  extends DomainObject<TypeDefinitionOfResourceColumn>
  implements TypeDefinitionOfResourceColumn
{
  public static schema = schema;
}
