import { TypeDefinition } from '../../../../domain';
import { getTypescriptTypesFromTypeDefinition } from '../../../typeDefinitionsToCode/getTypescriptTypesFromTypeDefinition';

const typeDefinitionSortOrder = [
  'TypeDefinitionOfResourceTable',
  'TypeDefinitionOfResourceFunction',
  'TypeDefinitionOfResourceView',
  'TypeDefinitionOfQuery',
];
const sortTypeDefinition = (a: TypeDefinition, b: TypeDefinition) => {
  // make return values easier to understand
  const A_FIRST = -1;
  const B_FIRST = 1;

  // try to sort on definition type
  const definitionTypeIndexA = typeDefinitionSortOrder.indexOf(
    a.constructor.name,
  );
  const definitionTypeIndexB = typeDefinitionSortOrder.indexOf(
    b.constructor.name,
  );
  if (definitionTypeIndexA < definitionTypeIndexB) return A_FIRST;
  if (definitionTypeIndexA > definitionTypeIndexB) return B_FIRST;

  // sort on name if of same type
  if (a.name < b.name) return A_FIRST;
  if (a.name > b.name) return B_FIRST;
  return 0;
};

export const defineTypescriptTypesFileCodeFromTypeDefinitions = ({
  definitions,
}: {
  definitions: TypeDefinition[];
}) => {
  // sort typedefs for deterministic and priority ranked output order
  const sortedDefinitions = [...definitions].sort(sortTypeDefinition);

  // define codes
  const typescriptTypesCodes = sortedDefinitions.map((definition) => {
    const typescriptTypesCodeForDef = getTypescriptTypesFromTypeDefinition({
      definition,
      allDefinitions: definitions,
    });
    const definitionTypeCommonName = definition.constructor.name
      .replace('TypeDefinitionOfResource', '')
      .replace('TypeDefinitionOf', '')
      .toLowerCase();
    return `
// types for ${definitionTypeCommonName} '${definition.name}'
${typescriptTypesCodeForDef}
    `.trim();
  });

  // merge the codes
  const typescriptTypesCode = `
${typescriptTypesCodes.join('\n\n')}
  `.trim();

  // return it, w/ a new line at end
  return `${typescriptTypesCode}\n`;
};
