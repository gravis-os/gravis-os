# Changelog

## 0.3.0

### Minor Changes

- [#485](https://github.com/gravis-os/gravis-os/pull/485) [`7eaea744`](https://github.com/gravis-os/gravis-os/commit/7eaea7441a1bc9d3ea7ee22c04173a5610bed419) Thanks [@clodal](https://github.com/clodal)! - Upgrade eslint, lint all packages

## 0.2.0

### Minor Changes

- [#446](https://github.com/gravis-os/gravis-os/pull/446) [`38e9245a`](https://github.com/gravis-os/gravis-os/commit/38e9245a3a139d048272fee5d30f833813a6c1da) Thanks [@clodal](https://github.com/clodal)! - Move typescript dependency to root package.json

* [#446](https://github.com/gravis-os/gravis-os/pull/446) [`2e3c0c36`](https://github.com/gravis-os/gravis-os/commit/2e3c0c36acd57550109bb35e8be8bab5687e8785) Thanks [@clodal](https://github.com/clodal)! - Upgrade to typescript v5. Fixed build errors. Removed apps/web package

## 0.1.0

### Minor Changes

- [#394](https://github.com/gravis-os/gravis-os/pull/394) [`259ffe2b`](https://github.com/gravis-os/gravis-os/commit/259ffe2bec29929386981917b4337c60987ffde4) Thanks [@clodal](https://github.com/clodal)! - Fix issue with missing type declarations TS7016

## 0.0.21

### Patch Changes

- [#380](https://github.com/gravis-os/gravis-os/pull/380) [`dce0cdd3`](https://github.com/gravis-os/gravis-os/commit/dce0cdd33ab354f23e75e5576a4ece81f849dace) Thanks [@clodal](https://github.com/clodal)! - Update eslintconfig to include naming conventions. Renamed eslintrc.js files to .eslintrc.js following the standard convention

## 0.0.20

### Patch Changes

- [`ba13867`](https://github.com/gravis-os/gravis-os/commit/ba13867ea27da5ee5087f4530fe91a57bacc84ea) Thanks [@clodal](https://github.com/clodal)! - Compile to target es6 instead of es5 to attempt to get tree-shake gains

## 0.0.19

### Patch Changes

- [`5644ba9`](https://github.com/gravis-os/gravis-os/commit/5644ba9536b5eee01c8dde0b4922c385f8c312d0) Thanks [@clodal](https://github.com/clodal)! - Add subdomainOverride to SaaSRouterMiddleware

## 0.0.18

### Patch Changes

- [`67e8f7a`](https://github.com/gravis-os/gravis-os/commit/67e8f7a9f47d29e9c72cdb05d4102bdd1ee707e5) Thanks [@clodal](https://github.com/clodal)! - Build: update mui and react types deps

## 0.0.17

### Patch Changes

- [`19534d0`](https://github.com/gravis-os/gravis-os/commit/19534d04ef9f7b724534fb65fdd1ca497a5e55fe) Thanks [@clodal](https://github.com/clodal)! - Expose reservedSubdomains as an arg from the downstream app

## 0.0.16

### Patch Changes

- [`b45aa34`](https://github.com/gravis-os/gravis-os/commit/b45aa34208041634e79c1460ff8ddd76bd33921a) Thanks [@clodal](https://github.com/clodal)! - Remove admin from reserved keyword from middleware else it would be redirect out

## 0.0.15

### Patch Changes

- [`6df93f7`](https://github.com/gravis-os/gravis-os/commit/6df93f7331042f9ceab49277c1528b35fba71286) Thanks [@clodal](https://github.com/clodal)! - Update UI and update saas router middleware to remove app. redirect

## 0.0.14

### Patch Changes

- [`fea3d22`](https://github.com/gravis-os/gravis-os/commit/fea3d22e0829807a1edcf92eabc62d4412158fcb) Thanks [@clodal](https://github.com/clodal)! - Republish auth, saas, middleware to ensure latest builds

## 0.0.13

### Patch Changes

- [`96330fb`](https://github.com/gravis-os/gravis-os/commit/96330fbf742f5177e91d23de829869f8b6b19a1c) Thanks [@clodal](https://github.com/clodal)! - Add userAuthColumnKey to saas and middleware to allow querying of db user from a different column key

## 0.0.12

### Patch Changes

- [`5108f70`](https://github.com/gravis-os/gravis-os/commit/5108f701430f32ffa7599e196a0a496fb05d8bae) Thanks [@clodal](https://github.com/clodal)! - Add apps/directory

## 0.0.11

### Patch Changes

- [`e78bd8f`](https://github.com/gravis-os/gravis-os/commit/e78bd8fb545e45f4f4ee1d363117beb37f1673ca) Thanks [@clodal](https://github.com/clodal)! - Add locale

## 0.0.10

### Patch Changes

- Downgrade back to react query v3 from v4 due to no QueryClient issue"

## 0.0.9

### Patch Changes

- [`6a84756`](https://github.com/gravis-os/gravis-os/commit/6a84756527800f2fc1229fb196294fca091a6ba3) Thanks [@clodal](https://github.com/clodal)! - Update react-query from v3 to v4. Upgrade SaaSRouterMiddleware

## 0.0.8

### Patch Changes

- [`b619b88`](https://github.com/gravis-os/gravis-os/commit/b619b88f3fe3c7b2a9b2cc4a506e901479d67d43) Thanks [@clodal](https://github.com/clodal)! - Update SaaS & Middleware to include custom domain"

* [#84](https://github.com/gravis-os/gravis-os/pull/84) [`9f74ff1`](https://github.com/gravis-os/gravis-os/commit/9f74ff17c8d6949327c36cbb095b18ee70939069) Thanks [@winter-steve](https://github.com/winter-steve)! - Add testing setup to packages.
  Provide required polyfills and mock env variables.
  Fix ES modules imports.

## 0.0.7

### Patch Changes

- [`9e27e13`](https://github.com/gravis-os/gravis-os/commit/9e27e13a55cdf606da8d370b2d7759db1ecf354d) Thanks [@clodal](https://github.com/clodal)! - Update next from 12.1 to 12.3. Upgrade @supabase auth"

## 0.0.6

### Patch Changes

- [`e2ca8fc`](https://github.com/gravis-os/gravis-os/commit/e2ca8fcd251bd54ca4b7d547d1ded93667171f6b) Thanks [@clodal](https://github.com/clodal)! - Upgrade React from 18.1 to 18.2

* [`1c0e511`](https://github.com/gravis-os/gravis-os/commit/1c0e5118dc309520880d99276e73fed4de7dc159) Thanks [@clodal](https://github.com/clodal)! - Republish auth, middleware, saas to fix issue with unauthorization at login"

## 0.0.5

### Patch Changes

- [#48](https://github.com/gravis-os/gravis-os/pull/48) [`3834a7a`](https://github.com/gravis-os/gravis-os/commit/3834a7adfaca871ba6ee27214b2ac1a28d327981) Thanks [@clodal](https://github.com/clodal)! - Update auth and saas to work with backward compat, build success, and e2e tests

## 0.0.4

### Patch Changes

- [#46](https://github.com/gravis-os/gravis-os/pull/46) [`b2950b1`](https://github.com/gravis-os/gravis-os/commit/b2950b176c2f5cbec3eaa5fac8ed5d8aaf3e1e30) Thanks [@clodal](https://github.com/clodal)! - Update SaaS middleware to move dashboard routes into /admin path to keep other level 1 paths free

## 0.0.3

### Patch Changes

- [`c0b4fdb`](https://github.com/gravis-os/gravis-os/commit/c0b4fdb59864503b8bc05a42f851bd002c2e0398) Thanks [@clodal](https://github.com/clodal)! - Bump all packages to fix build error

## 0.0.2

### Patch Changes

- [#43](https://github.com/gravis-os/gravis-os/pull/43) [`8f1224f`](https://github.com/gravis-os/gravis-os/commit/8f1224fc74a886ae94c05abcf5d3ed0570160789) Thanks [@clodal](https://github.com/clodal)! - Update Auth and Middleware packages to streamline login flow
