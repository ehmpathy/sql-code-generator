import { QueryDeclaration } from '../../../../model';

const VALID_EXTENSIONS = ['ts', 'js'];
const VALID_EXTENSIONS_DISPLAY_STRING = VALID_EXTENSIONS.map((ext) => `'.${ext}'`).join(',');

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
  const extension = filePath.split('.').slice(-1)[0];
  if (!VALID_EXTENSIONS.includes(extension)) {
    throw new Error(
      `can not import query from '${relativePath}'. file extension must be one of ${VALID_EXTENSIONS_DISPLAY_STRING}`,
    );
  }

  // 2. import the file (note, we registered ts-node in bin so we're able to import both .js and .ts)
  const { query } = await import(filePath);

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
