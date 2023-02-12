import { flattenSqlByReferencingAndTokenizingSubqueries } from '../common/flattenSqlByReferencingAndTokenizingSubqueries';
import { extractTypeDefinitionFromTableReference } from './extractTypeDefinitionFromTableReference';
import { tryToExtractTableReferenceSqlSet } from './tryToExtractTableReferenceSqlSetFromQuerySql';

export const extractTableReferencesFromQuerySql = ({
  sql,
}: {
  sql: string;
}) => {
  // flatten the sql and tokenize each subquery - otherwise subquery syntax throws off subsequent processing
  const { flattenedSql: rootQuerySql, references: subqueries } =
    flattenSqlByReferencingAndTokenizingSubqueries({
      sql,
    });

  // on both the root query sql and each subquery sql (if subqueries are present) extract table references
  const flattenedSqlsToConsider = [
    rootQuerySql,
    ...subqueries.map((subquery) => subquery.sql),
  ];
  const tableReferences = flattenedSqlsToConsider
    .map((sql) => {
      // get the table reference sqls from the main query sql
      const tableReferenceSqlSet = tryToExtractTableReferenceSqlSet({ sql }); // "try to", since its okay if there are no table references; (e.g., `select upsert_something(...)`)

      // get the type definitions of table references from each table reference sql
      return tableReferenceSqlSet.map((sql) =>
        extractTypeDefinitionFromTableReference({ sql }),
      );
    })
    .flat();

  // return the table references
  return tableReferences;
};
