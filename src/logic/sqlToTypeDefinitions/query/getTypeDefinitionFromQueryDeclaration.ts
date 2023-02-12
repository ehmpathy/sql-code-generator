import { QueryDeclaration } from '../../../domain';
import { extractNameFromQuerySql } from './extractNameFromQuerySql';
import { extractTypeDefinitionFromQuerySql } from './extractTypeDefinitionFromQuerySql';

export const getTypeDefinitionFromQueryDeclaration = ({
  declaration,
}: {
  declaration: QueryDeclaration;
}) => {
  // 1. get the name of the query
  const name = extractNameFromQuerySql({ sql: declaration.sql });

  // 2. get the type def
  return extractTypeDefinitionFromQuerySql({
    name,
    path: declaration.path,
    sql: declaration.sql,
  });
};
