import { SqlSubqueryReference } from '../../../../../domain/objects/SqlSubqueryReference';
import { NestedStringArray } from './breakSqlIntoNestedSqlArraysAtParentheses';
import { extractAndTokenizeSubqueryReferencesInArrayOfSqlStrings } from './extractAndTokenizeSubqueryReferencesInArrayOfSqlStrings';

export const flattenNestedArraySqlByReferencingAndTokenizingSubqueriesRecursive =
  ({
    sqlOrNestedSqlArray,
  }: {
    sqlOrNestedSqlArray: NestedStringArray | string;
  }): { references: SqlSubqueryReference[]; flattenedSql: string } => {
    // 0. if this is a string, then no references - its already flat
    if (!Array.isArray(sqlOrNestedSqlArray)) {
      return {
        references: [],
        flattenedSql: sqlOrNestedSqlArray,
      };
    }

    // 1. since its not a string, its a nested sql array; update name of const for readability
    const nestedSqlArray = sqlOrNestedSqlArray;

    // 2. initialize the references object, so we can track references over nested arrays
    const references: SqlSubqueryReference[] = [];

    // 3. for each element in this array, flatten it. track the nested references
    const flattenedSqlParts = nestedSqlArray.map((thisSqlOrNestedSqlArray) => {
      const { references: nestedReferences, flattenedSql: nestedFlattenedSql } =
        flattenNestedArraySqlByReferencingAndTokenizingSubqueriesRecursive({
          sqlOrNestedSqlArray: thisSqlOrNestedSqlArray,
        });
      references.push(...nestedReferences);
      return nestedFlattenedSql;
    });

    // 4. extract references from this array of flattened strings
    const { references: referencesFromFlattenedSqlParts, referencedSqlParts } =
      extractAndTokenizeSubqueryReferencesInArrayOfSqlStrings({
        sqlParts: flattenedSqlParts,
      });
    references.push(...referencesFromFlattenedSqlParts); // append the newly found references

    // 5. join all of the flattened, referenced strings
    const flattenedSql = referencedSqlParts.join('');

    // 6. return the references and sql
    return {
      references,
      flattenedSql,
    };
  };
