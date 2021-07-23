import {
  TypeDefinitionOfResourceFunction,
  TypeDefinitionOfResourceInput,
  DataType,
  DatabaseLanguage,
} from '../../../../../model';

const ANY_TRUTHY = [DataType.STRING, DataType.NUMBER, DataType.DATE, DataType.BUFFER, DataType.JSON];
const ANY = [...ANY_TRUTHY, DataType.NULL, DataType.UNDEFINED];

const ONE_OR_MORE_STRINGS = [
  // NOTE: because we can't express "infinitely repeating" as an input, we'll just declare "up to 5". this will only be relevant for when someone is extracting the typedef of an input variable, so hopefully they wont need more than 10
  new TypeDefinitionOfResourceInput({
    name: 'str_0',
    type: [DataType.STRING, DataType.UNDEFINED],
  }),
  new TypeDefinitionOfResourceInput({
    name: 'str_1',
    type: [DataType.STRING, DataType.UNDEFINED],
  }),
  new TypeDefinitionOfResourceInput({
    name: 'str_2',
    type: [DataType.STRING, DataType.UNDEFINED],
  }),
  new TypeDefinitionOfResourceInput({
    name: 'str_3',
    type: [DataType.STRING, DataType.UNDEFINED],
  }),
  new TypeDefinitionOfResourceInput({
    name: 'str_4',
    type: [DataType.STRING, DataType.UNDEFINED],
  }),
  new TypeDefinitionOfResourceInput({
    name: 'str_5',
    type: [DataType.STRING, DataType.UNDEFINED],
  }),
];
const ONE_OR_MORE_VALUES = [
  // NOTE: because we can't express "infinitely repeating" as an input, we'll just declare "up to 5". this will only be relevant for when someone is extracting the typedef of an input variable, so hopefully they wont need more than 10
  new TypeDefinitionOfResourceInput({
    name: 'value_0',
    type: ANY,
  }),
  new TypeDefinitionOfResourceInput({
    name: 'value_1',
    type: ANY,
  }),
  new TypeDefinitionOfResourceInput({
    name: 'value_2',
    type: ANY,
  }),
  new TypeDefinitionOfResourceInput({
    name: 'value_3',
    type: ANY,
  }),
  new TypeDefinitionOfResourceInput({
    name: 'value_4',
    type: ANY,
  }),
  new TypeDefinitionOfResourceInput({
    name: 'value_5',
    type: ANY,
  }),
];

const MYSQL_PROVIDED_FUNCTION_TYPE_DEFINITIONS: { [index: string]: TypeDefinitionOfResourceFunction } = {
  // https://dev.mysql.com/doc/refman/8.0/en/mathematical-functions.html#function_abs
  ABS: new TypeDefinitionOfResourceFunction({
    name: 'abs',
    inputs: [
      new TypeDefinitionOfResourceInput({
        name: 'x',
        type: [DataType.NUMBER],
      }),
    ],
    output: [DataType.NUMBER, DataType.NULL], // null if the input is null
  }),

  // https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_avg
  AVG: new TypeDefinitionOfResourceFunction({
    name: 'avg',
    inputs: [
      new TypeDefinitionOfResourceInput({
        name: 'expr',
        type: [DataType.STRING],
      }),
    ],
    output: [DataType.NUMBER, DataType.NULL], // null because if one of the inputs is null or there are no rows its grouping over
  }),

  // https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_coalesce
  COALESCE: new TypeDefinitionOfResourceFunction({
    name: 'coalesce',
    inputs: ONE_OR_MORE_VALUES,
    output: [DataType.STRING, DataType.NUMBER, DataType.NULL], // null if none of the inputs are not null
  }),

  // https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_concat
  CONCAT: new TypeDefinitionOfResourceFunction({
    name: 'concat',
    inputs: ONE_OR_MORE_STRINGS,
    output: [DataType.STRING, DataType.NULL], // null if one of the inputs is null
  }),

  // https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_concat
  CONCAT_WS: new TypeDefinitionOfResourceFunction({
    name: 'concat_ws',
    inputs: [
      new TypeDefinitionOfResourceInput({
        name: 'separator',
        type: [DataType.STRING],
      }),
      ...ONE_OR_MORE_STRINGS,
    ],
    output: [DataType.STRING, DataType.NULL], // null if one of the inputs is null
  }),

  // https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_count
  COUNT: new TypeDefinitionOfResourceFunction({
    name: 'count',
    inputs: [
      new TypeDefinitionOfResourceInput({
        name: 'expr',
        type: [DataType.STRING],
      }),
    ],
    output: [DataType.NUMBER, DataType.NULL], // null because if one of the inputs is null or there are no rows its grouping over
  }),

  // https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_group-concat
  GROUP_CONCAT: new TypeDefinitionOfResourceFunction({
    name: 'group_concat',
    inputs: [
      new TypeDefinitionOfResourceInput({
        name: 'expr',
        type: [DataType.STRING],
      }),
    ],
    output: [DataType.STRING, DataType.NULL], // null because if one of the inputs is null or there are no rows its grouping over
  }),

  // https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_left
  LEFT: new TypeDefinitionOfResourceFunction({
    name: 'left',
    inputs: [
      new TypeDefinitionOfResourceInput({
        name: 'str',
        type: [DataType.STRING],
      }),
      new TypeDefinitionOfResourceInput({
        name: 'len',
        type: [DataType.NUMBER],
      }),
    ],
    output: [DataType.STRING, DataType.NULL], // null if one of the inputs is null
  }),

  // https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_max
  MAX: new TypeDefinitionOfResourceFunction({
    name: 'max',
    inputs: [
      new TypeDefinitionOfResourceInput({
        name: 'expr',
        type: [DataType.STRING],
      }),
    ],
    output: [DataType.NUMBER, DataType.NULL], // null because if one of the inputs is null or there are no rows its grouping over
  }),

  // https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_min
  MIN: new TypeDefinitionOfResourceFunction({
    name: 'min',
    inputs: [
      new TypeDefinitionOfResourceInput({
        name: 'expr',
        type: [DataType.STRING],
      }),
    ],
    output: [DataType.NUMBER, DataType.NULL], // null because if one of the inputs is null or there are no rows its grouping over
  }),

  // https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_right
  RIGHT: new TypeDefinitionOfResourceFunction({
    name: 'right',
    inputs: [
      new TypeDefinitionOfResourceInput({
        name: 'str',
        type: [DataType.STRING],
      }),
      new TypeDefinitionOfResourceInput({
        name: 'len',
        type: [DataType.NUMBER],
      }),
    ],
    output: [DataType.STRING, DataType.NULL], // null if one of the inputs is null
  }),
};

