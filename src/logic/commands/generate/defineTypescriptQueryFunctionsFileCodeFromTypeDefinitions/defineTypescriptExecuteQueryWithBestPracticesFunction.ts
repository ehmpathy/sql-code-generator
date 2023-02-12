import { DatabaseLanguage } from '../../../../domain';

export const defineTypescriptExecuteQueryWithBestPracticesFunction = ({
  language,
}: {
  language: DatabaseLanguage;
}) => {
  return `
// utility used by each query function
export const executeQueryWithBestPractices = async ({
  dbExecute,
  logDebug,
  name,
  sql,
  input,
}: {
  dbExecute: DatabaseExecuteCommand;
  logDebug: LogMethod;
  name: string;
  sql: string;
  input: object | null;
}) => {
  // 1. define the query with yesql
  const { ${
    language === DatabaseLanguage.POSTGRES ? 'text' : 'sql' // `prepare` returns { sql, values } or { text, values } depending on `language`
  }: preparedSql, values: preparedValues } = prepare(sql)(input || {});

  // 2. log that we're running the request
  logDebug(\`\${name}.input\`, { input });

  // 3. execute the query
  const ${
    language === DatabaseLanguage.POSTGRES ? '{ rows: output }' : '[output]'
  } = await dbExecute({ sql: preparedSql, values: preparedValues });

  // 4. log that we've executed the request
  logDebug(\`\${name}.output\`, { output });

  // 5. return the output
  return output;
};
  `.trim();
};
