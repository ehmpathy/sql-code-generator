import { extractInputsFromFunctionSql } from './extractInputsFromFunctionSql/extractInputsFromFunctionSql';
import { extractOutputFromFunctionSql } from './extractOutputFromFunctionSql/extractOutputFromFunctionSql';
import { TypeDefinitionOfResourceFunction } from '../../../../domain/objects/TypeDefinitionOfResourceFunction';

export const extractTypeDefinitionFromFunctionSql = ({
  name,
  sql,
}: {
  name: string;
  sql: string;
}) => {
  // 1. get the input definition
  const inputs = extractInputsFromFunctionSql({ sql });

  // 2. get the output definition
  const output = extractOutputFromFunctionSql({ sql });

  // 3. return the full type
  return new TypeDefinitionOfResourceFunction({
    name,
    inputs,
    output,
  });
};
