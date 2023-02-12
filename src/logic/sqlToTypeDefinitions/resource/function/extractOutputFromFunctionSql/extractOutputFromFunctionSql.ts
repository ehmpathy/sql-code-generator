import strip from 'sql-strip-comments';

import { DataType, TypeDefinitionOfResourceColumn, TypeDefinitionOfResourceTable } from '../../../../../domain';
import { extractDataTypeFromColumnOrArgumentDefinitionSql } from '../../common/extractDataTypeFromColumnOrArgumentDefinitionSql';
import { extractTypeDefinitionFromTableSql } from '../../table/extractTypeDefinitionFromTableSql';

/*
  note: functions only return _one_ value, unnamed
*/
export const extractOutputFromFunctionSql = ({ sql }: { sql: string }): TypeDefinitionOfResourceTable | DataType[] => {
  // 0. strip comments
  const strippedSql: string = strip(sql);

  // 1. grab the insides of the inputs definition
  const sqlAfterReturns = strippedSql.split(/RETURNS/gi)[1];

  const sqlBetweenReturnsAndNextKeyword = sqlAfterReturns.split(/(?:BEGIN|AS|LANGUAGE)/gi)[0]; // BEGIN is next in mysql, AS or LANGUAGE are next in postgres

  // 2. grab the return type out of the return statement; NOTE: functions only return one value OR a table
  const dataTypeOrTableDef = (() => {
    const isTableOutput = new RegExp(/^ ?TABLE ?\(/i).test(sqlBetweenReturnsAndNextKeyword); // detect whether this function outputs a table or not
    if (isTableOutput) {
      // grab the table def like normal, from the table def inside the returns type
      const tableDef = extractTypeDefinitionFromTableSql({
        name: 'function.output',
        sql: sqlBetweenReturnsAndNextKeyword,
      });

      // and then apply some function specific info (e.g., not-null by default in function context)
      return new TypeDefinitionOfResourceTable({
        ...tableDef,
        columns: tableDef.columns.map(
          (column) =>
            new TypeDefinitionOfResourceColumn({
              ...column,
              type: column.type.filter((thisType) => thisType !== DataType.NULL), // functions table return type columns are "not-null" by default (and in fact throw an error if attempt to explicitly specify not null), so specify not null for functions by default. (this is true at least in all of the db engines we've considered so far, we can update this per db-engine if we find this is not true for all)
            }),
        ),
      });
    }

    // otherwise, extract the type like a normal column def
    return extractDataTypeFromColumnOrArgumentDefinitionSql({
      sql: ` ${sqlBetweenReturnsAndNextKeyword.trim()}`,
    });
  })();
  if (!dataTypeOrTableDef) throw new Error('output type could not be extracted from function sql');
  return dataTypeOrTableDef instanceof TypeDefinitionOfResourceTable ? dataTypeOrTableDef : [dataTypeOrTableDef]; // table references should be returned exactly. DataType's should be returned as an array
};
