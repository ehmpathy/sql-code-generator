import { TypeDefinitionOfQuerySelectExpression } from './TypeDefinitionOfQuerySelectExpression';
import { TypeDefinitionReference } from './TypeDefinitionReference';

describe('TypeDefinitionOfQuerySelectExpression', () => {
  it('should initialize for valid inputs', () => {
    const def = new TypeDefinitionOfQuerySelectExpression({
      alias: 'id',
      typeReference: new TypeDefinitionReference({
        tableReferencePath: 's.id',
        functionReferencePath: null,
      }),
    });
    expect(def).toMatchObject({
      alias: 'id',
      typeReference: new TypeDefinitionReference({
        tableReferencePath: 's.id',
        functionReferencePath: null,
      }),
    });
  });
  it('should throw error on invalid input', () => {
    try {
      new TypeDefinitionOfQuerySelectExpression({
        name: 'id',
        sourcePathZ: 's.id',
      } as any); // tslint:disable-line no-unused-expression
    } catch (error) {
      expect(error.constructor.name).toEqual('ValidationError');
    }
  });
});
