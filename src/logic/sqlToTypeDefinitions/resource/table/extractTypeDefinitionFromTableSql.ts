import strip from 'sql-strip-comments';

import { castCommasInParensToPipesForTokenSafety } from '../common/castCommasInParensToPipesForTokenSafety';
import { extractTypeDefinitionFromColumnSql } from './extractTypeDefinitionFromColumnSql';
import { TypeDefinitionOfResourceTable } from '../../../../model';

/*
  note:
    - for table and view, just a map of { property: type }
    - for function and procedure, input type, output type
*/

const KEY_OR_CONSTRAINT_LINE_REGEX = /[KEY|CONSTRAINT].*\s\(/gi;

export const extractTypeDefinitionFromTableSql = ({ name, sql }: { name: string; sql: string }) => {
  // 0. strip comments
  const strippedSql: string = strip(sql);

  // 1. drop everything after the first `;` - the table ddl does not have `;` inside. (this will make sure we exclude lines like "create index ..." and etc)
  const sqlBeforeFirstSemiColon = strippedSql.split(';')[0];
  // strippedSql.replace(/CREATE INDEX [\w\d_]+ ON [\w\d_]+ USING [\w\d_]+ \([\w\d_,]+\);/gi, '');

  // 2. grab the insides of the "create" (i.e., 'CREATE TABLE ... (__INSIDES__) ...' => '__INSIDES__')
  const innerSqlAndAfter = sqlBeforeFirstSemiColon
    .split('(')
    .slice(1)
    .join('('); // drop the part before the first '('
  const innerSql = innerSqlAndAfter
    .split(')')
    .slice(0, -1)
    .join(')'); // drop the part after the last ')'

  // 3. cast commas inside of parens into pipes, so that we treat them as unique tokens when splitting "property lines" by comma
  const parenTokenizedInnerSql = castCommasInParensToPipesForTokenSafety({ sql: innerSql });

  // 4. grab definition lines, by splitting out properties by commas
  const lines = parenTokenizedInnerSql.split(',');

  // 5. strip out the lines that are defining keys or constraints
  const columnDefinitions = lines
    .filter((line) => {
      return !new RegExp(KEY_OR_CONSTRAINT_LINE_REGEX, 'gim').test(line); // note, we reinstantiate so as to not share regex object (i.e., state) between calls
    })
    .map((line) => line.trim());

  // 6. get column definition from each property
  const columns = columnDefinitions.map((line) => extractTypeDefinitionFromColumnSql({ sql: line }));

  // 7. return the table definition
  return new TypeDefinitionOfResourceTable({
    name,
    columns,
  });
};
