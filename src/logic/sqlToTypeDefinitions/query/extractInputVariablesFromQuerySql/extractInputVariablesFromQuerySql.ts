/*
  goal:
  - try to define input type when possible
  - fallback to "any" when not possible and ask user to add an issue w/ use case when this occurs
    - so that the generator is non-blocking

  e.g.,:
    - where u.id = :id => "{ id: number }"
    - where lower(u.name) = :name => { name: any } (for mvp);
      - later, { name: string } (since we'd track standard fn's; TODO)

  steps:
    - 1. find all of the `:__variable_name__` pattern input definitions (yesql format)
    - 2. attempt to figure out the type for each variable name
*/

import { extractInputVariableTokensFromQuerySql } from './extractInputVariableTokensFromQuerySql';
import { extractTypeDefinitionFromInputVariableSql } from './extractTypeDefinitionFromInputVariableSql';

export const extractInputVariablesFromQuerySql = ({ sql }: { sql: string }) => {
  // 1. find each input variable that needs to have a type def defined
  const inputVariableTokens = extractInputVariableTokensFromQuerySql({ sql });

  // 2. define the type definition for each variable
  const definitions = inputVariableTokens.map((token) => extractTypeDefinitionFromInputVariableSql({ token, sql }));

  // 3. return defs
  return definitions;
};
