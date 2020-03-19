import { grabTypeDefinitionsForReferencedDatabaseProvidedFunctions } from './grabTypeDefinitionsForReferencedDatabaseProvidedFunctions';
import {
  TypeDefinitionOfQuery,
  TypeDefinitionOfQuerySelectExpression,
  TypeDefinitionReference,
} from '../../../../../model';
import { DATABASE_PROVIDED_FUNCTION_TYPE_DEFINITIONS } from './databaseProvidedFunctionTypeDefinitions';

describe('grabTypeDefinitionsForReferencedDatabaseProvidedFunctions', () => {
  it('should grab the group_concat fn typedef if one of the queries referenced group concat', () => {
    const referencedDbProvidedFunctionDefs = grabTypeDefinitionsForReferencedDatabaseProvidedFunctions({
      definitions: [
        new TypeDefinitionOfQuery({
          name: 'example_query',
          path: '__PATH__',
          selectExpressions: [
            new TypeDefinitionOfQuerySelectExpression({
              alias: 'name',
              typeReference: new TypeDefinitionReference({
                tableReferencePath: null,
                functionReferencePath: 'group_concat.output',
              }),
            }),
          ],
          inputVariables: [],
          tableReferences: [],
        }),
      ],
    });
    expect(referencedDbProvidedFunctionDefs.length).toEqual(1);
    expect(referencedDbProvidedFunctionDefs[0]).toEqual(DATABASE_PROVIDED_FUNCTION_TYPE_DEFINITIONS.GROUP_CONCAT);
  });
});