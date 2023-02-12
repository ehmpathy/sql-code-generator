import { DataType } from '../../../../domain';
import { TypeDefinitionOfResourceColumn } from '../../../../domain/objects/TypeDefinitionOfResourceColumn';
import { extractTypeDefinitionFromColumnSql } from './extractTypeDefinitionFromColumnSql';

describe('extractTypeDefinitionFromColumnSql', () => {
  const examples = [
    {
      sql: '`id` bigint(20) NOT NULL AUTO_INCREMENT',
      def: new TypeDefinitionOfResourceColumn({
        name: 'id',
        type: [DataType.NUMBER],
      }),
    },
    {
      sql: 'price DECIMAL(5,2) DEFAULT NULL',
      def: new TypeDefinitionOfResourceColumn({
        name: 'price',
        type: [DataType.NUMBER, DataType.NULL],
      }),
    },
    {
      sql: 'uuid char(36) COLLATE utf8mb4_bin NOT NULL',
      def: new TypeDefinitionOfResourceColumn({
        name: 'uuid',
        type: [DataType.STRING],
      }),
    },
    {
      sql: '`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)',
      def: new TypeDefinitionOfResourceColumn({
        name: 'created_at',
        type: [DataType.DATE],
      }),
    },
    {
      sql: 'credit VARCHAR(190) COLLATE utf8mb4_bin',
      def: new TypeDefinitionOfResourceColumn({
        name: 'credit',
        type: [DataType.STRING, DataType.NULL],
      }),
    },
  ];
  examples.forEach(example => {
    it(`should be able to determine types accurately for this example: "${example.sql}"`, () => {
      const def = extractTypeDefinitionFromColumnSql({ sql: example.sql });
      expect(def).toEqual(example.def);
    });
  });
});
