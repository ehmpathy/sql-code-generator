import { QueryDeclaration } from '../../../model';
import { extractTypeDefinitionFromQuerySql } from './extractTypeDefinitionFromQuerySql';
import { extractNameFromQuerySql } from './extractNameFromQuerySql';

export const getTypeDefinitionFromQueryDeclaration = ({ declaration }: { declaration: QueryDeclaration }) => {
  // 1. get the name of the query
  const name = extractNameFromQuerySql({ sql: declaration.sql });

  // 2. get the type def
  return extractTypeDefinitionFromQuerySql({
    name,
    path: declaration.path,
    sql: declaration.sql,
  });
};
