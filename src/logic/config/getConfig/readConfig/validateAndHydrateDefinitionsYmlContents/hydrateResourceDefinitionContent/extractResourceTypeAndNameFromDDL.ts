import { ResourceType } from '../../../../../../model';

// TODO: generalize to other databases with adapter pattern
const MYSQL_TYPE_NAME_CAPTURE_REGEX = /(?:CREATE|create)(?:\s+)(?:DEFINER=`[a-zA-Z0-9_]+`@`[a-zA-Z0-9_%]+`)?(?:\s*)(PROCEDURE|procedure|FUNCTION|function|TABLE|table|VIEW|view)(?:\s+)(?:`?)(\w+)(?:`?)(?:\s*)\(/g; // captures type and name from create statements of resources

const regexTypeMatchToTypeEnum = {
  PROCEDURE: ResourceType.PROCEDURE,
  procedure: ResourceType.PROCEDURE,
  FUNCTION: ResourceType.FUNCTION,
  function: ResourceType.FUNCTION,
  TABLE: ResourceType.TABLE,
  table: ResourceType.TABLE,
  VIEW: ResourceType.VIEW,
  view: ResourceType.VIEW,
};
type RegexTypeMatchOption = 'PROCEDURE' | 'procedure' | 'FUNCTION' | 'function' | 'TABLE' | 'table' | 'VIEW' | 'view';
export const extractResourceTypeAndNameFromDDL = ({ ddl }: { ddl: string }) => {
  // get name and type with regex
  const captureRegex = new RegExp(MYSQL_TYPE_NAME_CAPTURE_REGEX, 'gm'); // note, we reinstantiate so as to not share regex object (i.e., state) between calls
  const extractionMatches = captureRegex.exec(ddl);

  // if no matches, throw error
  if (!extractionMatches) throw new Error('resource creation type and name could not be found in ddl');

  // format the type
  const regexTypeMatch = extractionMatches[1] as RegexTypeMatchOption; // the first capture group is the type match
  const type = regexTypeMatchToTypeEnum[regexTypeMatch];

  // extract the name
  const name = extractionMatches[2];

  // return type and name
  return {
    type,
    name,
  };
};
