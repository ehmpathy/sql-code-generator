import { defineTypescriptTypeFromTableReference } from './defineTypescriptTypeFromTableReference';
import { TypeDefinitionReference } from '../../../../domain/objects/TypeDefinitionReference';
import {
  DataType,
  TypeDefinitionOfQueryTableReference,
  TypeDefinitionOfResourceFunction,
  TypeDefinitionOfResourceTable,
  TypeDefinitionOfResourceView,
} from '../../../../domain';

describe('defineTypescriptTypeFromTableReference', () => {
  it('should correctly define the typescript type reference for table', () => {
    const code = defineTypescriptTypeFromTableReference({
      reference: new TypeDefinitionReference({
        tableReferencePath: 'i.url',
        functionReferencePath: null,
      }),
      queryTableReferences: [
        new TypeDefinitionOfQueryTableReference({
          tableName: 'image',
          alias: 'i',
          functionName: null,
        }),
      ],
      typeDefinitions: [
        new TypeDefinitionOfResourceTable({ name: 'image', columns: [] }),
      ],
    });
    expect(code).toEqual("SqlTableImage['url']");
  });
  it('should correctly define the typescript type reference for view', () => {
    const code = defineTypescriptTypeFromTableReference({
      reference: new TypeDefinitionReference({
        tableReferencePath: 'i.url',
        functionReferencePath: null,
      }),
      queryTableReferences: [
        new TypeDefinitionOfQueryTableReference({
          tableName: 'view_image_current',
          alias: 'i',
          functionName: null,
        }),
      ],
      typeDefinitions: [
        new TypeDefinitionOfResourceView({
          name: 'view_image_current',
          tableReferences: [],
          selectExpressions: [],
        }),
      ],
    });
    expect(code).toEqual("SqlViewViewImageCurrent['url']");
  });
  it('should correctly define the typescript type for function output', () => {
    const code = defineTypescriptTypeFromTableReference({
      reference: new TypeDefinitionReference({
        tableReferencePath: 'dgv.id',
        functionReferencePath: null,
      }),
      queryTableReferences: [
        new TypeDefinitionOfQueryTableReference({
          tableName: null,
          alias: 'dgv',
          functionName: 'upsert_image',
        }),
      ],
      typeDefinitions: [
        new TypeDefinitionOfResourceFunction({
          name: 'upsert_image',
          inputs: [], // these dont matter for this test
          output: new TypeDefinitionOfResourceTable({
            name: 'function.output',
            columns: [],
          }),
        }),
      ],
    });
    expect(code).toEqual("SqlFunctionUpsertImageOutput['id']");
  });
  it('should throw an error if the queryTableReference that this reference is talking about was not defined', () => {
    try {
      defineTypescriptTypeFromTableReference({
        reference: new TypeDefinitionReference({
          tableReferencePath: 'i.url',
          functionReferencePath: null,
        }),
        queryTableReferences: [], // since we never defined what table the alias "i" points to, we cant define the type!
        typeDefinitions: [],
      });
      throw new Error('should not reach here');
    } catch (error) {
      expect(error.message).toEqual(
        'table alias for of select expression "i.url" not found in query table references',
      );
    }
  });
  it('should throw an error if the resourceTypeDefinition that this reference is talking about was not defined', () => {
    try {
      defineTypescriptTypeFromTableReference({
        reference: new TypeDefinitionReference({
          tableReferencePath: 'i.url',
          functionReferencePath: null,
        }),
        queryTableReferences: [
          new TypeDefinitionOfQueryTableReference({
            tableName: 'image',
            alias: 'i',
            functionName: null,
          }),
        ],
        typeDefinitions: [],
      });
      throw new Error('should not reach here');
    } catch (error) {
      expect(error.message).toEqual(
        "type definition was not found for referenced table or view 'image'",
      );
    }
  });
  it('should throw an error if the resourceTypeDefinition of the referenced function is not defined', () => {
    try {
      defineTypescriptTypeFromTableReference({
        reference: new TypeDefinitionReference({
          tableReferencePath: 'dgv.id',
          functionReferencePath: null,
        }),
        queryTableReferences: [
          new TypeDefinitionOfQueryTableReference({
            tableName: null,
            alias: 'dgv',
            functionName: 'upsert_image',
          }),
        ],
        typeDefinitions: [],
      });
      throw new Error('should not reach here');
    } catch (error) {
      expect(error.message).toEqual(
        "type definition was not found for referenced function 'upsert_image'",
      );
    }
  });
  it('should throw an error if referencing a function that does not return a table as output', () => {
    try {
      defineTypescriptTypeFromTableReference({
        reference: new TypeDefinitionReference({
          tableReferencePath: 'dgv.id',
          functionReferencePath: null,
        }),
        queryTableReferences: [
          new TypeDefinitionOfQueryTableReference({
            tableName: null,
            alias: 'dgv',
            functionName: 'upsert_image',
          }),
        ],
        typeDefinitions: [
          new TypeDefinitionOfResourceFunction({
            name: 'upsert_image',
            inputs: [], // these dont matter for this test
            output: [DataType.STRING], // not a table
          }),
        ],
      });
      throw new Error('should not reach here');
    } catch (error) {
      expect(error.message).toEqual(
        "function being used as a query table reference but does not return a table. 'upsert_image' can't be used as a table reference.",
      );
    }
  });
});
