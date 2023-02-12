import { SqlSubqueryReference } from './SqlSubqueryReference';

describe('SqlSubqueryReference', () => {
  it('should initialize for valid inputs', () => {
    const ref = new SqlSubqueryReference({
      id: '__ID__',
      sql: '__SQL__',
    });
    expect(ref).toMatchObject({
      id: '__ID__',
      sql: '__SQL__',
    });
  });
  it('should throw error on invalid input', () => {
    try {
      new SqlSubqueryReference({
        izd: 'table::notification',
        sql: '__SQL__',
      } as any); // tslint:disable-line no-unused-expression
    } catch (error) {
      expect(error.constructor.name).toEqual('ValidationError');
    }
  });
});
