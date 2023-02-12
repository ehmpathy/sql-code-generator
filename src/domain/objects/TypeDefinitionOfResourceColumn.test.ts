import { DataType } from '../constants';
import { TypeDefinitionOfResourceColumn } from './TypeDefinitionOfResourceColumn';

describe('TypeDefinitionOfResourceColumn', () => {
  it('should initialize for valid inputs', () => {
    const def = new TypeDefinitionOfResourceColumn({
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
      new TypeDefinitionOfResourceColumn({
        nameZZZ: 'id',
        type: [DataType.NUMBER],
      } as any); // tslint:disable-line no-unused-expression
    } catch (error) {
      expect(error.constructor.name).toEqual('ValidationError');
    }
  });
});
