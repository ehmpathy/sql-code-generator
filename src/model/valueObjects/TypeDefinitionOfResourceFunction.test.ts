import { TypeDefinitionOfResourceColumn } from '.';
import { DataType } from '../constants';
import { TypeDefinitionOfResourceFunction } from './TypeDefinitionOfResourceFunction';
import { TypeDefinitionOfResourceInput } from './TypeDefinitionOfResourceInput';
import { TypeDefinitionOfResourceTable } from './TypeDefinitionOfResourceTable';

describe('TypeDefinitionOfResourceFunction', () => {
  it('should initialize for valid inputs', () => {
    const changeDefinition = new TypeDefinitionOfResourceFunction({
      name: 'get_image_created_at',
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
      name: 'get_image_created_at',
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
  it('should instantiate for an output of a table', () => {
    const changeDefinition = new TypeDefinitionOfResourceFunction({
      name: 'upsert_image',
      inputs: [
        new TypeDefinitionOfResourceInput({
          name: 'in_url',
          type: [DataType.STRING],
        }),
        new TypeDefinitionOfResourceInput({
          name: 'in_description',
          type: [DataType.STRING],
        }),
      ],
      output: new TypeDefinitionOfResourceTable({
        name: 'image',
        columns: [
          new TypeDefinitionOfResourceColumn({
            name: 'id',
            type: [DataType.NUMBER],
          }),
          new TypeDefinitionOfResourceColumn({
            name: 'url',
            type: [DataType.STRING],
          }),
          new TypeDefinitionOfResourceColumn({
            name: 'description',
            type: [DataType.STRING],
          }),
        ],
      }),
    });
    expect(changeDefinition.name).toEqual('upsert_image'); // sanity check
    expect(changeDefinition.output).toBeInstanceOf(TypeDefinitionOfResourceTable); // sanity check
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
