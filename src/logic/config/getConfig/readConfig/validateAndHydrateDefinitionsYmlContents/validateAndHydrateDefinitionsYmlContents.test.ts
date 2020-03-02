import { InvalidDefinitionError } from './errors';
import { hydrateQueryDefinitionContent } from './hydrateQueryDefinitionContent';
import { hydrateResourceDefinitionContent } from './hydrateResourceDefinitionContent';
import { validateAndHydrateDefinitionsYmlContents } from './validateAndHydrateDefinitionsYmlContents';

jest.mock('./hydrateResourceDefinitionContent');
const hydrateResourceDefinitionContentMock = hydrateResourceDefinitionContent as jest.Mock;
hydrateResourceDefinitionContentMock.mockResolvedValue('__HYDRATED_RESOURCE_DEF_RESULT__');

jest.mock('./hydrateQueryDefinitionContent');
const hydrateQueryDefinitionContentMock = hydrateQueryDefinitionContent as jest.Mock;
hydrateQueryDefinitionContentMock.mockResolvedValue('__HYDRATED_QUERY_DEF_RESULT__');

describe('validateAndHydrateDefinitionsYmlContents', () => {
  beforeEach(() => jest.clearAllMocks());
  it('should throw an error if typedef is not a string or object', async () => {
    try {
      await validateAndHydrateDefinitionsYmlContents({ readRoot: '__READ_ROOT__', contents: [5] });
      throw new Error('should not reach here');
    } catch (error) {
      expect(error.constructor).toEqual(InvalidDefinitionError);
      expect(error.explanation).toEqual('invalid content type: must be object or string');
    }
  });
  it('should throw an error if the content is a string but not a yml path', async () => {
    try {
      await validateAndHydrateDefinitionsYmlContents({ readRoot: '__READ_ROOT__', contents: ['path/to/some.json'] });
      throw new Error('should not reach here');
    } catch (error) {
      expect(error.constructor).toEqual(InvalidDefinitionError);
      expect(error.explanation).toEqual('string must be path to a .yml file');
    }
  });
  it('should return the string if the string looks like a path to a yml', async () => {
    const ymlPath = 'path/to/some.yml';
    const definitions = await validateAndHydrateDefinitionsYmlContents({
      readRoot: '__READ_ROOT__',
      contents: [ymlPath],
    });
    expect(definitions[0]).toEqual(ymlPath);
  });
  it('should throw an error if the object is not of a supported type', async () => {
    try {
      await validateAndHydrateDefinitionsYmlContents({ readRoot: '__READ_ROOT__', contents: [{ type: 'balogna' }] });
      throw new Error('should not reach here');
    } catch (error) {
      expect(error.constructor).toEqual(InvalidDefinitionError);
      expect(error.explanation).toEqual('unsupported definition type');
    }
  });
  it('should return the result of hydrateChangeDefinitionContent, if type === change', async () => {
    const definitions = await validateAndHydrateDefinitionsYmlContents({
      readRoot: '__READ_ROOT__',
      contents: [{ type: 'query' }],
    });
    expect(hydrateQueryDefinitionContentMock.mock.calls.length).toEqual(1);
    expect(hydrateQueryDefinitionContentMock.mock.calls[0][0]).toMatchObject({
      readRoot: '__READ_ROOT__',
      content: { type: 'query' },
    });
    expect(definitions[0]).toEqual('__HYDRATED_QUERY_DEF_RESULT__');
  });
  it('should return the result of hydrateResourceDefinitionContent, if type === resource', async () => {
    const definitions = await validateAndHydrateDefinitionsYmlContents({
      readRoot: '__READ_ROOT__',
      contents: [{ type: 'resource' }],
    });
    expect(hydrateResourceDefinitionContentMock.mock.calls.length).toEqual(1);
    expect(hydrateResourceDefinitionContentMock.mock.calls[0][0]).toMatchObject({
      readRoot: '__READ_ROOT__',
      content: { type: 'resource' },
    });
    expect(definitions[0]).toEqual('__HYDRATED_RESOURCE_DEF_RESULT__');
  });
});
