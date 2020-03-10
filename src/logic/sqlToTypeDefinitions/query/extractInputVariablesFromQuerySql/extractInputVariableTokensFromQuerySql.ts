const EXTRACT_INPUT_VARIABLES_REGEX = /(?:[^\w])(\:\w+)/g;

export const extractInputVariableTokensFromQuerySql = ({ sql }: { sql: string }) => {
  const regex = new RegExp(EXTRACT_INPUT_VARIABLES_REGEX);
  const regexMatches = sql.match(regex) ?? [];
  const inputVariableTokens = regexMatches.map((str) => str.slice(1)); // drop the leading non-word character (TODO: find how to "match" without including that char)
  return inputVariableTokens;
};
