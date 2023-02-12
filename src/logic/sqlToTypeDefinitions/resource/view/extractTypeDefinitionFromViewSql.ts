import { TypeDefinitionOfResourceView } from '../../../../domain/objects/TypeDefinitionOfResourceView';
import { extractTypeDefinitionFromQuerySql } from '../../query/extractTypeDefinitionFromQuerySql';

/*
  note: a view is effectively a named alias for a query
    - with the condition that the query can not have input variables

  therefore, the types are a subset of the query types
*/
export const extractTypeDefinitionFromViewSql = ({
  name,
  sql,
}: {
  name: string;
  sql: string;
}) => {
  // 0. grab the query definition from the view; e.g.: `CREATE VIEW __NAME__ AS SELECT ....` => `SELECT ...` => typedef
  const querySql = sql
    .split(/(SELECT|select)/)
    .slice(1) // slice(1) since part[0] = CREATE VIEW ... AS, part[1] = SELECT, part[2] = __SELECT_BODY__
    .join(''); // merge to have SELECT __SELECT_BODY__
  const queryDef = extractTypeDefinitionFromQuerySql({
    name,
    path: 'none', // we dont currently track paths for view - and it wont be a problem downstream to fake it, so put a placeholder value
    sql: querySql,
  });

  // 1. check that query def does not have any inputs, as views with inputs in query are invalid
  if (queryDef.inputVariables.length)
    throw new Error(`query def for view '${name}' can not have inputs`);

  // 2. grab the selectExpressions and tableReferences off of the query
  return new TypeDefinitionOfResourceView({
    name,
    selectExpressions: queryDef.selectExpressions,
    tableReferences: queryDef.tableReferences,
  });
};
