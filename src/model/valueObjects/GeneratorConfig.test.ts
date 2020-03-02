import { QueryDefinition } from './QueryDefinition';
import { ResourceDefinition, ResourceType } from './ResourceDefinition';
import { GeneratorConfig } from './GeneratorConfig';
import { DatabaseLanguage } from '../constants';

describe('GeneratorConfig', () => {
  const changeDefinition = new QueryDefinition({
    name: '__NAME__',
    sql: '__SQL__',
  });
  const resourceDefinition = new ResourceDefinition({
    type: ResourceType.FUNCTION,
    sql: '__SQL__',
    name: '__NAME__',
  });
  it('should initialize for valid inputs', () => {
    const config = new GeneratorConfig({
      language: DatabaseLanguage.MYSQL,
      dialect: '5.7',
      definitions: [changeDefinition, resourceDefinition],
    });
    expect(config).toMatchObject({
      language: DatabaseLanguage.MYSQL,
      dialect: '5.7',
      definitions: [changeDefinition, resourceDefinition],
    });
  });
  it('should throw error on invalid input', () => {
    try {
      new GeneratorConfig({
        languagzzze: 'mysql',
        dialect: '5.7',
        definitions: [changeDefinition],
      } as any); // tslint:disable-line no-unused-expression
    } catch (error) {
      expect(error.constructor.name).toEqual('ValidationError');
    }
  });
});
