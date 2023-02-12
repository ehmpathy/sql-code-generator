import chalk from 'chalk';
import { ResourceDeclaration, QueryDeclaration } from '../../../../domain';
import { getTypeDefinitionFromDeclaration } from '../../../sqlToTypeDefinitions/getTypeDefinitionFromDeclaration';

class ErrorExtractingTypeDefinitionFromDeclaration extends Error {
  constructor({ declaration, error }: { declaration: ResourceDeclaration | QueryDeclaration; error: Error }) {
    const declarationTypeCommonName = declaration instanceof QueryDeclaration ? 'query' : 'resource';
    const message = `
Error: Could not extract type definition from sql of ${declarationTypeCommonName} from file '${declaration.path}': ${error.message}

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
    // log that we have failed
    const failureMessage = `  ${chalk.bold(chalk.red('x'))} ${chalk.red(chalk.bold('[PARSED]'))} ${chalk.bold(
      declaration.path,
    )}\n`;
    console.log(failureMessage); // tslint:disable-line no-console

    // and pass the error up
    throw new ErrorExtractingTypeDefinitionFromDeclaration({ declaration, error });
  }
};
