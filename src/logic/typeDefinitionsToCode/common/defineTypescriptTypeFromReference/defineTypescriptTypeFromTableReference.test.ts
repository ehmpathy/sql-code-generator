import { defineTypescriptTypeFromTableReference } from './defineTypescriptTypeFromTableReference';
import { TypeDefinitionReference } from '../../../../model/valueObjects/TypeDefinitionReference';
import { TypeDefinitionOfQueryTableReference } from '../../../../model';

describe('defineTypescriptTypeFromTableReference', () => {
  it('should be able to define type for reference pointing to table defined in queryTableReferences', () => {
    const code = defineTypescriptTypeFromTableReference({
      reference: new TypeDefinitionReference({ tableReferencePath: 'i.url', functionReferencePath: null }),
      queryTableReferences: [new TypeDefinitionOfQueryTableReference({ tableName: 'image', alias: 'i' })],
    });
    expect(code).toEqual("SqlTableImage['url']");
  });
  it('should throw an error if the queryTableReference that this reference is talking about was not defined', () => {
    try {
      defineTypescriptTypeFromTableReference({
        reference: new TypeDefinitionReference({ tableReferencePath: 'i.url', functionReferencePath: null }),
        queryTableReferences: [], // since we never defined what table the alias "i" points to, we cant define the type!
      });
      throw new Error('should not reach here');
    } catch (error) {
      expect(error.message).toEqual('table alias for of select expression "i.url" not found in query table references');
    }
  });
});
