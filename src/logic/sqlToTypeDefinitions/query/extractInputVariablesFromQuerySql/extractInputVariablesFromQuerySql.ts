import strip from 'sql-strip-comments';

import { TypeDefinitionOfQueryInputVariable } from '../../../../domain/objects/TypeDefinitionOfQueryInputVariable';
import { flattenSqlByReferencingAndTokenizingSubqueries } from '../common/flattenSqlByReferencingAndTokenizingSubqueries';
import { extractInputVariableTokensFromQuerySql } from './extractInputVariableTokensFromQuerySql';
import { extractTypeDefinitionFromInputVariableSql } from './extractTypeDefinitionFromInputVariableSql';

/**
 * goal:
 *  - try to define input type when possible
 * - fallback to "any" when not possible and ask user to add an issue w/ use case when this occurs
 *   - so that the generator is non-blocking
 *
 *  e.g.,:
 *   - where u.id = :id => "{ id: number }"
 *   - where lower(u.name) = :name => { name: any } (for mvp);
 *     - later, { name: string } (since we'd track standard fn's; TODO)
 *
 * steps:
 * - 1. find all of the `:__variable_name__` pattern input definitions (yesql format)
 * - 2. attempt to figure out the type for each variable name
 */

export const extractInputVariablesFromQuerySql = ({ sql }: { sql: string }) => {
  // find each input variable that needs to have a type def defined
  const inputVariableTokens = extractInputVariableTokensFromQuerySql({ sql });

  // suffix each token with the order in which it was found, since we may have the same token identified more than once
  const tokenToSuffixedTokensMap: { [index: string]: string[] } = {};
  const suffixedInputVariableTokens = inputVariableTokens.map((token) => {
    if (!tokenToSuffixedTokensMap[token]) tokenToSuffixedTokensMap[token] = [];
    const tokenOccurrenceIndex = tokenToSuffixedTokensMap[token].length;
    const suffixedToken = `${token}#${tokenOccurrenceIndex + 1}`; // note: we use `#` since it does not need to be escaped in regexp and its makes sense for an index due to it meaning "number"
    tokenToSuffixedTokensMap[token].push(suffixedToken);
    return suffixedToken;
  });

  // now go through the sql and replace each occurrence of a token with its suffixed,ordered identity (e.g., `WHERE (:until is null OR message.created_at <= :until)` => `WHERE (:until#1 is null OR message.created_at <= :until#2)`)
  const suffixedTokenSql = Object.keys(tokenToSuffixedTokensMap).reduce(
    (sqlNow, thisToken) => {
      const suffixedTokens = tokenToSuffixedTokensMap[thisToken];
      let sqlToUpdate = sqlNow;
      suffixedTokens.forEach((suffixedToken) => {
        sqlToUpdate = sqlToUpdate.replace(
          new RegExp(`(?<=[^:])(${thisToken})(?!#)`),
          suffixedToken,
        );
      });
      return sqlToUpdate;
    },
    sql,
  );

  // flatten the sql, to avoid subquery syntax interfering with below search patterns
  const strippedSql = strip(suffixedTokenSql);
  const { flattenedSql, references: subqueries } =
    flattenSqlByReferencingAndTokenizingSubqueries({
      sql: strippedSql,
    });

  // define the type definition for each variable
  const definitionsWithSuffixedTokens = suffixedInputVariableTokens.map(
    (token) => {
      // check if the token is actually in a subquery; run it on the subquery if so
      const foundSubqueryContainingToken = subqueries.find((subquery) =>
        new RegExp(`(?:[^\\w:])${token}`).test(subquery.sql),
      );
      if (foundSubqueryContainingToken)
        return extractTypeDefinitionFromInputVariableSql({
          token,
          sql: foundSubqueryContainingToken.sql,
        });

      // otherwise, run it on the root flattened query (flattened to make sure subquery syntax does not cause problems)
      return extractTypeDefinitionFromInputVariableSql({
        token,
        sql: flattenedSql,
      });
    },
  );

  // now cast the suffixed tokens defined in the type definitions back to the original tokens
  const suffixedTokenToTokenMap: {
    [index: string]: string;
  } = Object.fromEntries(
    Object.entries(tokenToSuffixedTokensMap)
      .map(([token, suffixedTokens]) => {
        return suffixedTokens.map((suffixedToken) => [suffixedToken, token]);
      })
      .flat(),
  );
  const definitions = definitionsWithSuffixedTokens.map(
    (definitionWithSuffixedToken) => {
      const tokenForSuffixedToken = suffixedTokenToTokenMap[
        `:${definitionWithSuffixedToken.name}`
      ].replace(':', '');
      return new TypeDefinitionOfQueryInputVariable({
        ...definitionWithSuffixedToken,
        name: tokenForSuffixedToken,
      });
    },
  );

  // return defs
  return definitions;
};
