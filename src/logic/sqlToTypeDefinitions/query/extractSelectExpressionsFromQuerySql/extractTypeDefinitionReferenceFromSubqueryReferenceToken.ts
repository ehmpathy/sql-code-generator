import { TypeDefinitionReference } from '../../../../domain';
import { SqlSubqueryReference } from '../../../../domain/objects/SqlSubqueryReference';
import { getTokenForSqlSubqueryReference } from '../common/flattenSqlByReferencingAndTokenizingSubqueries/getTokenForSubqueryReference';
import { extractSelectExpressionsFromQuerySql } from './extractSelectExpressionsFromQuerySql';

export const extractTypeDefinitionReferenceFromSubqueryReferenceToken = ({
  subqueryReferenceToken,
  subqueries,
}: {
  subqueryReferenceToken: string;
  subqueries: SqlSubqueryReference[];
}): TypeDefinitionReference => {
  // 1. find the subquery reference object
  const subquery = subqueries.find(
    (subquery) =>
      getTokenForSqlSubqueryReference({ reference: subquery }) ===
      subqueryReferenceToken,
  );
  if (!subquery) {
    throw new Error(
      'subquery reference token found in select expression - but subquery reference definition not present. unexpected',
    ); // fail fast
  }

  // 2. get select expressions from subquery sql
  const cleanedSubquerySql = subquery.sql.replace(/^\(/, '').replace(/\)$/, ''); // if it has leading or closing paren, strip em
  const selectExpressions = extractSelectExpressionsFromQuerySql({
    sql: cleanedSubquerySql,
    inASubquery: true,
  }); // NOTE: this makes this recursive

  // 3. check that the subquery returns exactly one select expression, otherwise this is a syntax error and not valid sql
  if (selectExpressions.length < 1) {
    throw new Error(
      'subquery in select expression must return atleast one value.',
    );
  }
  if (selectExpressions.length > 1) {
    throw new Error(
      'subquery in select expression may not return more than one value. this is invalid sql',
    );
  }

  // 4. the reference type of this expression is the single reference type of that subquery
  return selectExpressions[0].typeReference;
};
