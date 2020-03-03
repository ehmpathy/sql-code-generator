import { DataType, TypeDefinitionOfResourceColumn } from '../../../../model';

// https://dev.mysql.com/doc/refman/8.0/en/string-types.html
const mysqlStringTypes = [
  'CHAR',
  'VARCHAR',
  'TINYTEXT',
  'TEXT',
  'MEDIUMTEXT',
  'LONGTEXT',
  'ENUM', // note: we treat enums as strings; TODO: https://github.com/uladkasach/sql-code-generator/issues/1
];

// https://dev.mysql.com/doc/refman/8.0/en/numeric-types.html
const mysqlNumberTypes = [
  'INTEGER',
  'INT',
  'SMALLINT',
  'TINYINT',
  'MEDIUMINT',
  'BIGINT',
  'DECIMAL',
  'NUMERIC',
  'FLOAT',
  'DOUBLE',
];

// https://dev.mysql.com/doc/refman/8.0/en/date-and-time-types.html
const mysqlDateTypes = ['DATE', 'TIME', 'DATETIME', 'TIMESTAMP', 'YEAR'];

export const extractTypeDefinitionFromColumnSql = ({ sql }: { sql: string }) => {
  const sqlUpper = sql.toUpperCase();

  // 1. extract the name; its typically the first string
  const name = sql.split(' ')[0].replace(/[^a-zA-Z_]+/gi, '');

  // 2. extract the root type;
  const primaryType = (() => {
    if (mysqlStringTypes.some((mysqlType) => sqlUpper.includes(` ${mysqlType}`))) return DataType.STRING;
    if (mysqlNumberTypes.some((mysqlType) => sqlUpper.includes(` ${mysqlType}`))) return DataType.NUMBER;
    if (mysqlDateTypes.some((mysqlType) => sqlUpper.includes(` ${mysqlType}`))) return DataType.DATE;
  })();

  // 3. determine if its nullable
  const isNullable = !sqlUpper.includes(' NOT NULL');

  // 4. define the full type definition; note: array => union
  const type = [primaryType, isNullable ? DataType.NULL : null].filter((type) => !!type) as DataType[];

  // 5. return the definition
  return new TypeDefinitionOfResourceColumn({
    name,
    type,
  });
};
