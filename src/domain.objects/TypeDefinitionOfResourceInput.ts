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
export interface TypeDefinitionOfResourceInput {
  name: string;
  type: DataType[];
}
export class TypeDefinitionOfResourceInput
  extends DomainObject<TypeDefinitionOfResourceInput>
  implements TypeDefinitionOfResourceInput
{
  public static schema = schema;
}
