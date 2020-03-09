import { TypeDefinitionReference } from './TypeDefinitionReference';

describe('TypeDefinitionReference', () => {
  it('should initialize for valid inputs', () => {
    const def = new TypeDefinitionReference({
      tableReferencePath: 'i.external_id',
      functionReferencePath: null,
    });
    expect(def).toMatchObject({
      tableReferencePath: 'i.external_id',
      functionReferencePath: null,
    });
  });
  it('should throw error on invalid input', () => {
    try {
      new TypeDefinitionReference({
        name: 'id',
        sourcePathZ: 's.id',
      } as any); // tslint:disable-line no-unused-expression
    } catch (error) {
      expect(error.constructor.name).toEqual('ValidationError');
    }
  });
});
