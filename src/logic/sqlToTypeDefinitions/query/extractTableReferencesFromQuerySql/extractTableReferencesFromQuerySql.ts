import { extractTypeDefinitionFromTableReference } from './extractTypeDefinitionFromTableReference';
import { tryToExtractTableReferenceSqlSet } from './tryToExtractTableReferenceSqlSetFromQuerySql';
import { flattenSqlByReferencingAndTokenizingSubqueries } from '../common/flattenSqlByReferencingAndTokenizingSubqueries';

export const extractTableReferencesFromQuerySql = ({ sql }: { sql: string }) => {
  // 0. tokenize each subquery
  const { flattenedSql } = flattenSqlByReferencingAndTokenizingSubqueries({ sql }); // flatten the sql - so that subqueries don't hinder regular parsing

  // 1. get the table reference sqls from the query sql
  const tableReferenceSqlSet = tryToExtractTableReferenceSqlSet({ sql: flattenedSql }); // "try to", since its okay if there are no table references; (e.g., `select upsert_something(...)`)

  // 2. get the type definitions of table references from each table reference sql
  return tableReferenceSqlSet.map((sql) => extractTypeDefinitionFromTableReference({ sql }));
};
