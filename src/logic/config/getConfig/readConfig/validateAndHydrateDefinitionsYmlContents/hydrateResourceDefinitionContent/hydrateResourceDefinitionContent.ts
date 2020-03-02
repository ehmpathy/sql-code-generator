import { ResourceDefinition } from '../../../../../../types';
import { InvalidDefinitionError } from '../errors';
import { readFileAsync } from './../../../../_utils/readFileAsync';
import { extractResourceTypeAndNameFromDDL } from './extractResourceTypeAndNameFromDDL';

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
  if (content.path.split('.').slice(-1)[0] !== 'sql') {
    throw new InvalidDefinitionError({ explanation: 'path must specify a .sql file', basis: content });
  }
  const sql = await readFileAsync({ filePath: `${readRoot}/${content.path}` });

  // 2. extract the type and name of the resource
  const { name, type } = extractResourceTypeAndNameFromDDL({ ddl: sql });

  // 3. define the change definition
  return new ResourceDefinition({
    sql,
    type,
    name,
    path: content.path,
  });
};
