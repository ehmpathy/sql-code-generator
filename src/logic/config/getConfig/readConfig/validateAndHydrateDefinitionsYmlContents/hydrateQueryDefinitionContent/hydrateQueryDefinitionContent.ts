import { QueryDefinition } from '../../../../../../model';
import { getSqlFromFile } from '../../utils/getSqlFromFile';
import { InvalidDefinitionError } from '../errors';

export const hydrateQueryDefinitionContent = async ({ readRoot, content }: { readRoot: string; content: any }) => {
  // 1. get the sql defined at the path
  if (!content.path) throw new InvalidDefinitionError({ explanation: 'path must be defined', basis: content });
  const sql = await getSqlFromFile({ filePath: `${readRoot}/${content.path}` });

  // 2. define the query definition
  return new QueryDefinition({
    name: content.name,
    sql,
  });
};
