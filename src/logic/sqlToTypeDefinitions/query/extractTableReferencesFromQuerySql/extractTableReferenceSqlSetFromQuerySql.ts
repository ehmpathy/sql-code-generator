import { TABLE_REFERENCE_TYPE } from './constants';

/*
  TODO: handle subqueries: https://github.com/uladkasach/sql-code-generator/issues/2
*/
export const extractTableReferenceSqlSetFromQuerySql = ({ sql }: { sql: string }) => {
  // 1. grab the content of everything between FROM and WHERE
  const everythingAfterFromInclusive = (() => {
    const partsSplitOnSelect = sql.split(/[\n\r\s]+from[\n\r\s]+/gi);
    if (partsSplitOnSelect.length === 1) throw new Error('no "from" keyword found'); // fail fast; allow this being caught above
    if (partsSplitOnSelect.length > 2) throw new Error('more than one "from" keyword found; not yet supported'); // TODO: https://github.com/uladkasach/sql-code-generator/issues/2
    return `FROM ${partsSplitOnSelect[1]}`; // inclusive, since we include "from"
  })();
  const everythingBetweenFromAndWhere = (() => {
    const partsSplitOnFromAfterSelect = everythingAfterFromInclusive.split(/(?:WHERE|where)/g);
    if (partsSplitOnFromAfterSelect.length > 2) {
      throw new Error('more than one "where" keyword found; not yet supported'); // TODO: https://github.com/uladkasach/sql-code-generator/issues/2
    }
    return partsSplitOnFromAfterSelect[0];
  })();

  // 3. split token on each table reference type "FROM", "JOIN", "INNER JOIN", and "LEFT JOIN"
  const tableReferenceDefinitionSplitRegex = new RegExp(
    `(${TABLE_REFERENCE_TYPE.join('|')}|${TABLE_REFERENCE_TYPE.map((str) => str.toLowerCase()).join('|')})`,
    'g',
  );
  const partsSplitOnJoinType = ` ${everythingBetweenFromAndWhere} `.split(tableReferenceDefinitionSplitRegex);
  const tableReferenceSqlSet = [] as string[];
  let partialTableReferenceSql: null | string = null;
  partsSplitOnJoinType.slice(1).forEach((part, index) => {
    if (index % 2 === 0) {
      // if even, then we should be starting the table reference sql
      if (!TABLE_REFERENCE_TYPE.includes(part.toUpperCase())) throw new Error('unexpected'); // fail fast, this should never occur
      if (partialTableReferenceSql !== null) throw new Error('unexpected'); // fail fast, this should never occur
      partialTableReferenceSql = part; // initialize the partial table reference
    } else {
      tableReferenceSqlSet.push((partialTableReferenceSql + part).trim().replace(';', ''));
      partialTableReferenceSql = null;
    }
  });

  // return the reference set
  return tableReferenceSqlSet;
};
