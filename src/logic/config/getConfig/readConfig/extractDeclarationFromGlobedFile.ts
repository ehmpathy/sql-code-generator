import { QueryDeclaration, ResourceDeclaration } from '../../../../domain';
import { extractSqlFromFile } from '../../../common/extractSqlFromFile';

export enum DeclarationType {
  QUERY = 'QUERY',
  RESOURCE = 'RESOURCE",',
}

export const extractDeclarationFromGlobedFile = async ({
  rootDir,
  relativePath,
  type,
}: {
  rootDir: string;
  relativePath: string;
  type: DeclarationType;
}) => {
  // 0. define the file path
  const filePath = `${rootDir}/${relativePath}`;

  // 1. validate the file type
  const sql = await extractSqlFromFile({ filePath });

  // 3. define the declaration
  if (type === DeclarationType.QUERY) {
    return new QueryDeclaration({
      path: relativePath,
      sql,
    });
  }
  if (type === DeclarationType.RESOURCE) {
    return new ResourceDeclaration({
      path: relativePath,
      sql,
    });
  }
  throw new Error('unexpected'); // fail fast
};
