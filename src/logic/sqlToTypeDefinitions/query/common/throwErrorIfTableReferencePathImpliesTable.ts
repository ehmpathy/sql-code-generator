/**
 * instead of "select id from user" we're asking the user to "select user.id from user" or "select u.id from user u"
 *
 * rationale:
 * - this makes it so that we don't have to try and figure out the implicit reference
 * - this makes it so that when a user does join to another table, they don't have to add the explicit references after the fact (i.e., makes it easier to extend their queries)
 */
export const throwErrorIfTableReferencePathImpliesTable = ({ referencePath }: { referencePath: string }) => {
  if (referencePath.split('.').length !== 2) {
    throw new Error(
      `table reference of "${referencePath}" does not have the table alias explicitly defined, violating best practice`,
    );
  }
};
