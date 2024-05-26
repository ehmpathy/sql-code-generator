import { DataType } from '../../../../domain';
import { TypeDefinitionOfQueryInputVariable } from '../../../../domain/objects/TypeDefinitionOfQueryInputVariable';
import { TypeDefinitionReference } from '../../../../domain/objects/TypeDefinitionReference';
import { extractTypeDefinitionFromInputVariableSql } from './extractTypeDefinitionFromInputVariableSql';

describe('extractTypeDefinitionFromInputVariableSql', () => {
  const examples = [
    {
      token: ':id',
      sql: `
select i.url
from image i
where i.id = :id
      `.trim(),
      def: new TypeDefinitionOfQueryInputVariable({
        name: 'id',
        type: new TypeDefinitionReference({
          tableReferencePath: 'i.id',
          functionReferencePath: null,
        }),
        plural: false,
      }),
    },
    {
      token: ':id',
      sql: `
select i.url
from image i
where i.id=:id;
      `.trim(),
      def: new TypeDefinitionOfQueryInputVariable({
        name: 'id',
        type: new TypeDefinitionReference({
          tableReferencePath: 'i.id',
          functionReferencePath: null,
        }),
        plural: false,
      }),
    },
    {
      token: ':id',
      sql: `
select i.url
from image i
where :id = i.id;
      `.trim(),
      def: new TypeDefinitionOfQueryInputVariable({
        name: 'id',
        type: new TypeDefinitionReference({
          tableReferencePath: 'i.id',
          functionReferencePath: null,
        }),
        plural: false,
      }),
    },
    {
      token: ':id',
      sql: `
select i.url
from image i
where :id=i.id
      `.trim(),
      def: new TypeDefinitionOfQueryInputVariable({
        name: 'id',
        type: new TypeDefinitionReference({
          tableReferencePath: 'i.id',
          functionReferencePath: null,
        }),
        plural: false,
      }),
    },
    {
      token: ':externalId',
      sql: `
select idea.title, idea.description
from idea
where 1=1
  and idea.external_id = :externalId
  and idea.data_source = :dataSource;
      `.trim(),
      def: new TypeDefinitionOfQueryInputVariable({
        name: 'externalId',
        type: new TypeDefinitionReference({
          tableReferencePath: 'idea.external_id',
          functionReferencePath: null,
        }),
        plural: false,
      }),
    },
    {
      token: ':dataSource',
      sql: `
select idea.title, idea.description
from idea
where 1=1
  and idea.external_id = :externalId
  and idea.data_source IN (:dataSource);
      `.trim(),
      def: new TypeDefinitionOfQueryInputVariable({
        name: 'dataSource',
        type: new TypeDefinitionReference({
          tableReferencePath: 'idea.data_source',
          functionReferencePath: null,
        }),
        plural: true,
      }),
    },
    {
      token: ':dataSource',
      sql: `
select idea.title, idea.description
from idea
where 1=1
  and idea.external_id = :externalId
  and idea.data_source = ANY (:dataSource);
      `.trim(),
      def: new TypeDefinitionOfQueryInputVariable({
        name: 'dataSource',
        type: new TypeDefinitionReference({
          tableReferencePath: 'idea.data_source',
          functionReferencePath: null,
        }),
        plural: true,
      }),
    },
    {
      token: ':externalId',
      sql: `
SELECT upsert_suggestion(
  :suggestionSource,
  :externalId,
  :suggestedIdeaId,
  :status,
  :result
) as id;
      `.trim(),
      def: new TypeDefinitionOfQueryInputVariable({
        name: 'externalId',
        type: new TypeDefinitionReference({
          tableReferencePath: null,
          functionReferencePath: 'upsert_suggestion.input.1', // second arg of function
        }),
        plural: false,
      }),
    },
    {
      token: ':name',
      sql: `
SELECT
  suggestion.id,
  suggestion.uuid,
  suggestion.suggested_idea_id
FROM suggestions s
WHERE 1=1
  AND s.suggestion_source_id = get_id_from_suggestion_source_name(:name)
  AND s.created_at > '2020-01-01 05:55:55';
      `.trim(),
      def: new TypeDefinitionOfQueryInputVariable({
        name: 'name',
        type: new TypeDefinitionReference({
          tableReferencePath: null,
          functionReferencePath: 'get_id_from_suggestion_source_name.input.0', // first arg of function
        }),
        plural: false,
      }),
    },
    {
      token: ':limit',
      sql: `
SELECT
  suggestion.id,
  suggestion.uuid
FROM suggestions s
WHERE 1=1
  AND s.created_at > '2020-01-01 05:55:55'
LIMIT :limit
      `.trim(),
      def: new TypeDefinitionOfQueryInputVariable({
        name: 'limit',
        type: [DataType.NUMBER],
        plural: false,
      }),
    },
    {
      token: ':limit',
      sql: `
SELECT
  suggestion.id,
  suggestion.uuid
FROM suggestions s
WHERE 1=1
  AND s.status = :status
  AND s.created_at > '2020-01-01 05:55:55'
limit :limit;
      `.trim(),
      def: new TypeDefinitionOfQueryInputVariable({
        name: 'limit',
        type: [DataType.NUMBER],
        plural: false,
      }),
    },
    // TODO: support functions in functions; https://github.com/uladkasach/sql-code-generator/issues/4
  ];
  examples.forEach((example) => {
    const exampleSqlFlattened = example.sql.replace(/\s+/g, ' ');
    it(`should be able to determine types accurately for this example: "${example.token}" in "${exampleSqlFlattened}"`, () => {
      const def = extractTypeDefinitionFromInputVariableSql({
        token: example.token,
        sql: example.sql,
      });
      expect(def).toEqual(example.def);
    });
  });
  describe('should not find type if the token were looking for is not present, but is present with suffix, since that is a different token', () => {
    test('for the resource.column = :token regex, since token is at end of search', () => {
      const sql = `
  select i.url
  from image i
  where i.id = :identifier;
      `.trim();
      try {
        extractTypeDefinitionFromInputVariableSql({ token: ':id', sql });
        throw new Error('should not reach here');
      } catch (error) {
        expect(error.message).toContain(
          'could not extract type definition for input variable',
        );
      }
    });
    test('for the LIMIT :token regex, since token is at end of search', () => {
      const sql = `
select i.url
from image i
limit :limits
      `.trim();
      try {
        extractTypeDefinitionFromInputVariableSql({ token: ':limit', sql }); // -- sql has :limits, not :limit
        throw new Error('should not reach here');
      } catch (error) {
        expect(error.message).toContain(
          'could not extract type definition for input variable',
        );
      }
    });
  });
});
