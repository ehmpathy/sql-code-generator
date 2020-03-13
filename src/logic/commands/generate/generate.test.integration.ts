import { generate } from './generate';
import { readFile } from '../utils/fileIO';

const testAssetPaths = {
  codegenYml: `${__dirname}/../../__test_assets__/exampleProject/codegen.sql.yml`,
  generatedTypesCode: `${__dirname}/../../__test_assets__/exampleProject/src/generated/fromSql/types.ts`,
  generatedQueryFunctionsCode: `${__dirname}/../../__test_assets__/exampleProject/src/generated/fromSql/queryFunctions.ts`,
};

describe('generate', () => {
  it('should be able to read the example config provisioned in __test_assets__', async () => {
    await generate({
      configPath: testAssetPaths.codegenYml,
    });

    // expect that the types code does not have compile errors
    await import(testAssetPaths.generatedTypesCode);

    // expect that the query functions code does not have compile errors
    const queryFunctionExports = await import(testAssetPaths.generatedQueryFunctionsCode);
    expect(queryFunctionExports).toHaveProperty('sqlQueryFindAllByName');

    // expect the look right
    const typesCode = (await readFile(testAssetPaths.generatedTypesCode)).toString();
    expect(typesCode).toMatchSnapshot();

    // expect the functions look right
    const queryFunctionsCode = (await readFile(testAssetPaths.generatedQueryFunctionsCode)).toString();
    expect(queryFunctionsCode).toMatchSnapshot();
  });
});
