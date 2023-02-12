import { DataType } from '../constants';
import { TypeDefinitionOfResourceInput } from './TypeDefinitionOfResourceInput';

describe('TypeDefinitionOfResourceInput', () => {
  it('should initialize for valid inputs', () => {
    const def = new TypeDefinitionOfResourceInput({
      name: 'id',
      type: [DataType.NUMBER],
    });
    expect(def).toMatchObject({
      name: 'id',
      type: [DataType.NUMBER],
    });
  });
  it('should throw error on invalid input', () => {
    try {
      new TypeDefinitionOfResourceInput({
        nameZZZ: 'id',
        type: [DataType.NUMBER],
      } as any); // tslint:disable-line no-unused-expression
    } catch (error) {
      expect(error.constructor.name).toEqual('ValidationError');
    }
  });
});
