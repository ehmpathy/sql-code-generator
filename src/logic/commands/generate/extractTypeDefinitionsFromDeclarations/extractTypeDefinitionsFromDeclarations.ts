import { QueryDeclaration, ResourceDeclaration } from '../../../../model';
import { getTypeDefinitionFromDeclarationWithHelpfulError } from './getTypeDefinitionFromDeclarationWithHelpfulError';
import { grabTypeDefinitionsForReferencedDatabaseProvidedFunctions } from './grabTypeDefinitionsForReferencedDatabaseProvidedFunctions/grabTypeDefinitionsForReferencedDatabaseProvidedFunctions';

export const extractTypeDefinitionsFromDeclarations = ({
  declarations,
}: {
  declarations: (ResourceDeclaration | QueryDeclaration)[];
}) => {
  // 1. grab definitions for all of the sql user has declared
  const definitions = declarations.map((declaration) =>
    getTypeDefinitionFromDeclarationWithHelpfulError({ declaration }),
  );

  // 2. pick out definitions for functions user is using that come built in w/ their language
  const referencedDbProvidedFunctionDefinintions = grabTypeDefinitionsForReferencedDatabaseProvidedFunctions({
    definitions,
  });

  // 3. return all necessary type definitions
  return [...definitions, ...referencedDbProvidedFunctionDefinintions];
};
