export class QueryFunctionsOutputPathNotDefinedButRequiredError extends Error {
  constructor() {
    super(
      `Query Functions output path was not defined in config (config.generated.queryFunctions) but is required.

      This code path should not have been run as omitting the output path in the config is a signal that the user does not want QueryFunctions defined. Therefore, this is an unexpected error from the library.
      `,
    );
  }
}
