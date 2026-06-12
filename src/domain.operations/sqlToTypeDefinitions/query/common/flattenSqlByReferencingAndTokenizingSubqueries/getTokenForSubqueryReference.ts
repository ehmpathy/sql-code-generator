import type { SqlSubqueryReference } from '@src/domain.objects/SqlSubqueryReference';

export const getTokenForSqlSubqueryReference = ({
  reference,
}: {
  reference: SqlSubqueryReference;
}) => `__SSQ:${reference.id}__`;
