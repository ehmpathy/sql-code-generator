import { extractTableReferenceSqlSetFromQuerySql } from './extractTableReferenceSqlSetFromQuerySql';
import { extractTypeDefinitionFromTableReference } from './extractTypeDefinitionFromTableReference';

export const extractTableReferencesFromQuerySql = ({ sql }: { sql: string }) => {
  // 1. get the table reference sqls from the query sql
  const tableReferenceSqlSet = extractTableReferenceSqlSetFromQuerySql({ sql });

  // 2. get the type definitions of table references from each table reference sql
  return tableReferenceSqlSet.map((sql) => extractTypeDefinitionFromTableReference({ sql }));
};
