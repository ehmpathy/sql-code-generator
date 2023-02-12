# Changelog

## [0.9.3](https://github.com/ehmpathy/sql-code-generator/compare/v0.9.2...v0.9.3) (2023-02-12)


### Bug Fixes

* **cicd:** ensure integration test is provisioned before deploy test ([f30926c](https://github.com/ehmpathy/sql-code-generator/commit/f30926c7469b43f38ff36664fc44d12d5b59fbfb))
* **cicd:** remove aws dependent actions steps ([fc003b9](https://github.com/ehmpathy/sql-code-generator/commit/fc003b9f5ca6240e89d5edc859469f3f9fe3439d))
* **deps:** move yesql to a peer-dep in order to not flag depcheck ([9cbac44](https://github.com/ehmpathy/sql-code-generator/commit/9cbac44999fea005d5fb68e70b2fac977c59044d))
* **deps:** remove unused deps per depcheck ([25fb361](https://github.com/ehmpathy/sql-code-generator/commit/25fb361ee42021ec94a7df0e800f16edb232247e))
* **deps:** upgrade deps to remove audited vulnerabilities ([790025d](https://github.com/ehmpathy/sql-code-generator/commit/790025d34763f3519692f0ba343e5d0919999433))
* **format:** apply prettier changes post bestpracts upgrade ([50e45fb](https://github.com/ehmpathy/sql-code-generator/commit/50e45fb5454e9fda863fddf4322cd565028eca30))
* **practs:** upgrade to latest best practices per declapract-typescript-ehmpathy ([21f6bfc](https://github.com/ehmpathy/sql-code-generator/commit/21f6bfce779517683cbc03cca6e406b85802465e))
* **tests:** resolve breaking changes in joi post upgrade ([be2206e](https://github.com/ehmpathy/sql-code-generator/commit/be2206e53795b79d184a7afee8b47a977e5ad431))
* **types:** resolve type errors after typescript upgrade ([b81f850](https://github.com/ehmpathy/sql-code-generator/commit/b81f850cd38b52406c02cc79869ad9aaf376bbbc))

### [0.9.2](https://www.github.com/uladkasach/sql-code-generator/compare/v0.9.1...v0.9.2) (2022-12-08)


### Bug Fixes

* **deps:** ensure uuid package is a direct dependency ([359029b](https://www.github.com/uladkasach/sql-code-generator/commit/359029b769baf2a59d695875d31797d833c119ba))

### [0.9.1](https://www.github.com/uladkasach/sql-code-generator/compare/v0.9.0...v0.9.1) (2022-02-03)


### Bug Fixes

* **query:** ensure input variable names with special substrings do not affect parsing of table refs ([#58](https://www.github.com/uladkasach/sql-code-generator/issues/58)) ([50629ed](https://www.github.com/uladkasach/sql-code-generator/commit/50629edcb2eabeea63abf9b384d5ea0d2be49487))

## [0.9.0](https://www.github.com/uladkasach/sql-code-generator/compare/v0.8.2...v0.9.0) (2021-12-14)


### Features

* **query:** support unioned input variable types; [#49](https://www.github.com/uladkasach/sql-code-generator/issues/49) ([b66fb9e](https://www.github.com/uladkasach/sql-code-generator/commit/b66fb9e3b852d18c6bce23038740894ad6612ca9))


### Bug Fixes

* **query:** support lessthan-or-equalsto and greaterthan-or-equalsto query input variable type definitions ([2006faf](https://www.github.com/uladkasach/sql-code-generator/commit/2006faf75b3cdf09f4e8a95e819812bdaf802997))
