import { TypeDefinitionOfQuery } from './TypeDefinitionOfQuery';
import { TypeDefinitionOfQueryInputVariable } from './TypeDefinitionOfQueryInputVariable';
import { TypeDefinitionOfQuerySelectExpression } from './TypeDefinitionOfQuerySelectExpression';
import { TypeDefinitionOfQueryTableReference } from './TypeDefinitionOfQueryTableReference';
import { TypeDefinitionReference } from './TypeDefinitionReference';

const selectExpression = new TypeDefinitionOfQuerySelectExpression({
  alias: 'id',
  typeReference: new TypeDefinitionReference({
    tableReferencePath: 's.id',
    functionReferencePath: null,
  }),
});

const tableReference = new TypeDefinitionOfQueryTableReference({
  alias: 'u',
  tableName: 'user',
});

const inputVariable = new TypeDefinitionOfQueryInputVariable({
  name: 'externalId',
  typeReference: new TypeDefinitionReference({
    tableReferencePath: 'i.external_id',
    functionReferencePath: null,
  }),
});

describe('TypeDefinitionOfQuerySelectExpression', () => {
  it('should initialize for valid inputs', () => {
    const def = new TypeDefinitionOfQuery({
      name: 'super_cool_query',
      path: '__FILE_PATH__',
      selectExpressions: [selectExpression],
      tableReferences: [tableReference],
      inputVariables: [inputVariable],
    });
    expect(def).toMatchObject({
      selectExpressions: [selectExpression],
      tableReferences: [tableReference],
      inputVariables: [inputVariable],
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
