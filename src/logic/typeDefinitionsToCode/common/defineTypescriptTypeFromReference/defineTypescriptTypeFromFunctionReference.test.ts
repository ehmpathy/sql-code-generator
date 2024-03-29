import { TypeDefinitionReference } from '../../../../domain/objects/TypeDefinitionReference';
import { defineTypescriptTypeFromFunctionReference } from './defineTypescriptTypeFromFunctionReference';

describe('defineTypescriptTypeFromFunctionReference', () => {
  it('should be able to define type referencing a function input', () => {
    const code = defineTypescriptTypeFromFunctionReference({
      reference: new TypeDefinitionReference({
        tableReferencePath: null,
        functionReferencePath: 'upsert_user.input.2',
      }),
    });
    expect(code).toEqual("SqlFunctionUpsertUserInput['2']");
  });
  it('should be able to define type referencing a function output', () => {
    const code = defineTypescriptTypeFromFunctionReference({
      reference: new TypeDefinitionReference({
        tableReferencePath: null,
        functionReferencePath: 'upsert_user.output',
      }),
    });
    expect(code).toEqual('SqlFunctionUpsertUserOutput');
  });
});
