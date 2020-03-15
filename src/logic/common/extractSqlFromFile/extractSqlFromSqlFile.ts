import { readFileAsync } from '../readFileAsync';

export const extractSqlFromSqlFile = ({ filePath }: { filePath: string }) => readFileAsync({ filePath }); // the sql is everything in the file in this case
