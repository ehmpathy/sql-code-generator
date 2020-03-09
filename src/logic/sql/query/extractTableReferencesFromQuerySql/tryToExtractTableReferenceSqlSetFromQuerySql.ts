import { extractTableReferenceSqlSetFromQuerySql } from './extractTableReferenceSqlSetFromQuerySql';

/**
 *  just wrap the extractTableRef... function in a try catch, that permits special error cases to be allowed
 *  - e.g., to support queries which select from a function => have no table references
 */
export const tryToExtractTableReferenceSqlSet = ({ sql }: { sql: string }) => {
  try {
    return extractTableReferenceSqlSetFromQuerySql({ sql });
  } catch (error) {
    if (error.message === 'no "from" keyword found; unexpected') return []; // if no from keyword was found, it may just be a "select function_call()" query; no table references
    throw error; // otherwise, error was unexpected
  }
};
