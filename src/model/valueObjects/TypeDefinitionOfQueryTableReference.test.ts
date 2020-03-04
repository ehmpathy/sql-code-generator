import { TypeDefinitionOfQueryTableReference } from './TypeDefinitionOfQueryTableReference';

describe('TypeDefinitionOfQueryTableReference', () => {
  it('should initialize for valid inputs', () => {
    const def = new TypeDefinitionOfQueryTableReference({
      alias: 'u',
      tableName: 'user',
    });
    expect(def).toMatchObject({
      alias: 'u',
      tableName: 'user',
    });
  });
  it('should throw error on invalid input', () => {
    try {
      new TypeDefinitionOfQueryTableReference({
        name: 'id',
        sourcePathZ: 's.id',
      } as any); // tslint:disable-line no-unused-expression
    } catch (error) {
      expect(error.constructor.name).toEqual('ValidationError');
    }
  });
});
