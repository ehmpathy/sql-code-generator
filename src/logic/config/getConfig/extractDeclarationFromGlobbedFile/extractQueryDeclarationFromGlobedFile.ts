import { QueryDeclaration } from '../../../../model';
import { extractSqlFromFile } from '../../../common/extractSqlFromFile';

export const extractQueryDeclarationFromGlobedFile = async ({
  rootDir,
  relativePath,
}: {
  rootDir: string;
  relativePath: string;
}) => {
  // 0. define the file path
  const filePath = `${rootDir}/${relativePath}`;

  // 1. validate the file type
  const query = await extractSqlFromFile({ filePath });

  // 3. validate the result
  if (!query) throw new Error(`no export named 'query' was found at filePath '${filePath}'`);
  if (typeof query !== 'string') throw new Error(`named export 'query' in filePath '${filePath}' must be a string`);

  // 4. grab the define the query name
  const [
    _, // tslint:disable-line no-unused
    queryNameMatch,
  ] = new RegExp(/(?:--\squery_name\s?=\s?)([\w_]+)/g).exec(query) ?? [];
  if (!queryNameMatch) {
    throw new Error(
      `the query exported at filePath '${filePath}' is missing a name. please define the query name with the '-- query_name = your_query_name_here' syntax.`,
    );
  }

  // 5. define the declaration
  return new QueryDeclaration({
    name: queryNameMatch.trim(),
    path: relativePath,
    sql: query,
  });
};
