import { SqlSubqueryReference } from '../../../../../model/valueObjects/SqlSubqueryReference';

export const getTokenForSqlSubqueryReference = ({ reference }: { reference: SqlSubqueryReference }) =>
  `__SSQ:${reference.id}__`;
