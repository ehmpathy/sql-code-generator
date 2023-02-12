import { defineTypescriptQueryFunctionForQuery } from './defineTypescriptQueryFunctionForQuery';

describe('defineTypescriptQueryFunctionForQuery', () => {
  it('should define the method accurately based on name and import path', () => {
    const { code, imports } = defineTypescriptQueryFunctionForQuery({
      name: 'upsert_image',
    });
    expect(imports.generatedTypes.length).toEqual(2);
    expect(imports.generatedTypes).toEqual([
      'SqlQueryUpsertImageInput',
      'SqlQueryUpsertImageOutput',
    ]);
    expect(imports.queryNameAlias).toEqual('sqlQueryUpsertImageSql'); // i.e., import { query as sqlQueryUpsertImageSql } from '../rel/path/to/query';
    expect(code).toMatchSnapshot();
  });
});
