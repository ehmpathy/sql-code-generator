import { DatabaseLanguage } from '../../../../domain';

const LANGUAGE_TO_EXECUTE_RETURN_TYPE: { [index in DatabaseLanguage]: string } =
  {
    [DatabaseLanguage.MYSQL]: 'any[]', // client.query() => [[],...]
    [DatabaseLanguage.POSTGRES]: '{ rows: any[] }', // client.query => { rows: any[], oid, ... }
  };

export const defineTypescriptCommonExportsForQueryFunctions = ({
  language,
}: {
  language: DatabaseLanguage;
}) => {
  return `
// typedefs common to each query function
export type DatabaseExecuteCommand = (args: { sql: string; values: any[] }) => Promise<${LANGUAGE_TO_EXECUTE_RETURN_TYPE[language]}>;
export type LogMethod = (message: string, metadata: any) => void;
  `.trim();
};
