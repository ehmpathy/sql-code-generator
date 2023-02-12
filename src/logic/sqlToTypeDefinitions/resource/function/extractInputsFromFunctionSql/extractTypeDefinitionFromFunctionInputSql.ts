import { DataType } from '../../../../../domain';
import { TypeDefinitionOfResourceInput } from '../../../../../domain/objects/TypeDefinitionOfResourceInput';
import { extractDataTypeFromColumnOrArgumentDefinitionSql } from '../../common/extractDataTypeFromColumnOrArgumentDefinitionSql';

export const extractTypeDefinitionFromFunctionInputSql = ({
  sql,
}: {
  sql: string;
}) => {
  // 1. extract the name; its typically the first string
  const name = sql.split(' ')[0]!.replace(/[^a-zA-Z_]+/gi, '');

  // 2. extract the root type;
  const primaryType = extractDataTypeFromColumnOrArgumentDefinitionSql({ sql });

  // 3. define the full type definition; note: array => union
  const type = [
    primaryType,
    DataType.NULL, // note: inputs to functions are always nullable ?
  ].filter((type) => !!type) as DataType[];

  // 4. return the definition
  return new TypeDefinitionOfResourceInput({
    name,
    type,
  });
};
