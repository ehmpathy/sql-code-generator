import { TypeDefinitionOfQuerySelectExpression } from '../../../../domain';
import { SqlSubqueryReference } from '../../../../domain/objects/SqlSubqueryReference';
import { extractTypeDefinitionReferenceFromSelectExpression } from './extractTypeDefinitionReferenceFromSelectExpressionSql';

export const extractTypeDefinitionFromSelectExpressionSql = ({
  sql,
  subqueries,
  inASubquery,
}: {
  sql: string;
  subqueries: SqlSubqueryReference[];
  inASubquery: boolean; // used to indicate whether we are currently running on a subquery or not; being in subquery gives us some implicit info
}) => {
  // grab the type reference
  const typeReference = extractTypeDefinitionReferenceFromSelectExpression({
    sql,
    subqueries,
  });

  // grab the alias, if any
  const [__, specifiedAlias] =
    new RegExp(/(?:[\w\.,:\(\)\s\|\']+)(?:\s+)(?:as|AS)(?:\s+)(\w+)/g).exec(
      sql,
    ) ?? []; // tslint:disable-line no-unused

  // define the alias, considering whether alias was specified
  if (
    !specifiedAlias &&
    !!typeReference.functionReferencePath &&
    !inASubquery
  ) {
    // throw error if fn reference and alias not defined, as its best practice to explicitly define it - and we're not going to "infer" it for the user
    throw new Error(
      `
select expressions that reference a function must have an alias defined, per best practice.
  - e.g., \`select concat(n.first, n.last)\` => \`select concat(n.first, n.last) as full_name\`

\`${typeReference.functionReferencePath}\` does not meet this criteria.
`.trim(),
    );
  }
  const alias = (() => {
    if (specifiedAlias) return specifiedAlias;
    if (inASubquery) return '__subquery_placeholder_name__'; // we wont use this alias anywhere, since we're in a subquery and subquery just returns one value; therefore, we can give it a fake name as a placeholder
    if (typeReference.tableReferencePath)
      return typeReference.tableReferencePath.split('.').slice(-1)[0]!;
    throw new Error('could not define alias for sql expression; unexpected');
  })();

  // return the full definition
  return new TypeDefinitionOfQuerySelectExpression({
    alias,
    typeReference,
  });
};
