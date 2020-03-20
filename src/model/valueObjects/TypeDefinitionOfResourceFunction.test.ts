import { DataType } from '../constants';
import { TypeDefinitionOfResourceFunction } from './TypeDefinitionOfResourceFunction';
import { TypeDefinitionOfResourceInput } from './TypeDefinitionOfResourceInput';

describe('TypeDefinitionOfResourceFunction', () => {
  it('should initialize for valid inputs', () => {
    const changeDefinition = new TypeDefinitionOfResourceFunction({
      name: 'image',
      inputs: [
        new TypeDefinitionOfResourceInput({
          name: 'id',
          type: [DataType.NUMBER],
        }),
        new TypeDefinitionOfResourceInput({
          name: 'url',
          type: [DataType.STRING],
        }),
      ],
      output: [DataType.DATE],
    });
    expect(changeDefinition).toMatchObject({
      name: 'image',
      inputs: [
        new TypeDefinitionOfResourceInput({
          name: 'id',
          type: [DataType.NUMBER],
        }),
        new TypeDefinitionOfResourceInput({
          name: 'url',
          type: [DataType.STRING],
        }),
      ],
      output: [DataType.DATE],
    });
  });
  it('should throw error on invalid input', () => {
    try {
      new TypeDefinitionOfResourceFunction({
        id: ['random string'],
        uuid: [DataType.STRING],
        created_at: [DataType.DATE],
        reference_id: [DataType.NUMBER, DataType.NULL],
      } as any); // tslint:disable-line no-unused-expression
    } catch (error) {
      expect(error.constructor.name).toEqual('ValidationError');
    }
  });
});
