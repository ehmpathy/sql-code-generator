import { TypeDefinitionOfQuerySelectExpression } from '../../../../model';

export const extractTypeDefinitionFromSelectExpressionSql = ({ sql }: { sql: string }) => {
  // grab the source path
  const [_, sourcePath] = new RegExp(/^(\w+\.?\w*)(?:\s+(?:[\w\s]*))?$/).exec(sql) ?? []; // tslint:disable-line no-unused
  if (!sourcePath) throw new Error('could not extract source path from select expression sql; unexpected'); // fail fast

  // grab the alias, if any
  const [__, alias] = new RegExp(/(?:[\w\.]+)(?:\s+)(?:as)(?:\s+)(\w+)/g).exec(sql) ?? []; // tslint:disable-line no-unused

  // define the name, considering whether alias was given
  const name = alias ? alias : sourcePath.split('.').slice(-1)[0];

  // return the full definition
  return new TypeDefinitionOfQuerySelectExpression({ name, sourcePath });
};
