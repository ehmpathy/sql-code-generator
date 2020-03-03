import Joi from 'joi';
import SchematicJoiModel from 'schematic-joi-model';

import { TypeDefinitionOfResourceColumn } from './TypeDefinitionOfResourceColumn';

/*
  key value map of any key string -> data type[] (we join the array into a union)
*/
const schema = Joi.object().keys({
  name: Joi.string().required(),
  columns: Joi.array()
    .items(TypeDefinitionOfResourceColumn.schema)
    .required(),
});
export interface TypeDefinitionOfResourceTable {
  name: string;
  columns: TypeDefinitionOfResourceColumn[];
}
export class TypeDefinitionOfResourceTable extends SchematicJoiModel<TypeDefinitionOfResourceTable>
  implements TypeDefinitionOfResourceTable {
  public static schema = schema;
}
