import { DataType } from '../constants';
import { TypeDefinitionOfResourceColumn } from './TypeDefinitionOfResourceColumn';
import { TypeDefinitionOfResourceTable } from './TypeDefinitionOfResourceTable';

describe('TypeDefinitionOfResourceTable', () => {
  it('should initialize for valid inputs', () => {
    const changeDefinition = new TypeDefinitionOfResourceTable({
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
      ],
    });
    expect(changeDefinition).toMatchObject({
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
      ],
    });
  });
  it('should throw error on invalid input', () => {
    try {
      new TypeDefinitionOfResourceTable({
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
