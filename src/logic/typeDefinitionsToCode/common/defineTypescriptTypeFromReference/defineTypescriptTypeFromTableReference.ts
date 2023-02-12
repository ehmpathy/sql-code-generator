import {
  ResourceType,
  TypeDefinitionOfQueryTableReference,
  TypeDefinitionOfResourceTable,
  TypeDefinitionOfResourceView,
  TypeDefinition,
  TypeDefinitionOfResourceFunction,
} from '../../../../domain';
import { TypeDefinitionReference } from '../../../../domain/objects/TypeDefinitionReference';
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
  if (!reference.tableReferencePath)
    throw new Error('expected table reference to be defined'); // fail fast

  // grab the table name and column name from the source path
  const [sourceTableAlias, sourceTableColumnName] =
    reference.tableReferencePath.split('.'); // note: we guarantee this format in the sqlToTypeDef layer

  // resolve alias => table name
  const tableReference = queryTableReferences.find(
    (ref) => ref.alias === sourceTableAlias,
  );
  const sourceTableName =
    tableReference?.tableName ?? tableReference?.functionName;
  if (!tableReference || !sourceTableName)
    throw new Error(
      `table alias for of select expression "${reference.tableReferencePath}" not found in query table references`,
    );

  // determine if this table reference is referencing a table or a view
  const referencedResource = typeDefinitions.find(
    (
      def,
    ): def is
      | TypeDefinitionOfResourceTable
      | TypeDefinitionOfResourceView
      | TypeDefinitionOfResourceFunction =>
      def.name === sourceTableName &&
      (def instanceof TypeDefinitionOfResourceTable ||
        def instanceof TypeDefinitionOfResourceView ||
        def instanceof TypeDefinitionOfResourceFunction),
  );
  if (!referencedResource) {
    if (tableReference.tableName)
      throw new Error(
        `type definition was not found for referenced table or view '${sourceTableName}'`,
      );
    if (tableReference.functionName)
      throw new Error(
        `type definition was not found for referenced function '${sourceTableName}'`,
      );
  }
  const resourceTypeReferenced = (() => {
    if (referencedResource instanceof TypeDefinitionOfResourceTable)
      return ResourceType.TABLE;
    if (referencedResource instanceof TypeDefinitionOfResourceView)
      return ResourceType.VIEW;
    if (referencedResource instanceof TypeDefinitionOfResourceFunction)
      return ResourceType.FUNCTION;
    throw new Error(
      'unexpected condition, indicates bug within sql-code-generator',
    ); // this should not occur
  })();

  // check that if its a function, the output of the function is a table
  if (
    referencedResource instanceof TypeDefinitionOfResourceFunction &&
    !(referencedResource.output instanceof TypeDefinitionOfResourceTable)
  )
    throw new Error(
      `function being used as a query table reference but does not return a table. '${sourceTableName}' can't be used as a table reference.`,
    );

  // grab the interface name for this table
  const sourceTableInterfaceName = castResourceNameToTypescriptTypeName({
    name: sourceTableName,
    resourceType: resourceTypeReferenced,
  });

  // merge the typescript table name + column name into the full typescript type
  return `${sourceTableInterfaceName}${
    resourceTypeReferenced === ResourceType.FUNCTION ? 'Output' : '' // if its referencing a function, then its referencing the function's output
  }['${sourceTableColumnName}']`;
};
