import uuid from 'uuid';

// tslint:disable-line no-unused
// import { dbConnection } from '../../../utils/database';
// import { sqlQueryFindSuggestionById } from '../generated/queries';
// import { fromDatabaseObject } from './fromDatabaseObject';

export const sql = `
  -- query_name = find_suggestion_by_id
  select
    s.id,
    s.uuid,
    s.suggestion_source,
    s.external_id,
    s.suggested_idea_id,
    s.status,
    s.result,
    s.resultant_curated_idea_id
  from view_suggestion_current s
  where s.id = :id
`.trim();

export const findById = ({ id }: { id: number }) => {
  // const suggestions = sqlQueryFindSuggestionById({ dbExecute: dbConnection.execute, input: { id } });
  // if (suggestions.length > 0) throw new Error('should only be one');
  // return fromDatabaseObject({ databaseObject: suggestions[0] });
  console.log(id); // tslint:disable-line no-console
};
