import { DomainObject } from 'domain-objects';
import { z } from 'zod';

import { DataType } from './constants';
import { TypeDefinitionOfResourceInput } from './TypeDefinitionOfResourceInput';
import { TypeDefinitionOfResourceTable } from './TypeDefinitionOfResourceTable';

const schema = z.object({
  name: z.string(),
  inputs: z.array(TypeDefinitionOfResourceInput.schema),
  output: z.union([
    z.array(z.nativeEnum(DataType)),
    TypeDefinitionOfResourceTable.schema,
  ]),
});
export interface TypeDefinitionOfResourceFunction {
  name: string;
  inputs: TypeDefinitionOfResourceInput[];
  output: DataType[] | TypeDefinitionOfResourceTable; // functions can return a value or a table (e.g., postgres functions can return tables)
}
export class TypeDefinitionOfResourceFunction
  extends DomainObject<TypeDefinitionOfResourceFunction>
  implements TypeDefinitionOfResourceFunction
{
  public static schema = schema;
}
