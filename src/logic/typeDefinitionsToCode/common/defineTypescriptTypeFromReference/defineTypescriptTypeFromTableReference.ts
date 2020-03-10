import { ResourceType, TypeDefinitionOfQueryTableReference } from '../../../../model';
import { TypeDefinitionReference } from '../../../../model/valueObjects/TypeDefinitionReference';
import { castResourceNameToTypescriptTypeName } from '../castResourceNameToTypescriptTypeName';

export const defineTypescriptTypeFromTableReference = ({
  reference,
  queryTableReferences,
}: {
  reference: TypeDefinitionReference;

  /**
   * table references are required, as queries can define custom aliases per table
   */
  queryTableReferences: TypeDefinitionOfQueryTableReference[];
}) => {
  // sanity check what this is called with, to help us debug if needed
  if (!reference.tableReferencePath) throw new Error('expected table reference to be defined'); // fail fast

  // grab the table name and column name from the source path
  const [sourceTableAlias, sourceTableColumnName] = reference.tableReferencePath.split('.'); // note: we guarantee this format in the sqlToTypeDef layer

  // resolve alias => table name
  const sourceTableName = queryTableReferences.find((ref) => ref.alias === sourceTableAlias)?.tableName;
  if (!sourceTableName) {
    throw new Error(
      `table alias for of select expression "${reference.tableReferencePath}" not found in query table references`,
    );
  }

  // grab the interface name for this table
  const sourceTableInterfaceName = castResourceNameToTypescriptTypeName({
    name: sourceTableName,
    resourceType: ResourceType.TABLE,
  });

  // merge the typescript table name + column name into the full typescript type
  return `${sourceTableInterfaceName}['${sourceTableColumnName}']`;
};
