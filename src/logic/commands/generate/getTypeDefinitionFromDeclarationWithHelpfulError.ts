import { ResourceDeclaration, QueryDeclaration } from '../../../model';
import { getTypeDefinitionFromDeclaration } from '../../sqlToTypeDefinitions/getTypeDefinitionFromDeclaration';

class ErrorExtractingTypeDefinitionFromDeclaration extends Error {
  constructor({ declaration, error }: { declaration: ResourceDeclaration | QueryDeclaration; error: Error }) {
    const declarationTypeCommonName =
      declaration instanceof QueryDeclaration ? 'query' : declaration.type.toLowerCase();
    const message = `
Error: Could not extract type definition from sql of ${declarationTypeCommonName} '${declaration.name}' ('${declaration.path}'): ${error.message}

You can fix the error by correcting the sql in '${declaration.path}'
    `.trim();
    super(message);
    this.stack = error.stack?.replace(error.message, message); // swap out the stack
  }
}

/**
 * wraps the call in a try catch which adds info about _which_ declaration the error was thrown on
 */
export const getTypeDefinitionFromDeclarationWithHelpfulError = ({
  declaration,
}: {
  declaration: ResourceDeclaration | QueryDeclaration;
}) => {
  try {
    return getTypeDefinitionFromDeclaration({ declaration });
  } catch (error) {
    throw new ErrorExtractingTypeDefinitionFromDeclaration({ declaration, error });
  }
};
