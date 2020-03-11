import { ResourceDeclaration } from '../../../../../model';
import { getSqlFromFile } from '../../../_utils/getSqlFromFile';
import { extractResourceTypeAndNameFromDDL } from './extractResourceTypeAndNameFromDDL';

export const extractResourceDeclarationFromGlobedFile = async ({
  rootDir,
  relativePath,
}: {
  rootDir: string;
  relativePath: string;
}) => {
  // 1. get the sql defined at the path
  const sql = await getSqlFromFile({ filePath: `${rootDir}/${relativePath}` });

  // 2. extract the type and name of the resource
  const { name, type } = extractResourceTypeAndNameFromDDL({ ddl: sql });

  // 3. define the change definition
  return new ResourceDeclaration({
    type,
    name,
    path: relativePath,
    sql,
  });
};
