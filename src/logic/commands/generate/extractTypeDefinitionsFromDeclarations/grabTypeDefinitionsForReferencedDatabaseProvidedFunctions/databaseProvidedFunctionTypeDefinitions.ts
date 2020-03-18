import { TypeDefinitionOfResourceFunction, TypeDefinitionOfResourceInput, DataType } from '../../../../../model';

const ANY_TRUTHY = [DataType.STRING, DataType.NUMBER, DataType.DATE, DataType.BUFFER];
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

export const DATABASE_PROVIDED_FUNCTION_TYPE_DEFINITIONS: { [index: string]: TypeDefinitionOfResourceFunction } = {
  // https://dev.mysql.com/doc/refman/8.0/en/mathematical-functions.html#function_abs
  ABS: new TypeDefinitionOfResourceFunction({
    name: 'abs',
    inputs: [
      new TypeDefinitionOfResourceInput({
        name: 'x',
        type: [DataType.NUMBER],
      }),
    ],
    output: DataType.NUMBER,
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
    output: DataType.NUMBER,
  }),

  // https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_coalesce
  COALESCE: new TypeDefinitionOfResourceFunction({
    name: 'coalesce',
    inputs: ONE_OR_MORE_VALUES,
    output: DataType.STRING,
  }),

  // https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_concat
  CONCAT: new TypeDefinitionOfResourceFunction({
    name: 'concat',
    inputs: ONE_OR_MORE_STRINGS,
    output: DataType.STRING,
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
    output: DataType.STRING,
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
    output: DataType.NUMBER,
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
    output: DataType.STRING,
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
    output: DataType.STRING,
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
    output: DataType.NUMBER,
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
    output: DataType.NUMBER,
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
    output: DataType.STRING,
  }),
};
