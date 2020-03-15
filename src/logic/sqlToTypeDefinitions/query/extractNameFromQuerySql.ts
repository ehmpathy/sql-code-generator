export const extractNameFromQuerySql = ({ sql }: { sql: string }) => {
  const [
    _, // tslint:disable-line no-unused
    queryNameMatch,
  ] = new RegExp(/(?:--\squery_name\s?=\s?)([\w_]+)/g).exec(sql) ?? [];
  if (!queryNameMatch) {
    throw new Error(
      'sql for query does not have name defined. please define the query name with the `-- query_name = your_query_name_here` syntax.',
    );
  }
  return queryNameMatch.trim();
};
