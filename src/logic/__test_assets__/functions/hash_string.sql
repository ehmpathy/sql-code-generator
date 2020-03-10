CREATE FUNCTION `get_from_delimiter_split_string`(
  in_array varchar(255),
  in_delimiter char(1),
  in_index int
) RETURNS varchar(255) CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci
BEGIN
  /*
    usage:
      SELECT get_from_delimiter_split_string('1,5,3,7,4', ',',  1); -- returns '5'
      SELECT get_from_delimiter_split_string('1,5,3,7,4', ',',  10); -- returns ''
  */
  return REPLACE( -- remove the delimiters after doing the following:
    SUBSTRING( -- pick the string
      SUBSTRING_INDEX(in_array, in_delimiter, in_index + 1), -- from the string up to index+1 counts of the delimiter
      LENGTH(
        SUBSTRING_INDEX(in_array, in_delimiter, in_index) -- keeping only everything after index counts of the delimiter
      ) + 1
    ),
    in_delimiter,
    ''
  );
END
