import { DomainObject } from 'domain-objects';
import { z } from 'zod';

import { DataType } from './constants';
import { TypeDefinitionReference } from './TypeDefinitionReference';

const schema = z.object({
  name: z.string(),
  type: z.union([
    TypeDefinitionReference.schema,
    z.array(z.nativeEnum(DataType)),
  ]),
  plural: z.boolean(),
});
export interface TypeDefinitionOfQueryInputVariable {
  /**
   * e.g., ":externalId" => "externalId"
   */
  name: string;

  /**
   * e.g., either an explicit type or a reference to the type on a sql resource
   */
  type: TypeDefinitionReference | DataType[];

  /**
   * whether its a plural of this type or not
   */
  plural: boolean;
}
export class TypeDefinitionOfQueryInputVariable
  extends DomainObject<TypeDefinitionOfQueryInputVariable>
  implements TypeDefinitionOfQueryInputVariable
{
  public static schema = schema;
}
