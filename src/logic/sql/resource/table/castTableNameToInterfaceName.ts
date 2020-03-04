import { pascalCase } from 'pascal-case';

export const castTableNameToInterfaceName = (name: string) => pascalCase(name);