const SIMPLE_MATH_INPUT_OUTPUT = {
  inputs: [
    new TypeDefinitionOfResourceInput({
      name: 'x',
      type: [DataType.NUMBER],
    }),
  ],
  output: [DataType.NUMBER, DataType.NULL], // null if one of the inputs is null
};
const POSTGRES_PROVIDED_FUNCTION_TYPE_DEFINITIONS: { [index: string]: TypeDefinitionOfResourceFunction } = {
  // https://www.postgresql.org/docs/10/functions-math.html
  ABS: new TypeDefinitionOfResourceFunction({
    name: 'abs',
    ...SIMPLE_MATH_INPUT_OUTPUT,
  }),
  CEIL: new TypeDefinitionOfResourceFunction({
    name: 'ceil',
    ...SIMPLE_MATH_INPUT_OUTPUT,
  }),
  CEILING: new TypeDefinitionOfResourceFunction({
    name: 'floor',
    ...SIMPLE_MATH_INPUT_OUTPUT,
  }),
  FLOOR: new TypeDefinitionOfResourceFunction({
    name: 'floor',
    ...SIMPLE_MATH_INPUT_OUTPUT,
  }),

  // https://www.postgresql.org/docs/10/functions-string.html
  CONCAT: new TypeDefinitionOfResourceFunction({
    name: 'concat',
    inputs: ONE_OR_MORE_STRINGS,
    output: [DataType.STRING, DataType.NULL], // null if one of the inputs is null
  }),
  CONCAT_WS: new TypeDefinitionOfResourceFunction({
    name: 'concat_ws',
    inputs: [
      new TypeDefinitionOfResourceInput({
        name: 'separator',
        type: [DataType.STRING],
      }),
      ...ONE_OR_MORE_STRINGS,
    ],
    output: [DataType.STRING, DataType.NULL], // null if one of the inputs is null
  }),
  LEFT: new TypeDefinitionOfResourceFunction({
    name: 'left',
    inputs: [
      new TypeDefinitionOfResourceInput({
        name: 'str',
        type: [DataType.STRING],
      }),
      new TypeDefinitionOfResourceInput({
        name: 'len',
        type: [DataType.NUMBER],
      }),
    ],
    output: [DataType.STRING, DataType.NULL], // null if one of the inputs is null
  }),
  LENGTH: new TypeDefinitionOfResourceFunction({
    name: 'length',
    inputs: [
      new TypeDefinitionOfResourceInput({
        name: 'str',
        type: [DataType.STRING],
      }),
    ],
    output: [DataType.NUMBER, DataType.NULL], // null if one of the inputs is null
  }),
  RIGHT: new TypeDefinitionOfResourceFunction({
    name: 'right',
    inputs: [
      new TypeDefinitionOfResourceInput({
        name: 'str',
        type: [DataType.STRING],
      }),
      new TypeDefinitionOfResourceInput({
        name: 'len',
        type: [DataType.NUMBER],
      }),
    ],
    output: [DataType.STRING, DataType.NULL], // null if one of the inputs is null
  }),

  // https://www.postgresql.org/docs/10/functions-array.html
  ARRAY_TO_STRING: new TypeDefinitionOfResourceFunction({
    name: 'array_to_string',
    inputs: [
      new TypeDefinitionOfResourceInput({
        name: 'any_array',
        type: [DataType.STRING_ARRAY, DataType.NUMBER_ARRAY],
      }),
      new TypeDefinitionOfResourceInput({
        name: 'delimiter',
        type: [DataType.STRING],
      }),
      new TypeDefinitionOfResourceInput({
        name: 'null_string',
        type: [DataType.STRING, DataType.UNDEFINED], // optional
      }),
    ],
    output: [DataType.STRING, DataType.NULL], // null if one of the inputs is null
  }),
  STRING_TO_ARRAY: new TypeDefinitionOfResourceFunction({
    name: 'string_to_array',
    inputs: [
      new TypeDefinitionOfResourceInput({
        name: 'string',
        type: [DataType.STRING_ARRAY, DataType.NUMBER_ARRAY],
      }),
      new TypeDefinitionOfResourceInput({
        name: 'delimiter',
        type: [DataType.STRING],
      }),
      new TypeDefinitionOfResourceInput({
        name: 'null_string',
        type: [DataType.STRING, DataType.UNDEFINED], // optional
      }),
    ],
    output: [DataType.STRING_ARRAY, DataType.NULL], // null if one of the inputs is null
  }),
  UNNEST: new TypeDefinitionOfResourceFunction({
    name: 'unnest',
    inputs: [
      new TypeDefinitionOfResourceInput({
        name: 'array',
        type: [DataType.STRING_ARRAY, DataType.NUMBER_ARRAY],
      }),
    ],
    output: ANY, // not to be used for actually outputting values, this function is mostly used for inputs
  }),

  // https://www.postgresql.org/docs/10/functions-aggregate.html
  ARRAY_AGG: new TypeDefinitionOfResourceFunction({
    name: 'array_agg',
    inputs: [
      new TypeDefinitionOfResourceInput({
        name: 'any_column',
        type: [DataType.STRING, DataType.NUMBER],
      }),
    ],
    output: [DataType.STRING_ARRAY, DataType.NUMBER_ARRAY, DataType.NULL], // null if one of the inputs is null
  }),
  JSON_AGG: new TypeDefinitionOfResourceFunction({
    name: 'array_agg',
    inputs: [
      new TypeDefinitionOfResourceInput({
        name: 'any_column',
        type: ANY_TRUTHY,
      }),
    ],
    output: [DataType.JSON_ARRAY, DataType.NULL], // null if one of the inputs is null
  }),
  AVG: new TypeDefinitionOfResourceFunction({
    name: 'avg',
    inputs: [
      new TypeDefinitionOfResourceInput({
        name: 'any_column',
        type: [DataType.NUMBER],
      }),
    ],
    output: [DataType.NUMBER, DataType.NULL], // null if one of the inputs is null
  }),
  COUNT: new TypeDefinitionOfResourceFunction({
    name: 'count',
    inputs: [
      new TypeDefinitionOfResourceInput({
        name: 'expr',
        type: [DataType.STRING],
      }),
    ],
    output: [DataType.NUMBER, DataType.NULL], // null if one of the inputs is null
  }),
  MAX: new TypeDefinitionOfResourceFunction({
    name: 'max',
    inputs: [
      new TypeDefinitionOfResourceInput({
        name: 'expr',
        type: [DataType.STRING],
      }),
    ],
    output: [DataType.NUMBER, DataType.NULL], // null because if one of the inputs is null or there are no rows its grouping over
  }),
  MIN: new TypeDefinitionOfResourceFunction({
    name: 'min',
    inputs: [
      new TypeDefinitionOfResourceInput({
        name: 'expr',
        type: [DataType.STRING],
      }),
    ],
    output: [DataType.NUMBER, DataType.NULL], // null because if one of the inputs is null or there are no rows its grouping over
  }),
  SUM: new TypeDefinitionOfResourceFunction({
    name: 'sum',
    inputs: [
      new TypeDefinitionOfResourceInput({
        name: 'expr',
        type: [DataType.STRING],
      }),
    ],
    output: [DataType.NUMBER, DataType.NULL], // null because if one of the inputs is null or there are no rows its grouping over
  }),

  // https://www.postgresql.org/docs/10/functions-json.html
  JSON_BUILD_OBJECT: new TypeDefinitionOfResourceFunction({
    name: 'json_build_object',
    inputs: [
      new TypeDefinitionOfResourceInput({
        name: 'expr',
        type: [DataType.STRING],
      }),
    ],
    output: [DataType.JSON, DataType.NULL], // null if input is null
  }),
};

export const DATABASE_PROVIDED_FUNCTION_TYPE_DEFINITIONS: {
  [key in DatabaseLanguage]: { [index: string]: TypeDefinitionOfResourceFunction };
} = {
  [DatabaseLanguage.MYSQL]: MYSQL_PROVIDED_FUNCTION_TYPE_DEFINITIONS,
  [DatabaseLanguage.POSTGRES]: POSTGRES_PROVIDED_FUNCTION_TYPE_DEFINITIONS,
};
