import { DomainObject } from 'domain-objects';
import Joi from 'joi';

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
export class TypeDefinitionOfResourceView
  extends DomainObject<TypeDefinitionOfResourceView>
  implements TypeDefinitionOfResourceView
{
  public static schema = schema;
}
