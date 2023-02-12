import { TypeDefinitionOfQueryTableReference } from '../../../../domain/objects/TypeDefinitionOfQueryTableReference';
import { TABLE_REFERENCE_TYPE } from './constants';

const TABLE_NAME_MATCHER_REGEX = `(?:${
  // upper case (e.g., "FROM', 'JOIN', 'LEFT JOIN')
  TABLE_REFERENCE_TYPE.join('|')
}|${
  // and lowercase (e.g., 'from', 'join', 'left join')
  TABLE_REFERENCE_TYPE.map((str) => str.toLowerCase()).join('|')
})\\s(?:\\w+\\.)?(\\w+)?(?:\\s|$)`;

const FUNCTION_NAME_MATCHER_REGEX = `(?:${
  // upper case (e.g., "FROM', 'JOIN', 'LEFT JOIN')
  TABLE_REFERENCE_TYPE.join('|')
}|${
  // and lowercase (e.g., 'from', 'join', 'left join')
  TABLE_REFERENCE_TYPE.map((str) => str.toLowerCase()).join('|')
})\\s(?:\\w+\\.)?(\\w+)?(?:\\()`;

const SPECIFIED_ALIAS_MATCHER_REGEX = `(?:${
  // upper case (e.g., "FROM', 'JOIN', 'LEFT JOIN')
  TABLE_REFERENCE_TYPE.join('|')
}|${
  // and lowercase (e.g., 'from', 'join', 'left join')
  TABLE_REFERENCE_TYPE.map((str) => str.toLowerCase()).join('|')
})\\s(?:\\w+\\.)?(?:\\w+)(?:\\([\\(\\|\\,\\s\\:\\_\\w\\)]*\\))?(?:\\s(?:as|AS))?\\s(\\w+)?`;

export const extractTypeDefinitionFromTableReference = ({
  sql,
}: {
  sql: string;
}) => {
  // see if it matches a persisted table reference
  const [_, tableName] = new RegExp(TABLE_NAME_MATCHER_REGEX).exec(sql) ?? []; // tslint:disable-line no-unused

  // see if it matches a function output reference
  const [__, functionName] = tableName
    ? [, null]
    : new RegExp(FUNCTION_NAME_MATCHER_REGEX).exec(sql) ?? []; // tslint:disable-line no-unused

  // make sure it matches one of the above
  if (!tableName && !functionName)
    throw new Error(
      'could not identify the referenced table from table reference sql; unexpected',
    ); // fail fast

  // grab the alias, if any
  const [___, specifiedAlias] =
    new RegExp(SPECIFIED_ALIAS_MATCHER_REGEX).exec(sql) ?? []; // tslint:disable-line no-unused

  // define the name, considering whether alias was given
  const alias = specifiedAlias ?? tableName ?? functionName;

  // return the full definition
  return new TypeDefinitionOfQueryTableReference({
    alias,
    tableName: tableName ?? null,
    functionName: functionName ?? null,
  });
};
