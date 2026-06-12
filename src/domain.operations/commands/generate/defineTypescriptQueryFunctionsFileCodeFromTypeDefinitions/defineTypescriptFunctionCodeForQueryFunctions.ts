import type { TypeDefinitionOfQuery } from '@src/domain.objects';
import { defineTypescriptQueryFunctionForQuery } from '@src/domain.operations/typeDefinitionsToCode/query/defineTypescriptQueryFunctionForQuery';

export const defineTypescriptFunctionCodeForQueryFunctions = ({
  queryDefinitions,
}: {
  queryDefinitions: TypeDefinitionOfQuery[];
}) => {
  return queryDefinitions
    .sort((a, b) => (a.name < b.name ? -1 : 1)) // sort for determinism
    .map((definition) => {
      const { code } = defineTypescriptQueryFunctionForQuery({
        name: definition.name,
      });
      return `
// client method for query '${definition.name}'
${code}
    `.trim();
    })
    .join('\n\n');
};
