import { extractSelectExpressionsFromQuerySql } from './extractSelectExpressionsFromQuerySql/extractSelectExpressionsFromQuerySql';
import { extractTableReferencesFromQuerySql } from './extractTableReferencesFromQuerySql/extractTableReferencesFromQuerySql';
import { TypeDefinitionOfQuery } from '../../../model/valueObjects/TypeDefinitionOfQuery';

export const extractTypeDefinitionFromQuerySql = ({ sql }: { sql: string }) => {
  // 1. grab the selectExpression definitions
  const selectExpressions = extractSelectExpressionsFromQuerySql({ sql });

  // 2. grab the table reference definitions
  const tableReferences = extractTableReferencesFromQuerySql({ sql });

  // 3. return the full query typedef
  return new TypeDefinitionOfQuery({
    selectExpressions,
    tableReferences,
  });
};
