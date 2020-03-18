import { SqlSubqueryReference } from '../../../../model/valueObjects/SqlSubqueryReference';
import { TypeDefinitionReference } from '../../../../model/valueObjects/TypeDefinitionReference';
import { throwErrorIfTableReferencePathImpliesTable } from '../common/throwErrorIfTableReferencePathImpliesTable';
import { extractTypeDefinitionReferenceFromSubqueryReferenceToken } from './extractTypeDefinitionReferenceFromSubqueryReferenceToken';

export const extractTypeDefinitionReferenceFromSelectExpression = ({
  sql,
  subqueries,
}: {
  sql: string;
  subqueries: SqlSubqueryReference[];
}) => {
  // 0. try to extract the reference from a subquery, if query references subquery
  const [
    _, // tslint:disable-line no-unused
    subqueryReferenceToken,
  ] = new RegExp(/^(__SSQ:[\w-]+__)(?:\s+(?:[\w\s]*))?$/).exec(sql) ?? [];
  if (subqueryReferenceToken) {
    return extractTypeDefinitionReferenceFromSubqueryReferenceToken({ subqueryReferenceToken, subqueries });
  }

  // 1. try to extract a tableReferencePath, if query references table
  const [
    __, // tslint:disable-line no-unused
    tableReferencePath,
  ] = new RegExp(/^(\w+\.?\w*)(?:\s+(?:[\w\s]*))?$/).exec(sql) ?? [];
  if (tableReferencePath) {
    throwErrorIfTableReferencePathImpliesTable({ referencePath: tableReferencePath }); // check that table reference is explicitly defined, since its best practice
    return new TypeDefinitionReference({
      tableReferencePath,
      functionReferencePath: null,
    });
  }

  // 2. try to extract a functionReferencePath, if query references function
  const [
    ___, // tslint:disable-line no-unused
    referencedFunctionName,
  ] = new RegExp(/(\w+)(?:\([\w\s\.:,\"\|]+\))/).exec(sql) ?? [];
  if (referencedFunctionName) {
    return new TypeDefinitionReference({
      tableReferencePath: null,
      functionReferencePath: `${referencedFunctionName.toLowerCase()}.output`,
    });
  }

  // 3. if couldn't determine type reference with either of the above, throw an error
  throw new Error(`could not extract type definition reference from '${sql}'`);
};
