import { defineTypescriptTypeFromTableReference } from './defineTypescriptTypeFromTableReference';
import { TypeDefinitionReference } from '../../../../model/valueObjects/TypeDefinitionReference';
import {
  TypeDefinitionOfQueryTableReference,
  TypeDefinitionOfResourceTable,
  TypeDefinitionOfResourceView,
} from '../../../../model';

describe('defineTypescriptTypeFromTableReference', () => {
  it('should correctly define the typescript type reference for table', () => {
    const code = defineTypescriptTypeFromTableReference({
      reference: new TypeDefinitionReference({ tableReferencePath: 'i.url', functionReferencePath: null }),
      queryTableReferences: [new TypeDefinitionOfQueryTableReference({ tableName: 'image', alias: 'i' })],
      typeDefinitions: [new TypeDefinitionOfResourceTable({ name: 'image', columns: [] })],
    });
    expect(code).toEqual("SqlTableImage['url']");
  });
  it('should correctly define the typescript type reference for view', () => {
    const code = defineTypescriptTypeFromTableReference({
      reference: new TypeDefinitionReference({ tableReferencePath: 'i.url', functionReferencePath: null }),
      queryTableReferences: [new TypeDefinitionOfQueryTableReference({ tableName: 'view_image_current', alias: 'i' })],
      typeDefinitions: [
        new TypeDefinitionOfResourceView({ name: 'view_image_current', tableReferences: [], selectExpressions: [] }),
      ],
    });
    expect(code).toEqual("SqlViewViewImageCurrent['url']");
  });
  it('should throw an error if the queryTableReference that this reference is talking about was not defined', () => {
    try {
      defineTypescriptTypeFromTableReference({
        reference: new TypeDefinitionReference({ tableReferencePath: 'i.url', functionReferencePath: null }),
        queryTableReferences: [], // since we never defined what table the alias "i" points to, we cant define the type!
        typeDefinitions: [],
      });
      throw new Error('should not reach here');
    } catch (error) {
      expect(error.message).toEqual('table alias for of select expression "i.url" not found in query table references');
    }
  });
  it('should throw an error if the resourceTypeDefinition that this reference is talking about was not defined', () => {
    try {
      defineTypescriptTypeFromTableReference({
        reference: new TypeDefinitionReference({ tableReferencePath: 'i.url', functionReferencePath: null }),
        queryTableReferences: [new TypeDefinitionOfQueryTableReference({ tableName: 'image', alias: 'i' })],
        typeDefinitions: [],
      });
      throw new Error('should not reach here');
    } catch (error) {
      expect(error.message).toEqual("type definition was not found for referenced table or view 'image'");
    }
  });
});
