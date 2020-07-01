import { DatabaseLanguage, QueryDeclaration, ResourceDeclaration } from '../../../../model';
import { getTypeDefinitionFromDeclarationWithHelpfulError } from './getTypeDefinitionFromDeclarationWithHelpfulError';
import { grabTypeDefinitionsForReferencedDatabaseProvidedFunctions } from './grabTypeDefinitionsForReferencedDatabaseProvidedFunctions/grabTypeDefinitionsForReferencedDatabaseProvidedFunctions';

export const extractTypeDefinitionsFromDeclarations = ({
  language,
  declarations,
}: {
  language: DatabaseLanguage;
  declarations: (ResourceDeclaration | QueryDeclaration)[];
}) => {
  // 1. grab definitions for all of the sql user has declared
  const definitions = declarations.map((declaration) =>
    getTypeDefinitionFromDeclarationWithHelpfulError({ declaration }),
  );

  // 2. pick out definitions for functions user is using that come built in w/ their language
  const referencedDbProvidedFunctionDefinintions = grabTypeDefinitionsForReferencedDatabaseProvidedFunctions({
    definitions,
    language,
  });

  // 3. return all necessary type definitions
  return [...definitions, ...referencedDbProvidedFunctionDefinintions];
};
