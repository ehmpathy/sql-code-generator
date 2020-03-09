import { TypeDefinitionOfQuerySelectExpression } from '../../../../model';
import { throwErrorIfTableReferencePathImpliesTable } from '../common/throwErrorIfTableReferencePathImpliesTable';

export const extractTypeDefinitionFromSelectExpressionSql = ({ sql }: { sql: string }) => {
  // grab the source path
  const [_, sourcePath] = new RegExp(/^(\w+\.?\w*)(?:\s+(?:[\w\s]*))?$/).exec(sql) ?? []; // tslint:disable-line no-unused
  if (!sourcePath) throw new Error('could not extract source path from select expression sql; unexpected'); // fail fast
  throwErrorIfTableReferencePathImpliesTable({ referencePath: sourcePath });

  // grab the alias, if any
  const [__, specifiedAlias] = new RegExp(/(?:[\w\.]+)(?:\s+)(?:as)(?:\s+)(\w+)/g).exec(sql) ?? []; // tslint:disable-line no-unused

  // define the alias, considering whether alias was specified
  const alias = specifiedAlias ? specifiedAlias : sourcePath.split('.').slice(-1)[0];

  // return the full definition
  return new TypeDefinitionOfQuerySelectExpression({ alias, sourcePath });
};
