import { DataType } from '../constants';
import { TypeDefinitionOfQueryInputVariable } from './TypeDefinitionOfQueryInputVariable';
import { TypeDefinitionReference } from './TypeDefinitionReference';

describe('TypeDefinitionOfQueryInputVariable', () => {
  it('should initialize for valid inputs', () => {
    const def = new TypeDefinitionOfQueryInputVariable({
      name: 'externalId',
      type: new TypeDefinitionReference({
        tableReferencePath: 'i.external_id',
        functionReferencePath: null,
      }),
    });
    expect(def).toMatchObject({
      name: 'externalId',
      type: new TypeDefinitionReference({
        tableReferencePath: 'i.external_id',
        functionReferencePath: null,
      }),
    });
  });
  it('should initialize for valid alternative inputs', () => {
    const def = new TypeDefinitionOfQueryInputVariable({
      name: 'externalId',
      type: [DataType.NUMBER],
    });
    expect(def).toMatchObject({
      name: 'externalId',
      type: [DataType.NUMBER],
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
