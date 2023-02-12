import uuid from 'uuid';

import { SqlSubqueryReference } from '../../../../../domain/objects/SqlSubqueryReference';
import { getTokenForSqlSubqueryReference } from './getTokenForSubqueryReference';

export const extractAndTokenizeSubqueryReferencesInArrayOfSqlStrings = ({
  sqlParts,
}: {
  sqlParts: string[];
}) => {
  const references: SqlSubqueryReference[] = [];

  // 1. for each part of the sql array, create a reference if it matches "query" pattern
  const referencedSqlParts = sqlParts.map(sql => {
    const matchesQueryPattern = new RegExp(/^\(\s*select(?:.|\s)*\)$/i).test(
      sql,
    );
    // if it matches the pattern for being a "query", then return swap it out with a reference
    if (matchesQueryPattern) {
      const reference = new SqlSubqueryReference({
        id: uuid().replace(/-/g, ''), // uuid without dashes, important for downstream logic
        sql,
      });
      references.push(reference);
      return getTokenForSqlSubqueryReference({ reference });
    }

    // if it does not match the pattern for being a query, then do nothing with it
    return sql;
  });

  // 2. return the referenced sql parts + references
  return {
    referencedSqlParts,
    references,
  };
};
