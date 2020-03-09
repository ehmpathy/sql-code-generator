import { extractTypeDefinitionFromTableReference } from './extractTypeDefinitionFromTableReference';
import { tryToExtractTableReferenceSqlSet } from './tryToExtractTableReferenceSqlSetFromQuerySql';

export const extractTableReferencesFromQuerySql = ({ sql }: { sql: string }) => {
  // 1. get the table reference sqls from the query sql
  const tableReferenceSqlSet = tryToExtractTableReferenceSqlSet({ sql }); // try to, since its okay if there are no table references; (e.g., `select upsert_something(...)`)

  // 2. get the type definitions of table references from each table reference sql
  return tableReferenceSqlSet.map((sql) => extractTypeDefinitionFromTableReference({ sql }));
};
