import strip from 'sql-strip-comments';

import { castCommasInParensToPipesForTokenSafety } from '../../resource/common/castCommasInParensToPipesForTokenSafety';
import { flattenSqlByReferencingAndTokenizingSubqueries } from '../common/flattenSqlByReferencingAndTokenizingSubqueries';
import { extractTypeDefinitionFromSelectExpressionSql } from './extractTypeDefinitionFromSelectExpressionSql';

/*
  selection array starts on seeing a "SELECT"
*/
export const extractSelectExpressionsFromQuerySql = ({
  sql,
  inASubquery = false, // false by default
}: {
  sql: string;
  inASubquery?: boolean; // used to indicate whether we are currently running on a subquery or not; being in subquery gives us some implicit info
}) => {
  // 0. strip sql comments
  const strippedSql = strip(sql);

  // 1. tokenize each subquery
  const { flattenedSql, references: subqueries } =
    flattenSqlByReferencingAndTokenizingSubqueries({ sql: strippedSql });

  // 2. grab the content of everything between SELECT and FROM
  const everythingAfterSelect = (() => {
    const partsSplitOnSelect = flattenedSql.split(/(?:SELECT|select)/g);
    if (partsSplitOnSelect.length === 1)
      throw new Error('no "select" keyword found; unexpected'); // fail fast
    if (partsSplitOnSelect.length > 2)
      throw new Error('more than one "select" keyword found; unexpected'); // should have been flattened out
    return partsSplitOnSelect[1];
  })();
  const everythingBetweenSelectAndFrom = (() => {
    const partsSplitOnFromAfterSelect = everythingAfterSelect.split(
      /[\n\r\s]+from[\n\r\s]+/gi,
    );
    if (partsSplitOnFromAfterSelect.length === 1) return everythingAfterSelect; // if no "FROM" keyword, then expect that the whole query is just the select expressions
    if (partsSplitOnFromAfterSelect.length > 2) {
      throw new Error('more than one "from" keyword found; unexpected'); // should have been flattened out
    }
    return partsSplitOnFromAfterSelect[0];
  })();

  // 3. cast commas inside of parens into pipes, so that we treat them as unique tokens when splitting "property lines" by comma
  const parenTokenizedInnerSql = castCommasInParensToPipesForTokenSafety({
    sql: everythingBetweenSelectAndFrom,
  });

  // 4. split everything between select and from on commas - they are our select expressions
  const selectExpressionsSql = parenTokenizedInnerSql
    .split(',')
    .map((thisSql) => thisSql.trim());

  // 5. case each select expression sql into a type def of QuerySelectExpression
  return selectExpressionsSql.map((thisSql) =>
    extractTypeDefinitionFromSelectExpressionSql({
      sql: thisSql,
      subqueries,
      inASubquery,
    }),
  );
};
