import { DataType } from '../../../../../model';
import { TypeDefinitionOfResourceColumn } from '../../../../../model/valueObjects/TypeDefinitionOfResourceColumn';
import { extractTypeDefinitionFromFunctionInputSql } from './extractTypeDefinitionFromFunctionInputSql';

describe('extractTypeDefinitionFromFunctionInputSql', () => {
  const examples = [
    {
      sql: 'in_price DECIMAL(5,2)',
      def: new TypeDefinitionOfResourceColumn({
        name: 'in_price',
        type: [DataType.NUMBER, DataType.NULL],
      }),
    },
    {
      sql: 'in_created_at datetime(6)',
      def: new TypeDefinitionOfResourceColumn({
        name: 'in_created_at',
        type: [DataType.DATE, DataType.NULL],
      }),
    },
    {
      sql: 'in_credit VARCHAR(190)',
      def: new TypeDefinitionOfResourceColumn({
        name: 'in_credit',
        type: [DataType.STRING, DataType.NULL],
      }),
    },
    {
      sql: 'in_photo_ids bigint[]',
      def: new TypeDefinitionOfResourceColumn({
        name: 'in_photo_ids',
        type: [DataType.NUMBER_ARRAY, DataType.NULL],
      }),
    },
  ];
  examples.forEach((example) => {
    it(`should be able to determine types accurately for this example: "${example.sql}"`, () => {
      const def = extractTypeDefinitionFromFunctionInputSql({ sql: example.sql });
      expect(def).toEqual(example.def);
    });
  });
});
