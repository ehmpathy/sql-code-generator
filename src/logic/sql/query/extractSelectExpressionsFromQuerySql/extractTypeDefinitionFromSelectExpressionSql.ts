import { TypeDefinitionOfQuerySelectExpression } from '../../../../model';
import { extractTypeDefinitionReferenceFromSelectExpression } from './extractTypeDefinitionReferenceFromSelectExpressionSql';

export const extractTypeDefinitionFromSelectExpressionSql = ({ sql }: { sql: string }) => {
  // grab the type reference
  const typeReference = extractTypeDefinitionReferenceFromSelectExpression({ sql });

  // grab the alias, if any
  const [__, specifiedAlias] = new RegExp(/(?:[\w\.,:\(\)\s]+)(?:\s+)(?:as)(?:\s+)(\w+)/g).exec(sql) ?? []; // tslint:disable-line no-unused

  // define the alias, considering whether alias was specified
  if (!specifiedAlias && !!typeReference.functionReferencePath) {
    // throw error if fn reference and alias not defined, as its best practice to explicitly define it - and we're not going to "infer" it for the user
    throw new Error(
      `
select expressions that reference a function must have an alias defined, per best practice.
  - e.g., \`select concat(n.first, n.last)\` => \`select concat(n.first, n.last) as full_name\`
`.trim(),
    );
  }
  const alias = specifiedAlias ? specifiedAlias : typeReference.tableReferencePath!.split('.').slice(-1)[0];

  // return the full definition
  return new TypeDefinitionOfQuerySelectExpression({
    alias,
    typeReference,
  });
};
