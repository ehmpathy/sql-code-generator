import {
  TypeDefinition,
  TypeDefinitionOfQuery,
  TypeDefinitionOfResourceView,
  TypeDefinitionOfResourceFunction,
  TypeDefinitionReference,
  DatabaseLanguage,
} from '../../../../../domain';
import { DATABASE_PROVIDED_FUNCTION_TYPE_DEFINITIONS } from './databaseProvidedFunctionTypeDefinitions';

export const grabTypeDefinitionsForReferencedDatabaseProvidedFunctions = ({
  language,
  definitions,
}: {
  language: DatabaseLanguage;
  definitions: TypeDefinition[];
}) => {
  // 1. get names of all referenced functions; functions can be referenced in select expressions && input variables of queries && views
  const references = definitions
    .map((def) => {
      if (def instanceof TypeDefinitionOfQuery) {
        return [
          ...def.selectExpressions.map((exp) => exp.typeReference),
          ...def.inputVariables
            .map((inp) => inp.type)
            .filter(
              (type): type is TypeDefinitionReference =>
                type instanceof TypeDefinitionReference,
            ), // filter out the types that don't reference anything, like when LIMIT type=[DataType.NUMBER]
        ];
      }
      if (def instanceof TypeDefinitionOfResourceView) {
        return [...def.selectExpressions.map((exp) => exp.typeReference)];
      }
      return [];
    })
    .flat();
  const referencedFunctionNames = references
    .filter((ref) => !!ref.functionReferencePath)
    .map((ref) => ref.functionReferencePath!.split('.')[0]!)
    .map((str) => str.toUpperCase()); // NOTE: we cast all fn names to UPPER_CASE
  const uniqueReferencedFunctionNames = [...new Set(referencedFunctionNames)];

  // 2. for each function name, check if we have a type definition for it. if we do, then add it to the list
  const databaseProvidedReferencedFunctionTypeDefinitions: TypeDefinitionOfResourceFunction[] =
    [];
  uniqueReferencedFunctionNames.forEach((referenceFunctionName) => {
    const typeDefinitionOfDatabaseProvidedFunctionForThisReferencedName =
      DATABASE_PROVIDED_FUNCTION_TYPE_DEFINITIONS[language][
        referenceFunctionName
      ];
    if (typeDefinitionOfDatabaseProvidedFunctionForThisReferencedName) {
      databaseProvidedReferencedFunctionTypeDefinitions.push(
        typeDefinitionOfDatabaseProvidedFunctionForThisReferencedName,
      );
    }
  });

  // 3. return all those function typedefs
  return databaseProvidedReferencedFunctionTypeDefinitions;
};
