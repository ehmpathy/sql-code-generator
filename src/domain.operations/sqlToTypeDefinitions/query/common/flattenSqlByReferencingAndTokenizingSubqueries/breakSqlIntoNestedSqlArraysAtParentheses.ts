type ValueOrArray<T> = T | ValueOrArray<T>[];
export type NestedStringArray = ValueOrArray<string>[];

const castNewlinesAndQuotesIntoJSONParsableNewlinesAndQuotes = (str: string) =>
  str.replace(/\n/g, '\\n').replace(/"/g, '\\"');
export const breakSqlIntoNestedSqlArraysAtParentheses = ({
  sql,
}: {
  sql: string;
}): NestedStringArray => {
  const sqlWithNewlinesReplaced =
    castNewlinesAndQuotesIntoJSONParsableNewlinesAndQuotes(sql);
  const sqlWithLeftParensReplaced = sqlWithNewlinesReplaced.replace(
    /\(/g,
    '",["(',
  );
  const sqlWithLeftAndRightParensReplaced = sqlWithLeftParensReplaced.replace(
    /\)/g,
    ')"],"',
  );
  const jsonArrayOfParenNestedSql = `["${sqlWithLeftAndRightParensReplaced}"]`;
  const arrayOfParenNestedSql: NestedStringArray = JSON.parse(
    jsonArrayOfParenNestedSql,
  ); // use json to break it up for us; inspiration: https://stackoverflow.com/a/40478000/3068233
  return arrayOfParenNestedSql;
};
