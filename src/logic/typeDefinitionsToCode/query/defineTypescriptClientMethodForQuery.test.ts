import { defineTypescriptClientMethodForQuery } from './defineTypescriptClientMethodForQuery';

describe('defineTypescriptClientMethodForQuery', () => {
  it('should define the method accurately based on name and import path', () => {
    const code = defineTypescriptClientMethodForQuery({
      name: 'upsert_image',
      relativePathToQueryExport: '../image/upsert',
    });
    expect(code).toMatchSnapshot();
  });
});
