import { uuid } from '../../../../../deps';
import { extractSqlFromFile } from '../../../../common/extractSqlFromFile';
import { breakSqlIntoNestedSqlArraysAtParentheses } from './breakSqlIntoNestedSqlArraysAtParentheses';
import { flattenNestedArraySqlByReferencingAndTokenizingSubqueriesRecursive } from './flattenNestedArraySqlByReferencingAndTokenizingSubqueriesRecursive';

jest.mock('../../../../../deps');
const uuidMock = uuid as any as jest.Mock;
uuidMock.mockReturnValue('__UUID__');

describe('flattenNestedArraySqlByReferencingAndTokenizingSubqueriesRecursive', () => {
  it('should accurately flatten and tokenize this example', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../__test_assets__/find_with_subselect_in_select_expressions.sql`,
    });
    const nestedSqlArray = breakSqlIntoNestedSqlArraysAtParentheses({ sql });
    const { references, flattenedSql } =
      flattenNestedArraySqlByReferencingAndTokenizingSubqueriesRecursive({
        sqlOrNestedSqlArray: nestedSqlArray,
      });
    expect(references.length).toEqual(1);
    expect(references).toMatchSnapshot();
    expect(flattenedSql).toMatchSnapshot();
  });
});
