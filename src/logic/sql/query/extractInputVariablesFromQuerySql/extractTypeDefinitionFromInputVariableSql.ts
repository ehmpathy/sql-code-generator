import { TypeDefinitionOfQueryInputVariable } from '../../../../model/valueObjects/TypeDefinitionOfQueryInputVariable';
import { throwErrorIfTableReferencePathImpliesTable } from '../common/throwErrorIfTableReferencePathImpliesTable';

export const extractTypeDefinitionFromInputVariableSql = ({ token, sql }: { token: string; sql: string }) => {
  // 1. check if this token matches the "resource.column = :token" pattern; if so, then the input type = the resource.column type
  const [
    _, // tslint:disable-line no-unused
    leftEqualsTableReferencePath, // check if "resource.column = :token"
  ] = new RegExp(`(\\w+\\.?\\w*)\\s?=\\s?(?:${token})`, 'g').exec(sql) ?? [];
  if (leftEqualsTableReferencePath) {
    throwErrorIfTableReferencePathImpliesTable({ referencePath: leftEqualsTableReferencePath });
    return new TypeDefinitionOfQueryInputVariable({
      name: token.replace(':', ''),
      tableReferencePath: leftEqualsTableReferencePath,
      functionReferencePath: null,
    });
  }

  // 2. check if this token matches the ":token = resource.column" pattern; same as above, but flipped
  const [
    __, // tslint:disable-line no-unused
    rightEqualsTableReferencePath, // check if "resource.column = :token"
  ] = new RegExp(`(?:${token})\\s?=\\s?(\\w+\\.?\\w*)`).exec(sql) ?? [];
  if (rightEqualsTableReferencePath) {
    throwErrorIfTableReferencePathImpliesTable({ referencePath: rightEqualsTableReferencePath });
    return new TypeDefinitionOfQueryInputVariable({
      name: token.replace(':', ''),
      tableReferencePath: rightEqualsTableReferencePath,
      functionReferencePath: null,
    });
  }

  // 3. check if this token is used in a function. If so, its equivalent to whatever is at that index of the function params

  // note: this reg matches the whole function def (e.g., `upsert_image(:url,:caption,:credit)`)
  const reg = `\\s+(\\w+\\((?:\\s*[:\\w]+,)*(?:\\s*${token},?)(?:\\s*[:\\w]+,?)*\\s?\\))`;
  const [
    ___, // tslint:disable-line no-unused
    tokenInsideFunctionMatch, // check if "resource.column = :token"
  ] = new RegExp(reg).exec(sql) ?? [];
  if (tokenInsideFunctionMatch) {
    // 1. grab the function name
    const functionName = tokenInsideFunctionMatch.split('(')[0].trim();

    // 2. figure out where in the array the token is
    const sqlAfterOpen = tokenInsideFunctionMatch.split('(')[1];
    const sqlBetweenOpenAndClose = sqlAfterOpen.split(')')[0];
    const parametersArray = sqlBetweenOpenAndClose.split(',').map((str) => str.trim());
    const index = parametersArray.indexOf(token);
    if (index === -1) throw new Error('unexpected'); // this should never occur if the regex is working correctly; fail fast though

    // return the function path
    return new TypeDefinitionOfQueryInputVariable({
      name: token.replace(':', ''),
      functionReferencePath: `${functionName}.${index}`,
      tableReferencePath: null,
    });
  }

  // if none of the above worked, throw an error. one should work...
  throw new Error(`could not extract type definition for input variable ${token}`);
};
