import { TypeDefinitionOfQuerySelectExpression } from '../../../../model';

export const extractTypeDefinitionFromSelectExpressionSql = ({ sql }: { sql: string }) => {
  // grab the source path
  const [_, sourcePath] = new RegExp(/^(\w+\.?\w*)(?:\s+(?:[\w\s]*))?$/).exec(sql) ?? []; // tslint:disable-line no-unused
  if (!sourcePath) throw new Error('could not extract source path from select expression sql; unexpected'); // fail fast
  if (sourcePath.split('.').length !== 2) {
    throw new Error(
      `select expression of "${sql}" does not have the table alias explicitly defined, violating best practice`,
    );
  }

  // grab the alias, if any
  const [__, specifiedAlias] = new RegExp(/(?:[\w\.]+)(?:\s+)(?:as)(?:\s+)(\w+)/g).exec(sql) ?? []; // tslint:disable-line no-unused

  // define the alias, considering whether alias was specified
  const alias = specifiedAlias ? specifiedAlias : sourcePath.split('.').slice(-1)[0];

  // return the full definition
  return new TypeDefinitionOfQuerySelectExpression({ alias, sourcePath });
};
