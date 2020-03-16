import {
  ResourceType,
  TypeDefinitionOfQueryTableReference,
  TypeDefinitionOfResourceTable,
  TypeDefinitionOfResourceView,
  TypeDefinition,
} from '../../../../model';
import { TypeDefinitionReference } from '../../../../model/valueObjects/TypeDefinitionReference';
import { castResourceNameToTypescriptTypeName } from '../castResourceNameToTypescriptTypeName';

export const defineTypescriptTypeFromTableReference = ({
  reference,
  queryTableReferences,
  typeDefinitions,
}: {
  reference: TypeDefinitionReference;

  /**
   * table references are required, as queries can define custom aliases per table
   */
  queryTableReferences: TypeDefinitionOfQueryTableReference[];

  /**
   * type definitions are required, as table references can reference tables _or_ views - and we have to determine which one
   */
  typeDefinitions: TypeDefinition[];
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

  // determine if this table reference is referencing a table or a view
  const referencedResource = typeDefinitions.find(
    (def): def is TypeDefinitionOfResourceTable | TypeDefinitionOfResourceView =>
      def.name === sourceTableName &&
      (def instanceof TypeDefinitionOfResourceTable || def instanceof TypeDefinitionOfResourceView),
  );
  if (!referencedResource) {
    throw new Error(`type definition was not found for referenced table or view '${sourceTableName}'`);
  }
  const resourceTypeReferenced =
    referencedResource instanceof TypeDefinitionOfResourceTable ? ResourceType.TABLE : ResourceType.VIEW;

  // grab the interface name for this table
  const sourceTableInterfaceName = castResourceNameToTypescriptTypeName({
    name: sourceTableName,
    resourceType: resourceTypeReferenced,
  });

  // merge the typescript table name + column name into the full typescript type
  return `${sourceTableInterfaceName}['${sourceTableColumnName}']`;
};
