import { extractTypeDefinitionFromSelectExpressionSql } from './extractTypeDefinitionFromSelectExpressionSql';
import { castCommasInParensToPipesForTokenSafety } from '../../resource/common/castCommasInParensToPipesForTokenSafety';

/*
  selection array starts on seeing a "SELECT"

  TODO: handle subqueries: https://github.com/uladkasach/sql-code-generator/issues/2
*/
export const extractSelectExpressionsFromQuerySql = ({ sql }: { sql: string }) => {
  // 1. grab the content of everything between SELECT and FROM
  const everythingAfterSelect = (() => {
    const partsSplitOnSelect = sql.split(/(?:SELECT|select)/g);
    if (partsSplitOnSelect.length === 1) throw new Error('no "select" keyword found; unexpected'); // fail fast
    if (partsSplitOnSelect.length > 2) throw new Error('more than one "select" keyword found; not yet supported'); // TODO: https://github.com/uladkasach/sql-code-generator/issues/2
    return partsSplitOnSelect[1];
  })();
  const everythingBetweenSelectAndFrom = (() => {
    const partsSplitOnFromAfterSelect = everythingAfterSelect.split(/(?:FROM|from)/g);
    if (partsSplitOnFromAfterSelect.length === 1) return everythingAfterSelect; // if no "FROM" keyword, then expect that the whole query is just the select expressions
    if (partsSplitOnFromAfterSelect.length > 2) {
      throw new Error('more than one "from" keyword found; not yet supported'); // TODO: https://github.com/uladkasach/sql-code-generator/issues/2
    }
    return partsSplitOnFromAfterSelect[0];
  })();

  // 2. cast commas inside of parens into pipes, so that we treat them as unique tokens when splitting "property lines" by comma
  const parenTokenizedInnerSql = castCommasInParensToPipesForTokenSafety({ sql: everythingBetweenSelectAndFrom });

  // 3. split everything between select and from on commas - they are our select expressions
  const selectExpressionsSql = parenTokenizedInnerSql.split(',').map((thisSql) => thisSql.trim());

  // 4. case each select expression sql into a type def of QuerySelectExpression
  return selectExpressionsSql.map((thisSql) => extractTypeDefinitionFromSelectExpressionSql({ sql: thisSql }));
};
