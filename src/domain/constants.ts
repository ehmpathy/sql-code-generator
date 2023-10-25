import {
  TypeDefinitionOfQuery,
  TypeDefinitionOfResourceFunction,
  TypeDefinitionOfResourceTable,
  TypeDefinitionOfResourceView,
} from './objects';

export enum DatabaseLanguage {
  MYSQL = 'mysql',
  POSTGRES = 'postgres',
}
export enum DefinitionType {
  RESOURCE = 'resource',
  QUERY = 'query',
}
export enum DataType {
  STRING = 'string',
  STRING_ARRAY = 'string[]', // postgres supports arrays
  NUMBER = 'number',
  NUMBER_ARRAY = 'number[]', // postgres supports arrays
  JSON = 'Record<string, any>',
  JSON_ARRAY = 'Record<string, any>[]', // postgres supports arrays
  DATE = 'Date',
  BUFFER = 'Buffer', // e.g., for binary
  BOOLEAN = 'boolean',
  NULL = 'null',
  UNDEFINED = 'undefined',
}
export enum ResourceType {
  TABLE = 'TABLE',
  FUNCTION = 'FUNCTION',
  PROCEDURE = 'PROCEDURE',
  VIEW = 'VIEW',
}
export enum QuerySection {
  SELECT_EXPRESSIONS = 'SELECT_EXPRESSIONS',
  TABLE_REFERENCES = 'TABLE_REFERENCES',
  WHERE_CONDITIONS = 'WHERE_CONDITIONS',
}
export type TypeDefinition =
  | TypeDefinitionOfQuery
  | TypeDefinitionOfResourceTable
  | TypeDefinitionOfResourceFunction
  | TypeDefinitionOfResourceView;
export interface GeneratedOutputPaths {
  types: string;
  queryFunctions: string | undefined; // undefined -> user does not want them
}
