import { TypeDefinitionOfQuery } from './TypeDefinitionOfQuery';
import { TypeDefinitionOfQuerySelectExpression } from './TypeDefinitionOfQuerySelectExpression';
import { TypeDefinitionOfQueryTableReference } from './TypeDefinitionOfQueryTableReference';
import { TypeDefinitionOfQueryInputVariable } from './TypeDefinitionOfQueryInputVariable';

const selectExpression = new TypeDefinitionOfQuerySelectExpression({
  alias: 'id',
  sourcePath: 's.id',
});

const tableReference = new TypeDefinitionOfQueryTableReference({
  alias: 'u',
  tableName: 'user',
});

const inputVariable = new TypeDefinitionOfQueryInputVariable({
  name: 'externalId',
  tableReferencePath: 'i.external_id',
  functionReferencePath: null,
});

describe('TypeDefinitionOfQuerySelectExpression', () => {
  it('should initialize for valid inputs', () => {
    const def = new TypeDefinitionOfQuery({
      selectExpressions: [selectExpression],
      tableReferences: [tableReference],
      inputVariables: [inputVariable],
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
