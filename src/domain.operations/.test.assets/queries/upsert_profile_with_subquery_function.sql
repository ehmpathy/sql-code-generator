  -- query_name = upsert_provider_profile
  SELECT upsert_provider_profile(
    (SELECT get_provider_id_by_uuid(:providerUuid)),
    :bannerImageUuid,
    :pictureImageUuid,
    :introduction
  ) as id;
