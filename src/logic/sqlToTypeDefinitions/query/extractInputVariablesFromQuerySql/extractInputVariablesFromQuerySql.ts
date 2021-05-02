import strip from 'sql-strip-comments';

import { flattenSqlByReferencingAndTokenizingSubqueries } from '../common/flattenSqlByReferencingAndTokenizingSubqueries';
import { extractInputVariableTokensFromQuerySql } from './extractInputVariableTokensFromQuerySql';
import { extractTypeDefinitionFromInputVariableSql } from './extractTypeDefinitionFromInputVariableSql';

/**
 * goal:
 *  - try to define input type when possible
 * - fallback to "any" when not possible and ask user to add an issue w/ use case when this occurs
 *   - so that the generator is non-blocking
 *
 *  e.g.,:
 *   - where u.id = :id => "{ id: number }"
 *   - where lower(u.name) = :name => { name: any } (for mvp);
 *     - later, { name: string } (since we'd track standard fn's; TODO)
 *
 * steps:
 * - 1. find all of the `:__variable_name__` pattern input definitions (yesql format)
 * - 2. attempt to figure out the type for each variable name
 */

export const extractInputVariablesFromQuerySql = ({ sql }: { sql: string }) => {
  // find each input variable that needs to have a type def defined
  const inputVariableTokens = extractInputVariableTokensFromQuerySql({ sql });

  // flatten the sql, to avoid subquery syntax interfering with below search patterns
  const strippedSql = strip(sql);
  const { flattenedSql, references: subqueries } = flattenSqlByReferencingAndTokenizingSubqueries({
    sql: strippedSql,
  });

  // define the type definition for each variable
  const definitions = inputVariableTokens.map((token) => {
    // check if the token is actually in a subquery; run it on the subquery if so
    const foundSubqueryContainingToken = subqueries.find((subquery) => subquery.sql.includes(token));
    if (foundSubqueryContainingToken)
      return extractTypeDefinitionFromInputVariableSql({ token, sql: foundSubqueryContainingToken.sql });

    // otherwise, run it on the root flattened query (flattened to make sure subquery syntax does not cause problems)
    return extractTypeDefinitionFromInputVariableSql({ token, sql: flattenedSql });
  });

  // return defs
  return definitions;
};
