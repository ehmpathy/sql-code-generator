  -- query_name = upsert_provider_profile
  SELECT upsert_provider_profile(
    (SELECT p.id FROM view_provider_current p WHERE p.uuid = :serviceProviderUuid),
    :bannerImageUuid,
    :pictureImageUuid,
    :introduction
  ) as id;
