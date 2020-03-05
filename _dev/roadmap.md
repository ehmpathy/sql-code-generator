
0. [done:2020-03-02] read sql.yml, based off schema-control

1. resources
   1. [done:2020-03-02] generate interfaces for Tables
   3. [done:2020-03-04] generate interfaces for Views, built off of tables
      1. [done:2020-03-03] extract types from queries
   4. [done:2020-03-04] generate interfaces + types for functions
   5. [not-mvp] generate interfaces + types for procedures

2. queries
   1. generate interfaces for queries (input and output) (based on resource defs)
      1. define typescript code for inputs and output
      2. support subselects in query selectExpressions
      3. support functions in query selecteExpressions
      4. support input variables
      5. support functions and subselects in whereConditions for extracting inputVariables
      6. [not-mvp] support "CALL procedure()"
   2. generate "methods" for queries (based on interfaces)

3. record the generated interfaces, types, and methods
    `npx sql-code-generator generate -c ./src/dao/sql.ts -d ./src/dao/generated`
