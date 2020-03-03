import { InvalidDefinitionError } from '../errors';
import { extractResourceTypeAndNameFromDDL } from './extractResourceTypeAndNameFromDDL';
import { ResourceDefinition } from '../../../../../../model';
import { getSqlFromFile } from '../../../../_utils/getSqlFromFile';

/*
  1. get the sql
  2. extract type of resource from sql
    - regex?
  3. extract name of resource from sql
    - regex?

  // TODO: extract type and name in database agnostic way (use adapter pattern)
*/

export const hydrateResourceDefinitionContent = async ({ readRoot, content }: { readRoot: string; content: any }) => {
  // 1. get the sql defined at the path
  if (!content.path) throw new InvalidDefinitionError({ explanation: 'path must be defined', basis: content });
  const sql = await getSqlFromFile({ filePath: `${readRoot}/${content.path}` });

  // 2. extract the type and name of the resource
  const { name, type } = extractResourceTypeAndNameFromDDL({ ddl: sql });

  // 3. define the change definition
  return new ResourceDefinition({
    sql,
    type,
    name,
  });
};
