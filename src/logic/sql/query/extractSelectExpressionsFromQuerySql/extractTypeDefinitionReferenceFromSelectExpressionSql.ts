import { throwErrorIfTableReferencePathImpliesTable } from '../common/throwErrorIfTableReferencePathImpliesTable';
import { TypeDefinitionReference } from '../../../../model/valueObjects/TypeDefinitionReference';

export const extractTypeDefinitionReferenceFromSelectExpression = ({ sql }: { sql: string }) => {
  // 1. try to extract a tableReferencePath, if query references table
  const [
    _, // tslint:disable-line no-unused
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
    __, // tslint:disable-line no-unused
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
