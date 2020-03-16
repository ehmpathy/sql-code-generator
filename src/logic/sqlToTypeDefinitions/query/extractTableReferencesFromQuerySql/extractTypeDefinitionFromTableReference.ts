import { TypeDefinitionOfQueryTableReference } from '../../../../model/valueObjects/TypeDefinitionOfQueryTableReference';
import { TABLE_REFERENCE_TYPE } from './constants';

const TABLE_NAME_MATCHER_REGEX = `(?:${
  // upper case (e.g., "FROM', 'JOIN', 'LEFT JOIN')
  TABLE_REFERENCE_TYPE.join('|')
}|${
  // and lowercase (e.g., 'from', 'join', 'left join')
  TABLE_REFERENCE_TYPE.map((str) => str.toLowerCase()).join('|')
})\\s(?:\\w+\\.)?(\\w+)?`;

const SPECIFIED_ALIAS_MATCHER_REGEX = `(?:${
  // upper case (e.g., "FROM', 'JOIN', 'LEFT JOIN')
  TABLE_REFERENCE_TYPE.join('|')
}|${
  // and lowercase (e.g., 'from', 'join', 'left join')
  TABLE_REFERENCE_TYPE.map((str) => str.toLowerCase()).join('|')
})\\s(?:\\w+\\.)?(?:\\w+)(?:\\s(?:as|AS))?\\s(\\w+)?`;

export const extractTypeDefinitionFromTableReference = ({ sql }: { sql: string }) => {
  // grab the source path
  const [_, tableName] = new RegExp(TABLE_NAME_MATCHER_REGEX).exec(sql) ?? []; // tslint:disable-line no-unused
  if (!tableName) throw new Error('could not extract the table name from table reference sql; unexpected'); // fail fast

  // grab the alias, if any
  const [__, specifiedAlias] = new RegExp(SPECIFIED_ALIAS_MATCHER_REGEX).exec(sql) ?? []; // tslint:disable-line no-unused

  // define the name, considering whether alias was given
  const alias = specifiedAlias ? specifiedAlias : tableName;

  // return the full definition
  return new TypeDefinitionOfQueryTableReference({
    alias,
    tableName,
  });
};
