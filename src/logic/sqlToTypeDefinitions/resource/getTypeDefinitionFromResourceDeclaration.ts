import { ResourceDeclaration, ResourceType } from '../../../domain';
import { extractResourceTypeAndNameFromDDL } from './extractResourceTypeAndNameFromDDL';
import { extractTypeDefinitionFromFunctionSql } from './function/extractTypeDefinitionFromFunctionSql';
import { extractTypeDefinitionFromTableSql } from './table/extractTypeDefinitionFromTableSql';
import { extractTypeDefinitionFromViewSql } from './view/extractTypeDefinitionFromViewSql';

export const getTypeDefinitionFromResourceDeclaration = ({
  declaration,
}: {
  declaration: ResourceDeclaration;
}) => {
  // 1. get name and type of resource
  const { name, type } = extractResourceTypeAndNameFromDDL({
    ddl: declaration.sql,
  });

  // 2. based on type, get the type definition
  if (type === ResourceType.TABLE) {
    return extractTypeDefinitionFromTableSql({
      name,
      sql: declaration.sql,
    });
  }
  if (type === ResourceType.FUNCTION) {
    return extractTypeDefinitionFromFunctionSql({
      name,
      sql: declaration.sql,
    });
  }
  if (type === ResourceType.VIEW) {
    return extractTypeDefinitionFromViewSql({
      name,
      sql: declaration.sql,
    });
  }
  throw new Error(`resource type '${type}' is not yet supported`);
};
