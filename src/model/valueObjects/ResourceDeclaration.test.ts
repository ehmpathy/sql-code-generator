import { ResourceDeclaration, ResourceType } from './ResourceDeclaration';

describe('ResourceDeclaration', () => {
  it('should initialize for valid inputs', () => {
    const dec = new ResourceDeclaration({
      type: ResourceType.TABLE,
      name: 'notification',
      path: '__FILE_PATH__',
      sql: '__SQL__',
    });
    expect(dec).toMatchObject({
      type: ResourceType.TABLE,
      name: 'notification',
      path: '__FILE_PATH__',
      sql: '__SQL__',
    });
  });
  it('should throw error on invalid input', () => {
    try {
      new ResourceDeclaration({
        type: ResourceType.TABLE,
        izd: 'table::notification',
        path: '__PATH__',
        sql: '__SQL__',
      } as any); // tslint:disable-line no-unused-expression
    } catch (error) {
      expect(error.constructor.name).toEqual('ValidationError');
    }
  });
});
