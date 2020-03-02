import { readYmlFile } from './_utils/readYmlFile';
import { validateAndHydrateDefinitionsYmlContents } from './validateAndHydrateDefinitionsYmlContents';
import { ChangeDefinition, ResourceDefinition } from '../../../../types';
import { getReadFilePath } from './_utils/getReadFilePath';

/*
  recursively parse, validate, and read schema control definitions:
  - if the definition is a string, then assume that string is path to yml file of definitions
    - read the file
    - read the definitions recursively
    - extend the results initial definitions array with the additional results
*/
type DefinitionObject = ChangeDefinition | ResourceDefinition;
type DefinitionInput = DefinitionObject | string;
export const flattenDefinitionsRecursive = async ({
  definitions,
  readRoot,
}: {
  definitions: DefinitionInput[];
  readRoot: string;
}): Promise<DefinitionObject[]> => {
  const arraysOfDefinitions = await Promise.all(
    definitions.map(
      async (definition): Promise<DefinitionObject[]> => {
        // if the element is a ChangeDefinition object, return it in an array
        if (definition.constructor === ChangeDefinition) return [definition as ChangeDefinition]; // array since, although its the only definition we're getting from the list entry, it still needs to be "flatten"-able
        if (definition.constructor === ResourceDefinition) return [definition as ResourceDefinition];

        // since we now know it is not a ChangeDefinition, it must be a string.
        const filePath = getReadFilePath({ readRoot, relativePath: definition as string });
        const ymlContents = await readYmlFile({ filePath });
        const subRoot = filePath
          .split('/')
          .slice(0, -1)
          .join('/'); // drop the file name from filepath
        const subDefinitions = await validateAndHydrateDefinitionsYmlContents({
          readRoot: subRoot,
          contents: ymlContents,
        });
        const subFlattenedDefinitions = await flattenDefinitionsRecursive({
          readRoot: subRoot,
          definitions: subDefinitions,
        });
        return subFlattenedDefinitions;
      },
    ),
  );
  const flattenedDefinitions = ([] as DefinitionObject[]).concat(...arraysOfDefinitions);
  return flattenedDefinitions;
};
