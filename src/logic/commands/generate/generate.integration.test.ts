import { getError } from 'test-fns';

import { TEST_ASSETS_ROOT_DIR } from '../../__test_assets__/directory';
import { readFile } from '../utils/fileIO';
import { generate } from './generate';

describe('generate', () => {
  describe('mysql', () => {
    const testAssetPaths = {
      codegenYml: `${TEST_ASSETS_ROOT_DIR}/exampleProject/mysql/codegen.sql.yml`,
      generatedTypesCode: `${TEST_ASSETS_ROOT_DIR}/exampleProject/mysql/src/generated/fromSql/types.ts`,
      generatedQueryFunctionsCode: `${TEST_ASSETS_ROOT_DIR}/exampleProject/mysql/src/generated/fromSql/queryFunctions.ts`,
    };
    it('should be able to read the example config provisioned in __test_assets__', async () => {
      await generate({
        configPath: testAssetPaths.codegenYml,
      });

      // expect that the types code does not have compile errors
      await import(testAssetPaths.generatedTypesCode);

      // expect that the query functions code does not have compile errors
      const queryFunctionExports = await import(
        testAssetPaths.generatedQueryFunctionsCode
      );
      expect(queryFunctionExports).toHaveProperty('sqlQueryFindAllByName');

      // expect the look right
      const typesCode = (
        await readFile(testAssetPaths.generatedTypesCode)
      ).toString();
      expect(typesCode).toMatchSnapshot();

      // expect the functions look right
      const queryFunctionsCode = (
        await readFile(testAssetPaths.generatedQueryFunctionsCode)
      ).toString();
      expect(queryFunctionsCode).toMatchSnapshot();
    });
  });
  describe('postgres', () => {
    const testAssetPaths = {
      codegenYml: `${TEST_ASSETS_ROOT_DIR}/exampleProject/postgres/codegen.sql.yml`,
      generatedTypesCode: `${TEST_ASSETS_ROOT_DIR}/exampleProject/postgres/src/generated/fromSql/types.ts`,
      generatedQueryFunctionsCode: `${TEST_ASSETS_ROOT_DIR}/exampleProject/postgres/src/generated/fromSql/queryFunctions.ts`,
    };
    it('should be able to read the example config provisioned in __test_assets__', async () => {
      await generate({
        configPath: testAssetPaths.codegenYml,
      });

      // expect that the types code does not have compile errors
      await import(testAssetPaths.generatedTypesCode);

      // expect that the query functions code does not have compile errors
      const queryFunctionExports = await import(
        testAssetPaths.generatedQueryFunctionsCode
      );
      expect(queryFunctionExports).toHaveProperty('sqlQueryFindAllByName');

      // expect the look right
      const typesCode = (
        await readFile(testAssetPaths.generatedTypesCode)
      ).toString();
      expect(typesCode).toMatchSnapshot();

      // expect the functions look right
      const queryFunctionsCode = (
        await readFile(testAssetPaths.generatedQueryFunctionsCode)
      ).toString();
      expect(queryFunctionsCode).toMatchSnapshot();
    });
  });
  describe('postgres-noqueries', () => {
    const testAssetPaths = {
      codegenYml: `${TEST_ASSETS_ROOT_DIR}/exampleProject/postgres-noqueries/codegen.sql.yml`,
      generatedTypesCode: `${TEST_ASSETS_ROOT_DIR}/exampleProject/postgres-noqueries/src/generated/fromSql/types.ts`,
      generatedQueryFunctionsCode: `${TEST_ASSETS_ROOT_DIR}/exampleProject/postgres-noqueries/src/generated/fromSql/queryFunctions.ts`,
    };
    it('should be able to read the example config provisioned in __test_assets__', async () => {
      await generate({
        configPath: testAssetPaths.codegenYml,
      });

      // expect that the types code does not have compile errors
      await import(testAssetPaths.generatedTypesCode);

      // expect that the query functions code does not get produced
      const error = await getError(
        import(testAssetPaths.generatedQueryFunctionsCode),
      );
      expect(error.message).toContain('Cannot find module');
      expect(error.message).toContain('queryFunctions.ts');

      // expect the look right
      const typesCode = (
        await readFile(testAssetPaths.generatedTypesCode)
      ).toString();
      expect(typesCode).toMatchSnapshot();
    });
  });
});
