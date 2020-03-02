sql-code-generator
==============

Generate code from your SQL schema for type safety and and development speed.

Generates type definitions and query methods with a single function call.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/sql-code-generator.svg)](https://npmjs.org/package/sql-code-generator)
[![Codecov](https://codecov.io/gh/uladkasach/sql-code-generator/branch/master/graph/badge.svg)](https://codecov.io/gh/uladkasach/sql-code-generator)
[![Downloads/week](https://img.shields.io/npm/dw/sql-code-generator.svg)](https://npmjs.org/package/sql-code-generator)
[![License](https://img.shields.io/npm/l/sql-code-generator.svg)](https://github.com/uladkasach/sql-code-generator/blob/master/package.json)

# Table of Contents
<!-- toc -->
- [Goals](#goals)
- [Background](#background)
- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
  - [`schema-control apply`](#schema-control-apply)
  - [`schema-control help [COMMAND]`](#schema-control-help-command)
  - [`schema-control plan`](#schema-control-plan)
  - [`schema-control pull`](#schema-control-pull)
  - [`schema-control sync`](#schema-control-sync)
- [Contribution](#contribution)
<!-- tocstop -->

# Goals

The goal of `sql-code-generator` is to use the type definitions you've already defined in your SQL in order to speed up development and eliminate errors.

This includes:
- generating type definitions from SQL resources (e.g., tables, views, functions, procedures)
- generating type definitions from SQL queries (e.g., select * from table)
- generating typed functions that execute SQL queries from SQL queries (e.g., generate database client methods)

This enables:
- fully controlling and mastering database logic in SQL
- strict typing between sql and typescript for compile time error checking
- abstracting away the database interface and generating database clients from SQL
- autocompletion and explore-ability of sql resources in your IDE

Inspired by [graphql-code-generator](https://graphql-code-generator.com/)

# Installation

1. Save the package as a dev dependency
  ```sh
  npm install --save-dev sql-code-generator
  ```

2. Define a config yml
  ```yml
 # TODO
  ```

3. Test it out!
```
  $ npx sql-code-generator version
  $ npx sql-code-generator generate
```

# Usage

The typical use case consists of planning and applying:
```sh
  $ npx schema-control plan # to see what actions need to be done to sync your db
  $ npx schema-control apply # to sync your db with your checked in schema
```

These commands will operate on all resource and change definitions that are defined in your config (i.e., `control.yml`).

If your schema control config specified strict control, then you may also want to pull resources that are not currently defined in your version control so that you can add them as controlled resources:
```sh
  $ npx schema-control pull # records the create DDL for each uncontrolled resource
```

# Commands
<!-- commands -->
* [`schema-control apply`](#schema-control-apply)
* [`schema-control help [COMMAND]`](#schema-control-help-command)
* [`schema-control plan`](#schema-control-plan)
* [`schema-control pull`](#schema-control-pull)
* [`schema-control sync`](#schema-control-sync)

## `schema-control apply`

apply an execution plan

```
USAGE
  $ schema-control apply

OPTIONS
  -c, --config=config  [default: schema/control.yml] path to config file
  -h, --help           show CLI help

EXAMPLE
  $ schema-control apply -c src/contract/_test_assets/control.yml
     ✔ [APPLY] ./tables/data_source.sql (change:table_20190626_1)
     ✔ [APPLY] ./tables/notification.sql (resource:table:notification)
     ↓ [MANUAL_MIGRATION] ./tables/notification_version.sql (resource:table:notification_version) [skipped]
     ✔ [REAPPLY] ./functions/find_message_hash_by_text.sql (resource:function:find_message_hash_by_text)
     ✔ [APPLY] ./procedures/upsert_message.sql (resource:procedure:upsert_message)
     ✔ [APPLY] ./init/data_sources.sql (change:init_20190619_1)
     ✖ [APPLY] ./init/service_user.sql (change:init_20190619_2)
       → Could not apply ./init/service_user.sql: Operation CREATE USER failed for…

  Could not apply ./init/service_user.sql: Operation CREATE USER failed for 'user_name'@'%'
```

_See code: [dist/contract/commands/apply.ts](https://github.com/uladkasach/schema-control/blob/v1.1.0/dist/contract/commands/apply.ts)_

## `schema-control help [COMMAND]`

display help for schema-control

```
USAGE
  $ schema-control help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.0/src/commands/help.ts)_

## `schema-control plan`

generate and show an execution plan

```
USAGE
  $ schema-control plan

OPTIONS
  -c, --config=config  [default: schema/control.yml] path to config file
  -h, --help           show CLI help

EXAMPLE
  $ schema-control plan
    * [APPLY] ./init/service_user.sql (change:init_20190619_1)
       CREATE USER 'user_name'@'%';
       GRANT ALL PRIVILEGES ON awesomedb.* To 'user_name'@'%' IDENTIFIED BY '__CHANGE_M3__'; -- TODO: change password
```

_See code: [dist/contract/commands/plan.ts](https://github.com/uladkasach/schema-control/blob/v1.1.0/dist/contract/commands/plan.ts)_

## `schema-control pull`

pull and record uncontrolled resources

```
USAGE
  $ schema-control pull

OPTIONS
  -c, --config=config  [default: schema/control.yml] path to config file
  -h, --help           show CLI help
  -t, --target=target  [default: schema] target directory to record uncontrolled resources in

EXAMPLE
  $ schema-control pull -c src/contract/_test_assets/control.yml -t src/contract/_test_assets/uncontrolled
  pulling uncontrolled resource definitions into .../schema-control/src/contract/commands/_test_assets/uncontrolled
     ✓ [PULLED] resource:table:data_source
     ✓ [PULLED] resource:table:invitation
     ✓ [PULLED] resource:procedure:upsert_invitation
     ✓ [PULLED] resource:function:get_id_by_name
```

_See code: [dist/contract/commands/pull.ts](https://github.com/uladkasach/schema-control/blob/v1.1.0/dist/contract/commands/pull.ts)_

## `schema-control sync`

sync the change log for a specific change definition without applying it, for cases where a change has been reapplied manually

```
USAGE
  $ schema-control sync

OPTIONS
  -c, --config=config  [default: schema/control.yml] path to config file
  -h, --help           show CLI help
  --id=id              (required) reference id of the change definition

EXAMPLE
  $ schema-control sync -c src/contract/__test_assets__/control.yml --id change:init_service_user
     ✔ [SYNC] ./init/service_user.sql (change:init_service_user)
```

_See code: [dist/contract/commands/sync.ts](https://github.com/uladkasach/schema-control/blob/v1.1.0/dist/contract/commands/sync.ts)_
<!-- commandsstop -->


# Contribution

Team work makes the dream work! Please create a ticket for any features you think are missing and, if willing and able, draft a PR for the feature :)
