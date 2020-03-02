import { QueryDefinition } from './QueryDefinition';

describe('ChangeDefinition', () => {
  it('should initialize for valid inputs', () => {
    const changeDefinition = new QueryDefinition({
      name: '__NAME__',
      sql: '__SQL__',
    });
    expect(changeDefinition).toMatchObject({
      name: '__NAME__',
      sql: '__SQL__',
    });
  });
  it('should throw error on invalid input', () => {
    try {
      new QueryDefinition({
        nAme: '__NAME__',
        sql: '__SQL__',
      } as any); // tslint:disable-line no-unused-expression
    } catch (error) {
      expect(error.constructor.name).toEqual('ValidationError');
    }
  });
});
