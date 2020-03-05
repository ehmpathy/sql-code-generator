import { DataType } from '../../../../../model';
import { TypeDefinitionOfResourceInput } from '../../../../../model/valueObjects/TypeDefinitionOfResourceInput';
import { extractDataTypeFromColumnOrArgumentDefinitionSql } from '../../common/extractDataTypeFromColumnOrArgumentDefinitionSql';

export const extractTypeDefinitionFromFunctionInputSql = ({ sql }: { sql: string }) => {
  // 1. extract the name; its typically the first string
  const name = sql.split(' ')[0].replace(/[^a-zA-Z_]+/gi, '');

  // 2. extract the root type;
  const primaryType = extractDataTypeFromColumnOrArgumentDefinitionSql({ sql });

  // 3. define the full type definition; note: array => union
  const type = [primaryType].filter((type) => !!type) as DataType[];

  // 4. return the definition
  return new TypeDefinitionOfResourceInput({
    name,
    type,
  });
};
