import { UnexpectedCodePathError } from '@ehmpathy/error-fns';
import strip from 'sql-strip-comments';

import { QueryDeclaration, ResourceDeclaration } from '../../../../domain';
import { extractSqlFromFile } from '../../../common/extractSqlFromFile';

export enum DeclarationType {
  QUERY = 'QUERY',
  RESOURCE = 'RESOURCE",',
}

export const extractDeclarationsFromGlobedFile = async ({
  rootDir,
  relativePath,
  type,
}: {
  rootDir: string;
  relativePath: string;
  type: DeclarationType;
}) => {
  // define the file path
  const filePath = `${rootDir}/${relativePath}`;

  // extract the sql
  const sql = await extractSqlFromFile({ filePath });

  // define the declaration for a query
  if (type === DeclarationType.QUERY) {
    // note: we only support one declaration per query, since we require the comments to define the query name
    return [
      new QueryDeclaration({
        path: relativePath,
        sql,
      }),
    ];
  }

  // define the declarations for a resource
  if (type === DeclarationType.RESOURCE) {
    // split up the sql by create resource statements, to support multiple resources per sql file
    const sqlCreateResourceStatements = sql
      .split(/(create(?:\sor\sreplace)?\s(?:table|function|view))/gi)
      .reduce((pairs, thisPart) => {
        // define what kind of part this is
        const isThisPartCreateDeclaration = thisPart
          .trim()
          .toLowerCase()
          .startsWith('create');

        // define the last pair
        const lastPair:
          | { createDeclaration: string; resourceDeclaration?: string }
          | undefined = pairs.slice(-1)[0];

        // if the last pair is not defined yet
        if (!lastPair) {
          // if this part is not a create declaration, then do nothing; we can ignore the prefixes
          if (!isThisPartCreateDeclaration) return pairs;

          // otherwise, since it is a create declaration, start the first pair
          return [{ createDeclaration: thisPart }];
        }

        // if the last pair already has a resource declaration
        if (lastPair.resourceDeclaration) {
          // if this part is a create declaration, then start a new pair
          if (isThisPartCreateDeclaration)
            return [...pairs, { createDeclaration: thisPart }];

          // otherwise, this is unexpected, so fail fast
          throw new UnexpectedCodePathError(
            'lastPair.resourceDeclaration already exists but thisPart.!isCreateDeclaration. how is that possible?',
            { lastPair, thisPart },
          );
        }

        // if the last pair does not have a resource declaration
        if (!lastPair.resourceDeclaration) {
          // if this part is a resource declaration, then complete this pair
          if (!isThisPartCreateDeclaration)
            return [
              ...pairs.slice(0, -1),
              { ...lastPair, resourceDeclaration: thisPart },
            ];

          // otherwise, this is unexpected, so fail fast
          throw new UnexpectedCodePathError(
            'lastPair.resourceDeclaration does not exist, but thisPart.isCreateDeclaration. how is that possible?',
            {
              lastPair,
              thisPart,
            },
          );
        }

        // we should never reach here, as the above should have captured every scenario, so fail fast
        throw new UnexpectedCodePathError('should never reach here. why?', {
          lastPair,
          thisPart,
        });
      }, [] as { createDeclaration: string; resourceDeclaration?: string }[])
      .map((pair) =>
        [pair.createDeclaration, pair.resourceDeclaration].join(''),
      );

    // return a declaration for each
    return sqlCreateResourceStatements.map(
      (sql) =>
        new ResourceDeclaration({
          path: relativePath,
          sql,
        }),
    );
  }
  throw new Error('unexpected'); // fail fast
};
