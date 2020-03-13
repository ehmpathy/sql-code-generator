import {
  TypeDefinitionOfQuery,
  TypeDefinitionOfResourceFunction,
  TypeDefinitionOfResourceTable,
  TypeDefinitionOfResourceView,
} from './valueObjects';

export enum DatabaseLanguage {
  MYSQL = 'mysql',
}
export enum DefinitionType {
  RESOURCE = 'resource',
  QUERY = 'query',
}
export enum DataType {
  STRING = 'string',
  NUMBER = 'number',
  DATE = 'Date',
  NULL = 'null',
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
  queryFunctions: string;
}
