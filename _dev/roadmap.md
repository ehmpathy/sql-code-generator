
0. [done:2020-03-02] read sql.yml, based off schema-control

1. resources
   1. [done:2020-03-02] generate interfaces for Tables
   3. [done:2020-03-04] generate interfaces for Views, built off of tables
      1. [done:2020-03-03] extract types from queries
   4. [done:2020-03-04] generate interfaces + types for functions
   5. [not-mvp] generate interfaces + types for procedures

2. queries
   1. generate interfaces for queries (input and output) (based on resource defs)
      1. [done:2020-03-06] extract input variables from query sql -> finish the query typedef
      2. [done:2020-03-07] support functions in functions in query inputVariables (e.g., get_id_from_string inside of upsert)
      3. [done:2020-03-09] support functions in query selectExpressions
      4. [done:20202-03-10] define typescript code for inputs and output
   2. [done:2020-03-11] generate "methods" for queries (based on interfaces)

3. compose functionality to generate the interfaces, types, and methods
   - [done:2020-03-11] get query name from sql
   - [done:2020-03-11] improve the config reader
     - i.e., support glob patterns for finding `schema/tables/**.sql` and `src/dao/**.ts` and excluding `src/dao/**.test.ts` files
     - https://www.npmjs.com/package/glob
     - try to match syntax that graphql-code-generator used
   - [not-mvp] support after write hooks
     - e.g., ```
              hooks:
              afterAllFileWrite:
                 - prettier --write
                 - eslint --fix
              ```
   - [done:2020-03-12] save the typescript type definitions
     - sort the typescript type definitions by type: table, function, view, query
     - output better errors - specifying exactly which "resource" or "query" we could not extract types or define code for, when error is thrown
   - [done:2020-03-12] save the typescript client methods into one file
   - [done:2020-03-12] specify what the files are named in config
   - define a generate command (`npx sql-code-generator generate -c ./codegen.sql.yml`)


4. improve range of query support
   1. support functions in functions for selectExpressions and whereConditions
   2. support subselects in query selectExpressions
   3. support subselects in query whereConditions for extracting inputVariables
   4. support reused input variables (i.e., defined in two places... maybe just go with first type defined, for maintainability and ease of implementation?)
   5. [not-mvp] support "CALL procedure()"



