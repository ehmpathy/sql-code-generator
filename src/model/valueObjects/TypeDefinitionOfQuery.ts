import Joi from 'joi';
import SchematicJoiModel from 'schematic-joi-model';

import { TypeDefinitionOfQuerySelectExpression } from './TypeDefinitionOfQuerySelectExpression';
import { TypeDefinitionOfQueryTableReference } from './TypeDefinitionOfQueryTableReference';

const schema = Joi.object().keys({
  selectExpressions: Joi.array()
    .items(TypeDefinitionOfQuerySelectExpression.schema)
    .required(),
  tableReferences: Joi.array()
    .items(TypeDefinitionOfQueryTableReference.schema)
    .required(),
});
export interface TypeDefinitionOfQuery {
  selectExpressions: TypeDefinitionOfQuerySelectExpression[];
  tableReferences: TypeDefinitionOfQueryTableReference[];
}
export class TypeDefinitionOfQuery extends SchematicJoiModel<TypeDefinitionOfQuery> implements TypeDefinitionOfQuery {
  public static schema = schema;
}
