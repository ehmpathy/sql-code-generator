import { DefinitionType, QueryDefinition, ResourceDefinition } from '../../../../../model';
import { InvalidDefinitionError } from './errors';
import { hydrateQueryDefinitionContent } from './hydrateQueryDefinitionContent';
import { hydrateResourceDefinitionContent } from './hydrateResourceDefinitionContent';

/*
  validate and hydrate an array of definitions from a yml file:
  - some will be ChangeDefinition objects
  - the rest must be strings pointing to yml files
*/
export const validateAndHydrateDefinitionsYmlContents = async ({
  readRoot,
  contents,
}: {
  readRoot: string;
  contents: any[];
}) => {
  if (!contents) return []; // enables empty files
  return Promise.all(
    contents.map(
      async (content): Promise<string | ResourceDefinition | QueryDefinition> => {
        if (typeof content === 'string') {
          if (content.slice(-4) !== '.yml') {
            throw new InvalidDefinitionError({ explanation: 'string must be path to a .yml file', basis: content });
          }
          return content;
        }
        if (typeof content === 'object') {
          if (!content.type) {
            throw new InvalidDefinitionError({ explanation: 'definitions must have a type', basis: content });
          }
          if (content.type === DefinitionType.RESOURCE) return hydrateResourceDefinitionContent({ readRoot, content });
          if (content.type === DefinitionType.QUERY) return hydrateQueryDefinitionContent({ readRoot, content });
          throw new InvalidDefinitionError({ explanation: 'unsupported definition type', basis: content });
        }
        throw new InvalidDefinitionError({
          explanation: 'invalid content type: must be object or string',
          basis: content,
        });
      },
    ),
  );
};
