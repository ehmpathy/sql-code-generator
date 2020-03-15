import { readFileAsync } from '../readFileAsync';

/*
  note: in order to not block users when they have typescript type errors (by using ts-node),
    we can simply parse the file contents and grab the `export const sql = `__SQL__`;` w/ regex
*/
export const extractSqlFromTsFile = async ({ filePath }: { filePath: string }) => {
  // grab file contents
  const content = await readFileAsync({ filePath });

  // grab the sql definition w/ regex
  const [
    _, // tslint:disable-line no-unused
    sqlMatch,
  ] = new RegExp(/(?:export const sql = `)((.|\n)+)(?:`)/).exec(content) ?? [];

  // throw error if could not extract
  if (!sqlMatch) throw new Error(`could not extract sql from file at path '${filePath}'`);

  // return the sql
  return sqlMatch;
};
