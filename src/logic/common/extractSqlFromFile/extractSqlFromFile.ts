import { extractSqlFromSqlFile } from './extractSqlFromSqlFile';
import { extractSqlFromTsFile } from './extractSqlFromTsFile';

const SUPPORTED_FILE_EXTENSIONS = ['.sql', '.ts'];
export const extractSqlFromFile = async ({
  filePath,
}: {
  filePath: string;
}) => {
  // 1. grab extension from file; check that we support it
  const extension = `.${filePath.split('.').slice(-1)[0]}`;
  if (!SUPPORTED_FILE_EXTENSIONS.includes(extension)) {
    throw new Error(`file extension '.${extension}' is not supported`);
  }

  // 2. grab sql from file, based on file type
  if (extension === '.sql') return extractSqlFromSqlFile({ filePath });
  if (extension === '.ts') return extractSqlFromTsFile({ filePath });
  throw new Error('unexpected'); // should never reach here, since we checked earlier that the extension was supported
};
