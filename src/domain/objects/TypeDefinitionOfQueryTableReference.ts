import Joi from 'joi';
import { DomainObject } from 'domain-objects';

const schema = Joi.object().keys({
  alias: Joi.string().required(), // e.g., "user u" => "u" or "user as u" => "u" or "upsert_job(...) as dgv" => "dgv"
  tableName: Joi.string()
    .required()
    .allow(null), // e.g., "user"
  functionName: Joi.string()
    .required()
    .allow(null), // e.g., "upsert_job"
});
export interface TypeDefinitionOfQueryTableReference {
  alias: string;
  tableName: string | null; // not null when table refers to a persisted table
  functionName: string | null; // not null when table refers to the output of a function
}
export class TypeDefinitionOfQueryTableReference extends DomainObject<TypeDefinitionOfQueryTableReference>
  implements TypeDefinitionOfQueryTableReference {
  public static schema = schema;
}
