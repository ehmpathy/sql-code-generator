import { extractSelectExpressionsFromQuerySql } from './extractSelectExpressionsFromQuerySql/extractSelectExpressionsFromQuerySql';
import { extractTableReferencesFromQuerySql } from './extractTableReferencesFromQuerySql/extractTableReferencesFromQuerySql';
import { TypeDefinitionOfQuery } from '../../../model/valueObjects/TypeDefinitionOfQuery';
import { extractInputVariablesFromQuerySql } from './extractInputVariablesFromQuerySql/extractInputVariablesFromQuerySql';

export const extractTypeDefinitionFromQuerySql = ({ sql }: { sql: string }) => {
  // 1. grab the selectExpression definitions
  const selectExpressions = extractSelectExpressionsFromQuerySql({ sql });

  // 2. grab the table reference definitions
  const tableReferences = extractTableReferencesFromQuerySql({ sql });

  // 3. grab the input variable definitions
  const inputVariables = extractInputVariablesFromQuerySql({ sql });

  // 4. return the full query typedef
  return new TypeDefinitionOfQuery({
    selectExpressions,
    tableReferences,
    inputVariables,
  });
};
