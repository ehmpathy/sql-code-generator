import { DataType } from '../../../../domain';

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

// https://www.postgresql.org/docs/9.5/datatype-character.html
const postgresStringTypes = [
  'CHARACTER',
  'CHAR',
  'CHARACTER VARYING',
  'VARCHAR',
  'TEXT',
  'UUID', // this too: https://www.postgresql.org/docs/9.5/datatype-uuid.html
];

// combine the types so we can search over the union
const dbStringTypes = [...mysqlStringTypes, ...postgresStringTypes];

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

// https://www.postgresql.org/docs/9.5/datatype-numeric.html
const postgresNumberTypes = [
  'SMALLINT',
  'INT2',
  'INTEGER',
  'INT',
  'INT4',
  'BIGINT',
  'INT8',
  'DECIMAL',
  'NUMERIC',
  'REAL',
  'DOUBLE PRECISION',
  'FLOAT8',
  'SMALLSERIAL',
  'SERIAL2',
  'SERIAL',
  'SERIAL4',
  'BIGSERIAL',
  'SERIAL8',
];

// combine the types so we can search over the union
const dbNumberTypes = [...mysqlNumberTypes, ...postgresNumberTypes];

// https://dev.mysql.com/doc/refman/8.0/en/date-and-time-types.html
const mysqlDateTypes = ['DATE', 'TIME', 'DATETIME', 'TIMESTAMP', 'YEAR'];

// https://www.postgresql.org/docs/9.5/datatype-datetime.html
const postgresDateTypes = [
  'TIMESTAMP',
  'TIMESTAMPTZ',
  'TIMESTAMP WITH TIMEZONE',
  'DATE',
  'TIME',
  'TIMETZ',
  'TIME WITH TIMEZONE',
];

// combine the types so we can search over the union
const dbDateTypes = [...mysqlDateTypes, ...postgresDateTypes];

// https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html
const mysqlBinaryTypes = ['BINARY', 'VARBINARY'];

// https://www.postgresql.org/docs/9.5/datatype-binary.html
const postgresBinaryTypes = ['BYTEA'];

// combine the types so we can search over the union
const dbBinaryTypes = [...mysqlBinaryTypes, ...postgresBinaryTypes];

// https://dev.mysql.com/doc/refman/8.1/en/numeric-type-syntax.html
const mysqlBooleanTypes = ['BOOL', 'BOOLEAN']; // technically aliases for tinyint, but the intention is clear for our usecase

// https://www.postgresql.org/docs/9.5/datatype-boolean.html
const postgresBooleanTypes = ['BOOLEAN'];

// combine the types so we can search over the union
const dbBooleanTypes = [...mysqlBooleanTypes, ...postgresBooleanTypes];

// https://dev.mysql.com/doc/refman/8.0/en/json.html
const mysqlJsonTypes = ['JSON'];

// https://www.postgresql.org/docs/9.5/datatype-json.html
const postgresJsonTypes = ['JSON', 'JSONB'];

// combine the types so we can search over the union
const dbJsonTypes = [...mysqlJsonTypes, ...postgresJsonTypes];

export const extractDataTypeFromColumnOrArgumentDefinitionSql = ({
  sql,
}: {
  sql: string;
}) => {
  // 1. cast to upper
  const sqlUpper = sql.toUpperCase();

  // 2. one by one try to see which datatype is being defined in this definition
  if (dbStringTypes.some((dbType) => sqlUpper.includes(` ${dbType}[]`)))
    return DataType.STRING_ARRAY;
  if (dbStringTypes.some((dbType) => sqlUpper.includes(` ${dbType}`)))
    return DataType.STRING;
  if (dbNumberTypes.some((dbType) => sqlUpper.includes(` ${dbType}[]`)))
    return DataType.NUMBER_ARRAY;
  if (dbNumberTypes.some((dbType) => sqlUpper.includes(` ${dbType}`)))
    return DataType.NUMBER;
  if (dbDateTypes.some((dbType) => sqlUpper.includes(` ${dbType}`)))
    return DataType.DATE;
  if (dbBinaryTypes.some((dbType) => sqlUpper.includes(` ${dbType}`)))
    return DataType.BUFFER;
  if (dbBooleanTypes.some((dbType) => sqlUpper.includes(` ${dbType}`)))
    return DataType.BOOLEAN;
  if (dbJsonTypes.some((dbType) => sqlUpper.includes(` ${dbType}`)))
    return DataType.JSON;
  throw new Error(`could not extract data type from '${sql}'`);
};
