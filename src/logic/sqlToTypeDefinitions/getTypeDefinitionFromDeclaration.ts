import { QueryDeclaration, ResourceDeclaration } from '../../domain';
import { getTypeDefinitionFromQueryDeclaration } from './query/getTypeDefinitionFromQueryDeclaration';
import { getTypeDefinitionFromResourceDeclaration } from './resource/getTypeDefinitionFromResourceDeclaration';

export const getTypeDefinitionFromDeclaration = ({
  declaration,
}: {
  declaration: QueryDeclaration | ResourceDeclaration;
}) => {
  if (declaration instanceof QueryDeclaration)
    return getTypeDefinitionFromQueryDeclaration({ declaration });
  if (declaration instanceof ResourceDeclaration)
    return getTypeDefinitionFromResourceDeclaration({ declaration });
  throw new Error('unexpected declaration type'); // fail fast, this should never occur
};
