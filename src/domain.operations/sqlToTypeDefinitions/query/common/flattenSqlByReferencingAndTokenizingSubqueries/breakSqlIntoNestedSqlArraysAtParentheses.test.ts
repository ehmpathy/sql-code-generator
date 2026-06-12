import { extractSqlFromFile } from '@src/domain.operations/common/extractSqlFromFile';

import { breakSqlIntoNestedSqlArraysAtParentheses } from './breakSqlIntoNestedSqlArraysAtParentheses';

describe('breakSqlIntoNestedSqlArraysAtParentheses', () => {
  it('should accurately break up this example', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../.test.assets/find_with_subselect_in_select_expressions.sql`,
    });
    const nestedSqlArray = breakSqlIntoNestedSqlArraysAtParentheses({ sql });
    expect(nestedSqlArray).toHaveLength(3);
    expect(nestedSqlArray).toMatchSnapshot();
  });
  it('should retain the parentheses inside of the nested sql arrays', () => {
    const sql = "SELECT CONCAT('hel', 'lo');";
    const nestedSqlArray = breakSqlIntoNestedSqlArraysAtParentheses({ sql });
    expect(nestedSqlArray).toHaveLength(3);
    expect(nestedSqlArray[1]![0]![0]).toEqual('(');
    expect(nestedSqlArray[1]![0]!.slice(-1)[0]).toEqual(')');
  });
});
