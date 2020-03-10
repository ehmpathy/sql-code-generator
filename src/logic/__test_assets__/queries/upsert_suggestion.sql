
SELECT upsert_suggestion(
  :suggestionSource,
  :externalId,
  :suggestedIdeaId,
  :status,
  :result
) as id;

