import { ResourceType } from '../../../../model';
import { castResourceNameToInterfaceName } from '../_utils/castResourceNameToInterfaceName';
import { TypeDefinitionOfResourceView } from '../../../../model/valueObjects/TypeDefinitionOfResourceView';

export const defineTypescriptTypesForView = ({ definition }: { definition: TypeDefinitionOfResourceView }) => {
  // define column types in typescript format
  const typescriptInterfaceColumnDefinitions = definition.selectExpressions.map((selectExpression) => {
    // grab the source table name and source table column name
    const [sourceTableAlias, sourceTableColumnName] = selectExpression.sourcePath.split('.');
    const sourceTableName = definition.tableReferences.find((ref) => ref.alias === sourceTableAlias)?.tableName;
    if (!sourceTableName) {
      throw new Error(
        `table alias for of select expression "${selectExpression.sourcePath}" not found in view table references`,
      );
    }
    const sourceTableInterfaceName = castResourceNameToInterfaceName({
      name: sourceTableName,
      resourceType: ResourceType.TABLE,
    });
    return `${selectExpression.alias}: ${sourceTableInterfaceName}['${sourceTableColumnName}'];`;
  });

  // output
  const typescriptInterfaceDefinition = `
export interface ${castResourceNameToInterfaceName({ name: definition.name, resourceType: ResourceType.VIEW })} {
  ${typescriptInterfaceColumnDefinitions.join('\n  ')}
}
  `.trim();

  // return typescript types
  return typescriptInterfaceDefinition;
};
