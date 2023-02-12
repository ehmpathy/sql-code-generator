import { DataType, TypeDefinitionOfResourceColumn } from '../../../../domain';
import { extractDataTypeFromColumnOrArgumentDefinitionSql } from '../common/extractDataTypeFromColumnOrArgumentDefinitionSql';

export const extractTypeDefinitionFromColumnSql = ({ sql }: { sql: string }) => {
  // 1. extract the name; its typically the first string
  const name = sql.split(' ')[0].replace(/[^a-zA-Z_]+/gi, '');

  // 2. extract the root type;
  const primaryType = extractDataTypeFromColumnOrArgumentDefinitionSql({ sql });

  // 3. determine if its nullable
  const isNullable = !sql.toUpperCase().includes(' NOT NULL');

  // 4. define the full type definition; note: array => union
  const type = [primaryType, isNullable ? DataType.NULL : null].filter((type) => !!type) as DataType[];

  // 5. return the definition
  return new TypeDefinitionOfResourceColumn({
    name,
    type,
  });
};
