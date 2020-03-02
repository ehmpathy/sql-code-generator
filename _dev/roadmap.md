
0. read sql.yml
  - recursive read yml (like in schema-control)
  - extract language and "sql" (resources && queries)
  - validate the "sql"
    - generate list of invalid defs
      - e.g., missing name of query

1. resources
   1. generate interfaces for Tables
   2. generate interfaces for Views, built off of tables
   3. generate interfaces + types for functions
   4. generate interfaces + types for procedures

2. queries
   1. generate interfaces for queries (input and output) (based on resource defs)
   2. generate "methods" for queries (based on interfaces)

3. record the generated interfaces, types, and methods
    `npx sql-code-generator generate -c ./src/dao/sql.ts -d ./src/dao/generated`
