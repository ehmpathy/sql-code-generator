import { TypeDefinitionOfQueryInputVariable } from './TypeDefinitionOfQueryInputVariable';

describe('TypeDefinitionOfQueryInputVariable', () => {
  it('should initialize for valid inputs', () => {
    const def = new TypeDefinitionOfQueryInputVariable({
      name: 'externalId',
      tableReferencePath: 'i.external_id',
      functionReferencePath: null,
    });
    expect(def).toMatchObject({
      name: 'externalId',
      tableReferencePath: 'i.external_id',
      functionReferencePath: null,
    });
  });
  it('should throw error on invalid input', () => {
    try {
      new TypeDefinitionOfQueryInputVariable({
        name: 'id',
        sourcePathZ: 's.id',
      } as any); // tslint:disable-line no-unused-expression
    } catch (error) {
      expect(error.constructor.name).toEqual('ValidationError');
    }
  });
});
