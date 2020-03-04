import Joi from 'joi';
import SchematicJoiModel from 'schematic-joi-model';

import { TypeDefinitionOfQuerySelectExpression } from './TypeDefinitionOfQuerySelectExpression';
import { TypeDefinitionOfQueryTableReference } from './TypeDefinitionOfQueryTableReference';

const schema = Joi.object().keys({
  name: Joi.string().required(),
  selectExpressions: Joi.array()
    .items(TypeDefinitionOfQuerySelectExpression.schema)
    .required(),
  tableReferences: Joi.array()
    .items(TypeDefinitionOfQueryTableReference.schema)
    .required(),
});
export interface TypeDefinitionOfResourceView {
  name: string;
  selectExpressions: TypeDefinitionOfQuerySelectExpression[];
  tableReferences: TypeDefinitionOfQueryTableReference[];
}
export class TypeDefinitionOfResourceView extends SchematicJoiModel<TypeDefinitionOfResourceView>
  implements TypeDefinitionOfResourceView {
  public static schema = schema;
}
