import strip from 'sql-strip-comments';

import { extractDataTypeFromColumnOrArgumentDefinitionSql } from '../../common/extractDataTypeFromColumnOrArgumentDefinitionSql';

/*
  note: functions only return _one_ value, unnamed
*/
export const extractOutputFromFunctionSql = ({ sql }: { sql: string }) => {
  // 0. strip comments
  const strippedSql: string = strip(sql);

  // 1. grab the insides of the inputs definition
  const sqlAfterReturns = strippedSql.split(/(?:RETURNS|returns)/g)[1];
  const sqlBetweenReturnsAndBegins = sqlAfterReturns.split(/(?:BEGIN|begin)/g)[0];

  // 2. grab the return type out of the return statement; NOTE: functions only return one value
  const dataType = extractDataTypeFromColumnOrArgumentDefinitionSql({ sql: ` ${sqlBetweenReturnsAndBegins.trim()}` });
  if (!dataType) throw new Error('data type could not be extracted from function sql');
  return [dataType];
};
