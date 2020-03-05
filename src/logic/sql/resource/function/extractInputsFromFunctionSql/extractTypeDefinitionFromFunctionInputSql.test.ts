import { DataType } from '../../../../../model';
import { TypeDefinitionOfResourceColumn } from '../../../../../model/valueObjects/TypeDefinitionOfResourceColumn';
import { extractTypeDefinitionFromFunctionInputSql } from './extractTypeDefinitionFromFunctionInputSql';

describe('extractTypeDefinitionFromFunctionInputSql', () => {
  const examples = [
    {
      sql: 'in_price DECIMAL(5,2)',
      def: new TypeDefinitionOfResourceColumn({
        name: 'in_price',
        type: [DataType.NUMBER],
      }),
    },
    {
      sql: 'in_created_at datetime(6)',
      def: new TypeDefinitionOfResourceColumn({
        name: 'in_created_at',
        type: [DataType.DATE],
      }),
    },
    {
      sql: 'in_credit VARCHAR(190)',
      def: new TypeDefinitionOfResourceColumn({
        name: 'in_credit',
        type: [DataType.STRING],
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
