/*
  e.g.,: our "suggestion source" has been normalized into another table

  and we have a functino that returns the id given a string, so we dont have to lookup id before insert
*/
SELECT
  suggestion.id,
  suggestion.uuid,
  suggestion.suggested_idea_id
FROM suggestions s
WHERE 1=1
  AND s.suggestion_source_id = get_id_from_suggestion_source_name(:name)
  AND s.created_at > '2020-01-01 05:55:55';
