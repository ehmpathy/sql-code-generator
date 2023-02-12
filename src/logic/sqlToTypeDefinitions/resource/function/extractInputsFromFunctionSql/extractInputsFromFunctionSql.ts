import strip from 'sql-strip-comments';

import { castCommasInParensToPipesForTokenSafety } from '../../common/castCommasInParensToPipesForTokenSafety';
import { extractTypeDefinitionFromFunctionInputSql } from './extractTypeDefinitionFromFunctionInputSql';

export const extractInputsFromFunctionSql = ({ sql }: { sql: string }) => {
  // 0. strip comments
  const strippedSql: string = strip(sql);

  // 1. grab the insides of the inputs definition
  const sqlBeforeReturns = strippedSql.split(/(?:returns|RETURNS)/)[0];
  const innerSqlAndAfter = sqlBeforeReturns.split('(').slice(1).join('('); // drop the part before the first '('
  const innerSql = innerSqlAndAfter.split(')').slice(0, -1).join(')'); // drop the part after the last ')'

  // 2. cast commas inside of parens into pipes, so that we treat them as unique tokens when splitting "property lines" by comma
  const parenTokenizedInnerSql = castCommasInParensToPipesForTokenSafety({
    sql: innerSql,
  }); // particularly useful for enum typedefs

  // 3. grab definition lines, by splitting out properties by commas
  const functionInputSqlSet = parenTokenizedInnerSql
    .split(',')
    .map((str) => str.trim()) // trim the line
    .filter((str) => !!str); // skip blank lines

  // 4. get column definition from each property
  return functionInputSqlSet.map((sql) =>
    extractTypeDefinitionFromFunctionInputSql({ sql }),
  );
};
