
0. [done:2020-03-02] read sql.yml, based off schema-control

1. resources
   1. [done:2020-03-02] generate interfaces for Tables
   3. [done:2020-03-04] generate interfaces for Views, built off of tables
      1. [done:2020-03-03] extract types from queries
   4. generate interfaces + types for functions
   5. generate interfaces + types for procedures

2. queries
   1. generate interfaces for queries (input and output) (based on resource defs)
      1. support subselects in query selectExpressions
      2. support functions in query selecteExpressions
      3. support input variables
      4. support functions and subselects in whereConditions for extracting inputVariables
      5. support "CALL procedure()" [not-mvp]
   2. generate "methods" for queries (based on interfaces)

3. record the generated interfaces, types, and methods
    `npx sql-code-generator generate -c ./src/dao/sql.ts -d ./src/dao/generated`
