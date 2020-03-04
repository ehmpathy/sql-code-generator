import { TypeDefinitionOfQuerySelectExpression } from './TypeDefinitionOfQuerySelectExpression';

describe('TypeDefinitionOfQuerySelectExpression', () => {
  it('should initialize for valid inputs', () => {
    const def = new TypeDefinitionOfQuerySelectExpression({
      name: 'id',
      sourcePath: 's.id',
    });
    expect(def).toMatchObject({
      name: 'id',
      sourcePath: 's.id',
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
