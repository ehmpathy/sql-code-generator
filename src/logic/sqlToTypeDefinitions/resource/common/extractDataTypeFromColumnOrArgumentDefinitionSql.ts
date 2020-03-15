import { DataType } from '../../../../model';

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

// https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html
const mysqlBinaryTypes = ['BINARY', 'VARBINARY'];

export const extractDataTypeFromColumnOrArgumentDefinitionSql = ({ sql }: { sql: string }) => {
  // 1. cast to upper
  const sqlUpper = sql.toUpperCase();

  // 2. one by one try to see which datatype is being defined in this definition
  if (mysqlStringTypes.some((mysqlType) => sqlUpper.includes(` ${mysqlType}`))) return DataType.STRING;
  if (mysqlNumberTypes.some((mysqlType) => sqlUpper.includes(` ${mysqlType}`))) return DataType.NUMBER;
  if (mysqlDateTypes.some((mysqlType) => sqlUpper.includes(` ${mysqlType}`))) return DataType.DATE;
  if (mysqlBinaryTypes.some((mysqlType) => sqlUpper.includes(` ${mysqlType}`))) return DataType.BUFFER;
  throw new Error(`could not extract data type from '${sql}'`);
};
