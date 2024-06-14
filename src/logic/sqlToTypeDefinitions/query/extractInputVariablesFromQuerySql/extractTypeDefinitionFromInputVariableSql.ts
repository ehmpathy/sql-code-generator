import { DataType } from '../../../../domain';
import { TypeDefinitionOfQueryInputVariable } from '../../../../domain/objects/TypeDefinitionOfQueryInputVariable';
import { TypeDefinitionReference } from '../../../../domain/objects/TypeDefinitionReference';
import { throwErrorIfTableReferencePathImpliesTable } from '../common/throwErrorIfTableReferencePathImpliesTable';

const REGEXP_TOKEN_WITH_OPTIONAL_TYPECAST = (token: string) =>
  `${token}(?:\\:\\:\\w+(?:\\[\\])?)?`;

const REGEXP_RIGHTHAND_COMPARISON_OPERATOR = (token: string) =>
  `(?:${REGEXP_TOKEN_WITH_OPTIONAL_TYPECAST(
    token,
  )})\\s?(?:=|<|>|<=|>=)\\s?(\\w+\\.?\\w*)`;

const REGEXP_LEFTHAND_COMPARISON_OPERATOR = (token: string) =>
  `(\\w+\\.?\\w*)\\s?(?:=|<|>|<=|>=)\\s?(?:${REGEXP_TOKEN_WITH_OPTIONAL_TYPECAST(
    token,
  )})(?:[^\\w]|$)`;

const REGEXP_TOKEN_AS_FUNCTION_INPUT = (token: string) =>
  `\\s+(\\w+\\((?:\\s*[:\\w#]+,)*(?:\\s*${REGEXP_TOKEN_WITH_OPTIONAL_TYPECAST(
    token,
  )},?)(?:\\s*[:\\w#]+,?)*\\s?\\))`;

const REGEXP_FUNCTION_CALL_WITHOUT_TOKEN_INPUT = `\\s+(\\w+\\([\\w,\\s\\:\\#\\.\\(\\)]+\\))`;
const REGEXP_LEFTHAND_FUNCTION_OUTPUT_COMPARISON_OPERATOR = (token: string) =>
  `${REGEXP_FUNCTION_CALL_WITHOUT_TOKEN_INPUT}\\s?(?:=|<|>|<=|>=)\\s?(?:${REGEXP_TOKEN_WITH_OPTIONAL_TYPECAST(
    token,
  )})(?:[^\\w]|$)`;

export const extractTypeDefinitionFromInputVariableSql = ({
  token,
  sql,
}: {
  token: string;
  sql: string;
}): TypeDefinitionOfQueryInputVariable => {
  // define regex for token w/ optional type casting
  const tokenWithOptionalTypecastingRegexString =
    REGEXP_TOKEN_WITH_OPTIONAL_TYPECAST(token);

  // check if this token matches the "resource.column =,<=,>= :token" pattern; if so, then the input type = the resource.column type
  const [
    _, // tslint:disable-line no-unused
    leftEqualsTableReferencePath, // check if "resource.column (=|<=|>=|<|>) :token"
  ] =
    new RegExp(REGEXP_LEFTHAND_COMPARISON_OPERATOR(token), 'g').exec(sql) ?? [];
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
      plural: false,
    });
  }

  // check if this token matches the ":token =,<=,>= resource.column" pattern; same as above, but flipped
  const [
    __, // tslint:disable-line no-unused
    rightEqualsTableReferencePath, // check if ":token (=|<=|>=|<|>) resource.column"
  ] =
    new RegExp(REGEXP_RIGHTHAND_COMPARISON_OPERATOR(token), 'g').exec(sql) ??
    [];
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
      plural: false,
    });
  }

  // check if this token matches the "resource.column ANY (:token)" pattern; if so, then the input type = an array of the resource.column type
  const [
    ___, // tslint:disable-line no-unused
    leftEqualsArrayTableReferencePath, // check if "resource.column = :token" or "resource.column <= :token" or "resource.column <= :token"
  ] =
    new RegExp(
      `(\\w+\\.?\\w*)\\s?=?\\s?(?:any|ANY|in|IN)\\s?\\(\\s?(?:${tokenWithOptionalTypecastingRegexString})\\s?\\)(?:[^\\w]|$)`,
      'g',
    ).exec(sql) ?? [];
  if (leftEqualsArrayTableReferencePath) {
    throwErrorIfTableReferencePathImpliesTable({
      referencePath: leftEqualsArrayTableReferencePath,
    });
    return new TypeDefinitionOfQueryInputVariable({
      name: token.replace(':', ''),
      type: new TypeDefinitionReference({
        tableReferencePath: leftEqualsArrayTableReferencePath,
        functionReferencePath: null,
      }),
      plural: true,
    });
  }

  // check if this token is evaluated against a function output. If so, its equivalent to its function output
  const [
    _____,
    leftEqualsFunctionOutputReferenceMatch, // check if "functionName(...args) =|>|<|>=|<= :token"
  ] =
    new RegExp(REGEXP_LEFTHAND_FUNCTION_OUTPUT_COMPARISON_OPERATOR(token)).exec(
      sql,
    ) ?? [];
  if (leftEqualsFunctionOutputReferenceMatch) {
    // grab the function name
    const functionName = leftEqualsFunctionOutputReferenceMatch
      .split('(')[0]!
      .trim();

    // return the function path
    return new TypeDefinitionOfQueryInputVariable({
      name: token.replace(':', ''),
      type: new TypeDefinitionReference({
        functionReferencePath: `${functionName}.output`,
        tableReferencePath: null,
      }),
      plural: false,
    });
  }

  // check if this token is used in a function. If so, its equivalent to whatever is at that index of the function params
  const [
    ____,
    tokenInsideFunctionMatch, // check if "functionName(arg1?, :token, arg2?)"
  ] = new RegExp(REGEXP_TOKEN_AS_FUNCTION_INPUT(token)).exec(sql) ?? [];
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
      plural: false,
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
      plural: false,
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
      plural: false,
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
      plural: false,
    });
  }

  // if none of the above worked, throw an error. one should work...
  throw new Error(
    `could not extract type definition for input variable '${token}'`,
  );
};
