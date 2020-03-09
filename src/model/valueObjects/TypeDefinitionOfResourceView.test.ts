import { TypeDefinitionOfQuerySelectExpression } from './TypeDefinitionOfQuerySelectExpression';
import { TypeDefinitionOfQueryTableReference } from './TypeDefinitionOfQueryTableReference';
import { TypeDefinitionOfResourceView } from './TypeDefinitionOfResourceView';
import { TypeDefinitionReference } from './TypeDefinitionReference';

const selectExpression = new TypeDefinitionOfQuerySelectExpression({
  alias: 'id',
  typeReference: new TypeDefinitionReference({
    tableReferencePath: 'u.id',
    functionReferencePath: null,
  }),
});

const tableReference = new TypeDefinitionOfQueryTableReference({
  alias: 'u',
  tableName: 'user',
});

describe('TypeDefinitionOfResourceView', () => {
  it('should initialize for valid inputs', () => {
    const def = new TypeDefinitionOfResourceView({
      name: 'cool_view',
      selectExpressions: [selectExpression],
      tableReferences: [tableReference],
    });
    expect(def).toMatchObject({
      selectExpressions: [selectExpression],
      tableReferences: [tableReference],
    });
  });
  it('should throw error on invalid input', () => {
    try {
      new TypeDefinitionOfResourceView({
        name: 'id',
        sourcePathZ: 's.id',
      } as any); // tslint:disable-line no-unused-expression
    } catch (error) {
      expect(error.constructor.name).toEqual('ValidationError');
    }
  });
});
