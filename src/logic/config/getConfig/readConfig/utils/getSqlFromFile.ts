import { readFileAsync } from '../../../_utils/readFileAsync';

export const getSqlFromFile = async ({ filePath }: { filePath: string }): Promise<string> => {
  const extension = filePath.split('.').slice(-1)[0];
  if (extension === 'sql') return readFileAsync({ filePath });
  if (extension === 'ts') {
    const exports = await import(filePath);
    if (!exports.sql) throw new Error('.ts file did not have an export with name "sql"');
    return exports.sql;
  }
  throw new Error('path must lead to file with extension of .ts or .sql');
};
