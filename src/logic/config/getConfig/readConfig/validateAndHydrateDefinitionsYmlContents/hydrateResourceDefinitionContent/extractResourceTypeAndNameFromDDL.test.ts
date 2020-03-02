import { ResourceType } from '../../../../../../types';
import { extractResourceTypeAndNameFromDDL } from './extractResourceTypeAndNameFromDDL';

describe('extractResourceTypeAndNameFromDDL', () => {
  it('should throw a standard error if can not find a resource type and name in the query', () => {
    const ddl = 'CRETE POCEDURE'; // malformed
    try {
      extractResourceTypeAndNameFromDDL({ ddl });
    } catch (error) {
      expect(error.message).toEqual('resource creation type and name could not be found in ddl');
    }
  });
  it('should be able to find a table resource', () => {
    const ddl = 'create table super_cool_table ( ... )';
    const { name, type } = extractResourceTypeAndNameFromDDL({ ddl });
    expect(name).toEqual('super_cool_table');
    expect(type).toEqual(ResourceType.TABLE);
  });
  it('should be able to find a TABLE resource', () => {
    const ddl = 'CREATE TABLE super_cool_table ( ... )';
    const { name, type } = extractResourceTypeAndNameFromDDL({ ddl });
    expect(name).toEqual('super_cool_table');
    expect(type).toEqual(ResourceType.TABLE);
  });
  it('should be able to find a procedure resource', () => {
    const ddl = 'create procedure upsert_super_cool_thing ( ... )';
    const { name, type } = extractResourceTypeAndNameFromDDL({ ddl });
    expect(name).toEqual('upsert_super_cool_thing');
    expect(type).toEqual(ResourceType.PROCEDURE);
  });
  it('should be able to find a PROCEDURE resource', () => {
    const ddl = 'CREATE PROCEDURE upsert_super_cool_thing ( ... )';
    const { name, type } = extractResourceTypeAndNameFromDDL({ ddl });
    expect(name).toEqual('upsert_super_cool_thing');
    expect(type).toEqual(ResourceType.PROCEDURE);
  });
  it('should be able to find a function resource', () => {
    const ddl = 'create function find_super_cool_stuff ( ... )';
    const { name, type } = extractResourceTypeAndNameFromDDL({ ddl });
    expect(name).toEqual('find_super_cool_stuff');
    expect(type).toEqual(ResourceType.FUNCTION);
  });
  it('should be able to find a FUNCTION resource', () => {
    const ddl = 'CREATE FUNCTION find_super_cool_stuff ( ... )';
    const { name, type } = extractResourceTypeAndNameFromDDL({ ddl });
    expect(name).toEqual('find_super_cool_stuff');
    expect(type).toEqual(ResourceType.FUNCTION);
  });
  it('should be able to find a resource name even if encased in backticks', () => {
    const ddl = 'CREATE TABLE `super_cool_table` ( ... )';
    const { name, type } = extractResourceTypeAndNameFromDDL({ ddl });
    expect(name).toEqual('super_cool_table');
    expect(type).toEqual(ResourceType.TABLE);
  });
  it('should be able to find the resource name even if there is no whitespace between name and definition start', () => {
    const ddl = 'CREATE TABLE super_cool_table( ... )';
    const { name, type } = extractResourceTypeAndNameFromDDL({ ddl });
    expect(name).toEqual('super_cool_table');
    expect(type).toEqual(ResourceType.TABLE);
  });
  it('should be able to find a resource name when DEFINER is defined', () => {
    const ddl = 'CREATE DEFINER=`root`@`%` PROCEDURE `upsert_super_cool_thing`( ... )';
    const { name, type } = extractResourceTypeAndNameFromDDL({ ddl });
    expect(name).toEqual('upsert_super_cool_thing');
    expect(type).toEqual(ResourceType.PROCEDURE);
  });
});
