import { ResourceType } from '../../../../model';
import { castResourceNameToTypescriptTypeName } from '../common/castResourceNameToTypescriptTypeName';
import { TypeDefinitionOfResourceView } from '../../../../model/valueObjects/TypeDefinitionOfResourceView';

export const defineTypescriptTypesForView = ({ definition }: { definition: TypeDefinitionOfResourceView }) => {
  // define column types in typescript format
  const typescriptInterfaceColumnDefinitions = definition.selectExpressions.map((selectExpression) => {
    // grab the source table name and source table column name
    if (!selectExpression.typeReference.tableReferencePath) {
      throw new Error('columns in views must reference tables; referencing functions is not supported yet');
    }
    const [sourceTableAlias, sourceTableColumnName] = selectExpression.typeReference.tableReferencePath.split('.');
    const sourceTableName = definition.tableReferences.find((ref) => ref.alias === sourceTableAlias)?.tableName;
    if (!sourceTableName) {
      throw new Error(
        `table alias for of select expression "${selectExpression.typeReference.tableReferencePath}" not found in view table references`,
      );
    }
    const sourceTableInterfaceName = castResourceNameToTypescriptTypeName({
      name: sourceTableName,
      resourceType: ResourceType.TABLE,
    });
    return `${selectExpression.alias}: ${sourceTableInterfaceName}['${sourceTableColumnName}'];`;
  });

  // output
  const typescriptInterfaceDefinition = `
export interface ${castResourceNameToTypescriptTypeName({ name: definition.name, resourceType: ResourceType.VIEW })} {
  ${typescriptInterfaceColumnDefinitions.join('\n  ')}
}
  `.trim();

  // return typescript types
  return typescriptInterfaceDefinition;
};
