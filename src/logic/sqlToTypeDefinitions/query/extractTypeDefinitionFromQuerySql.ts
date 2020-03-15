import strip from 'sql-strip-comments';

import { TypeDefinitionOfQuery } from '../../../model/valueObjects/TypeDefinitionOfQuery';
import { extractInputVariablesFromQuerySql } from './extractInputVariablesFromQuerySql/extractInputVariablesFromQuerySql';
import { extractSelectExpressionsFromQuerySql } from './extractSelectExpressionsFromQuerySql/extractSelectExpressionsFromQuerySql';
import { extractTableReferencesFromQuerySql } from './extractTableReferencesFromQuerySql/extractTableReferencesFromQuerySql';

export const extractTypeDefinitionFromQuerySql = ({ name, path, sql }: { name: string; path: string; sql: string }) => {
  // 0. strip out comments
  const strippedSql: string = strip(sql);

  // 1. grab the selectExpression definitions
  const selectExpressions = extractSelectExpressionsFromQuerySql({ sql: strippedSql });

  // 2. grab the table reference definitions
  const tableReferences = extractTableReferencesFromQuerySql({ sql: strippedSql });

  // 3. grab the input variable definitions
  const inputVariables = extractInputVariablesFromQuerySql({ sql: strippedSql });

  // 4. return the full query typedef
  return new TypeDefinitionOfQuery({
    name,
    path,
    selectExpressions,
    tableReferences,
    inputVariables,
  });
};
