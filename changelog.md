# Changelog

## [0.10.0](https://github.com/ehmpathy/sql-code-generator/compare/v0.9.8...v0.10.0) (2024-06-15)


### Features

* **resources:** support multiple resource declarations per sql file ([5f6e920](https://github.com/ehmpathy/sql-code-generator/commit/5f6e920401badabc033463eb6362392620ba4012)), closes [#47](https://github.com/ehmpathy/sql-code-generator/issues/47)

## [0.9.8](https://github.com/ehmpathy/sql-code-generator/compare/v0.9.7...v0.9.8) (2024-06-15)


### Bug Fixes

* **config:** ensure configs without queries are supported ([2b5554f](https://github.com/ehmpathy/sql-code-generator/commit/2b5554f5d7816f1d4c121579ed7a7f70c59ffe88))

## [0.9.7](https://github.com/ehmpathy/sql-code-generator/compare/v0.9.6...v0.9.7) (2024-06-14)


### Bug Fixes

* **query:** extract typedef from input variable via fn output comparison ([3f6063d](https://github.com/ehmpathy/sql-code-generator/commit/3f6063d009bc6430dfb2e0da77f7a1291bf83992))

## [0.9.6](https://github.com/ehmpathy/sql-code-generator/compare/v0.9.5...v0.9.6) (2024-06-14)


### Bug Fixes

* **query:** correctly exclude ON term as possible alias ([e529c9d](https://github.com/ehmpathy/sql-code-generator/commit/e529c9d9c825ec82cc6a95d13e8c0adddc19788a))

## [0.9.5](https://github.com/ehmpathy/sql-code-generator/compare/v0.9.4...v0.9.5) (2024-05-26)


### Bug Fixes

* **practs:** upgrade to latest best ([#87](https://github.com/ehmpathy/sql-code-generator/issues/87)) ([eb48427](https://github.com/ehmpathy/sql-code-generator/commit/eb48427d8d99b29ad4b40bb5c1bf3fd82e3f3ea5))
* **query:** support array query input variables ([#85](https://github.com/ehmpathy/sql-code-generator/issues/85)) ([95a22f0](https://github.com/ehmpathy/sql-code-generator/commit/95a22f04b8abdcd03baef12936e3729598c3cd8c))

## [0.9.4](https://github.com/ehmpathy/sql-code-generator/compare/v0.9.3...v0.9.4) (2023-10-26)


### Bug Fixes

* **types:** add missing support for boolean ([a6e45d2](https://github.com/ehmpathy/sql-code-generator/commit/a6e45d2b5c2b5db4603b300f22f23d3f17c30941))
* **types:** add missing support for json ([7d6014a](https://github.com/ehmpathy/sql-code-generator/commit/7d6014a9b7622002176448456bcc8125f6146974))

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
