import { TypeDefinitionOfQuery } from './TypeDefinitionOfQuery';
import { TypeDefinitionOfQuerySelectExpression } from './TypeDefinitionOfQuerySelectExpression';
import { TypeDefinitionOfQueryTableReference } from './TypeDefinitionOfQueryTableReference';

const selectExpression = new TypeDefinitionOfQuerySelectExpression({
  name: 'id',
  sourcePath: 's.id',
});

const tableReference = new TypeDefinitionOfQueryTableReference({
  alias: 'u',
  tableName: 'user',
});

describe('TypeDefinitionOfQuerySelectExpression', () => {
  it('should initialize for valid inputs', () => {
    const def = new TypeDefinitionOfQuery({
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
      new TypeDefinitionOfQuery({
        name: 'id',
        sourcePathZ: 's.id',
      } as any); // tslint:disable-line no-unused-expression
    } catch (error) {
      expect(error.constructor.name).toEqual('ValidationError');
    }
  });
});
