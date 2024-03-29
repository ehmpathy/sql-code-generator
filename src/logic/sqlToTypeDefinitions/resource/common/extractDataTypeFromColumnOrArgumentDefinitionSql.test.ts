import { DataType } from '../../../../domain';
import { extractDataTypeFromColumnOrArgumentDefinitionSql } from './extractDataTypeFromColumnOrArgumentDefinitionSql';

describe('extractDataTypeFromColumnOrArgumentDefinitionSql', () => {
  const examples = [
    // mysql
    {
      sql: '`id` bigint(20) NOT NULL AUTO_INCREMENT',
      type: DataType.NUMBER,
    },
    {
      sql: 'price DECIMAL(5,2) DEFAULT NULL',
      type: DataType.NUMBER,
    },
    {
      sql: 'uuid char(36) COLLATE utf8mb4_bin NOT NULL',
      type: DataType.STRING,
    },
    {
      sql: '`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)',
      type: DataType.DATE,
    },
    {
      sql: 'credit VARCHAR(190) COLLATE utf8mb4_bin',
      type: DataType.STRING,
    },
    {
      sql: 'in_url varchar(190)',
      type: DataType.STRING,
    },
    {
      sql: '`ingredient_ids_hash` binary(32) NOT NULL',
      type: DataType.BUFFER,
    },
    // postgres
    {
      sql: 'id bigserial NOT NULL',
      type: DataType.NUMBER,
    },
    {
      sql: 'price numeric(5, 2) DEFAULT NULL',
      type: DataType.NUMBER,
    },
    {
      sql: 'uuid uuid NOT NULL',
      type: DataType.STRING,
    },
    {
      sql: 'description text NULL',
      type: DataType.STRING,
    },
    {
      sql: 'nicknames varchar[] NOT NULL',
      type: DataType.STRING_ARRAY,
    },
    {
      sql: 'created_at timestamptz NOT NULL DEFAULT now()',
      type: DataType.DATE,
    },
    {
      sql: 'photo_ids_hash bytea NULL',
      type: DataType.BUFFER,
    },
    {
      sql: 'in_photo_ids bigint[]',
      type: DataType.NUMBER_ARRAY,
    },
    {
      sql: 'verified boolean',
      type: DataType.BOOLEAN,
    },
    {
      sql: 'in_adhoc_data jsonb',
      type: DataType.JSON,
    },
    {
      sql: 'in_adhoc_data JSON',
      type: DataType.JSON,
    },
  ];
  examples.forEach((example) => {
    it(`should be able to determine type accurately for this example: "${example.sql}"`, () => {
      const type = extractDataTypeFromColumnOrArgumentDefinitionSql({
        sql: example.sql,
      });
      expect(type).toEqual(example.type);
    });
  });
});
