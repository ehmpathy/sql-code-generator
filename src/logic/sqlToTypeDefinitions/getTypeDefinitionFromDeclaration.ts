import { QueryDeclaration, ResourceDeclaration, ResourceType } from '../../model';
import { extractTypeDefinitionFromQuerySql } from './query/extractTypeDefinitionFromQuerySql';
import { extractTypeDefinitionFromFunctionSql } from './resource/function/extractTypeDefinitionFromFunctionSql';
import { extractTypeDefinitionFromTableSql } from './resource/table/extractTypeDefinitionFromTableSql';
import { extractTypeDefinitionFromViewSql } from './resource/view/extractTypeDefinitionFromViewSql';

export const getTypeDefinitionFromDeclaration = ({
  declaration,
}: {
  declaration: QueryDeclaration | ResourceDeclaration;
}) => {
  if (declaration instanceof QueryDeclaration) {
    return extractTypeDefinitionFromQuerySql({
      name: declaration.name,
      sql: declaration.sql,
    });
  }
  if (declaration instanceof ResourceDeclaration) {
    if (declaration.type === ResourceType.TABLE) {
      return extractTypeDefinitionFromTableSql({
        name: declaration.name,
        sql: declaration.sql,
      });
    }
    if (declaration.type === ResourceType.FUNCTION) {
      return extractTypeDefinitionFromFunctionSql({
        name: declaration.name,
        sql: declaration.sql,
      });
    }
    if (declaration.type === ResourceType.VIEW) {
      return extractTypeDefinitionFromViewSql({
        name: declaration.name,
        sql: declaration.sql,
      });
    }
    throw new Error(`resource type ${declaration.type} is not yet supported`);
  }
  throw new Error('unexpected declaration type'); // fail fast, this should never occur
};
