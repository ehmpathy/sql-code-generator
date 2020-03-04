import { ResourceDefinition, ResourceType } from './ResourceDefinition';

describe('ChangeDefinition', () => {
  it('should initialize for valid inputs', () => {
    const changeDefinition = new ResourceDefinition({
      type: ResourceType.TABLE,
      name: 'notification',
      sql: '__SQL__',
    });
    expect(changeDefinition).toMatchObject({
      type: ResourceType.TABLE,
      name: 'notification',
      sql: '__SQL__',
    });
  });
  it('should throw error on invalid input', () => {
    try {
      new ResourceDefinition({
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
