import { breakSqlIntoNestedSqlArraysAtParentheses } from './breakSqlIntoNestedSqlArraysAtParentheses';
import { flattenNestedArraySqlByReferencingAndTokenizingSubqueriesRecursive } from './flattenNestedArraySqlByReferencingAndTokenizingSubqueriesRecursive';

export const flattenSqlByReferencingAndTokenizingSubqueries = ({ sql }: { sql: string }) => {
  // 1. get the nested sql array
  const nestedSqlArray = breakSqlIntoNestedSqlArraysAtParentheses({ sql });

  // 2. get the references and flattened sql
  const { references, flattenedSql } = flattenNestedArraySqlByReferencingAndTokenizingSubqueriesRecursive({
    sqlOrNestedSqlArray: nestedSqlArray,
  });

  // 3. return the references and flattened sql
  return {
    references,
    flattenedSql,
  };
};
