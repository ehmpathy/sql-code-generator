import { DataType } from '../../../../domain';
import { TypeDefinitionOfQueryInputVariable } from '../../../../domain/objects/TypeDefinitionOfQueryInputVariable';
import { TypeDefinitionReference } from '../../../../domain/objects/TypeDefinitionReference';
import { throwErrorIfTableReferencePathImpliesTable } from '../common/throwErrorIfTableReferencePathImpliesTable';

export const extractTypeDefinitionFromInputVariableSql = ({
  token,
  sql,
}: {
  token: string;
  sql: string;
}): TypeDefinitionOfQueryInputVariable => {
  // define regex for token w/ optional type casting
  const tokenWithOptionalTypecastingRegexString = `${token}(?:\\:\\:\\w+(?:\\[\\])?)?`;

  // check if this token matches the "resource.column =,<=,>= :token" pattern; if so, then the input type = the resource.column type
  const [
    _, // tslint:disable-line no-unused
    leftEqualsTableReferencePath, // check if "resource.column = :token" or "resource.column <= :token" or "resource.column <= :token"
  ] =
    new RegExp(
      `(\\w+\\.?\\w*)\\s?(?:<|>)?=\\s?(?:${tokenWithOptionalTypecastingRegexString})(?:[^\\w]|$)`,
      'g',
    ).exec(sql) ?? [];
  if (leftEqualsTableReferencePath) {
    throwErrorIfTableReferencePathImpliesTable({
      referencePath: leftEqualsTableReferencePath,
    });
    return new TypeDefinitionOfQueryInputVariable({
      name: token.replace(':', ''),
      type: new TypeDefinitionReference({
        tableReferencePath: leftEqualsTableReferencePath,
        functionReferencePath: null,
      }),
    });
  }

  // check if this token matches the ":token =,<=,>= resource.column" pattern; same as above, but flipped
  const [
    __, // tslint:disable-line no-unused
    rightEqualsTableReferencePath, // check if ":token = resource.column" or ":token <= resource.column" or ":token >= resource.column"
  ] =
    new RegExp(
      `(?:${tokenWithOptionalTypecastingRegexString})\\s?(?:<|>)?=\\s?(\\w+\\.?\\w*)`,
    ).exec(sql) ?? [];
  if (rightEqualsTableReferencePath) {
    throwErrorIfTableReferencePathImpliesTable({
      referencePath: rightEqualsTableReferencePath,
    });
    return new TypeDefinitionOfQueryInputVariable({
      name: token.replace(':', ''),
      type: new TypeDefinitionReference({
        tableReferencePath: rightEqualsTableReferencePath,
        functionReferencePath: null,
      }),
    });
  }

  // check if this token is used in a function. If so, its equivalent to whatever is at that index of the function params
  const reg = `\\s+(\\w+\\((?:\\s*[:\\w#]+,)*(?:\\s*${tokenWithOptionalTypecastingRegexString},?)(?:\\s*[:\\w#]+,?)*\\s?\\))`; // note: this reg matches the whole function def (e.g., `upsert_image(:url,:caption,:credit)`)
  const [
    // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
    ___,
    tokenInsideFunctionMatch, // check if "functionName(arg1?, :token, arg2?)"
  ] = new RegExp(reg).exec(sql) ?? [];
  if (tokenInsideFunctionMatch) {
    // grab the function name
    const functionName = tokenInsideFunctionMatch.split('(')[0]!.trim();

    // figure out where in the array the token is
    const sqlAfterOpen = tokenInsideFunctionMatch.split('(')[1]!;
    const sqlBetweenOpenAndClose = sqlAfterOpen.split(')')[0]!;
    const parametersArray = sqlBetweenOpenAndClose
      .split(',')
      .map((str) => str.trim());
    const index = parametersArray.findIndex((parameter) =>
      new RegExp(tokenWithOptionalTypecastingRegexString).test(parameter),
    );
    if (index === -1) throw new Error('unexpected'); // this should never occur if the regex is working correctly; fail fast though

    // return the function path
    return new TypeDefinitionOfQueryInputVariable({
      name: token.replace(':', ''),
      type: new TypeDefinitionReference({
        functionReferencePath: `${functionName}.input.${index}`,
        tableReferencePath: null,
      }),
    });
  }

  // check if this token is used in a limit. If so, type = a number
  const tokenUsedForLimit = new RegExp(
    `(?:LIMIT|limit)\\s+${token}(?:[^\\w]|$)`,
  ).test(sql); // check if "LIMIT :token"
  if (tokenUsedForLimit) {
    return new TypeDefinitionOfQueryInputVariable({
      name: token.replace(':', ''),
      type: [DataType.NUMBER],
    });
  }

  // check if this token is used in an offset. If so, type = a number
  const tokenUsedForOffset = new RegExp(
    `(?:OFFSET|offset)\\s+${token}(?:[^\\w]|$)`,
  ).test(sql); // check if "OFFSET :token"
  if (tokenUsedForOffset) {
    return new TypeDefinitionOfQueryInputVariable({
      name: token.replace(':', ''),
      type: [DataType.NUMBER],
    });
  }

  // check if this token is used in a null comparison. if so, type = null
  const tokenUsedForNullComparison = new RegExp(
    `(?:${tokenWithOptionalTypecastingRegexString})\\s+(?:IS|is)\\s+(?:NULL|null)(?:[^\\w]|$)`,
  ).test(sql); // check if "OFFSET :token"
  if (tokenUsedForNullComparison) {
    return new TypeDefinitionOfQueryInputVariable({
      name: token.replace(':', ''),
      type: [DataType.NULL],
    });
  }

  // if none of the above worked, throw an error. one should work...
  throw new Error(
    `could not extract type definition for input variable '${token}'`,
  );
};
