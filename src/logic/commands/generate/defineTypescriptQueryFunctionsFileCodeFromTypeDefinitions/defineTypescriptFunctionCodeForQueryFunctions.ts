import { TypeDefinitionOfQuery } from '../../../../domain';
import { defineTypescriptQueryFunctionForQuery } from '../../../typeDefinitionsToCode/query/defineTypescriptQueryFunctionForQuery';

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
