# @gravis-os/cli

## 1.0.0-next.0

### Major Changes

- [`2d1d13de`](https://github.com/gravis-os/gravis-os/commit/2d1d13de61c8fad247b8f0e766b85cbc8b711075) Thanks [@clodal](https://github.com/clodal)! - 🚀 MAJOR UPGRADE: Next 14, TypeScript v5, Supabase v2 Integration

  🦋 WARN: This changeset introduces significant upgrades with potential breaking changes. We have upgraded our framework to Next.js version 14, TypeScript to version 5, and integrated Supabase version 2. These upgrades enhance performance, security, and provide access to the latest features.

  🦋 BREAKING CHANGES:

  1. Next.js 14: Changes in APIs and configurations might affect existing page setups and custom server configurations.
  2. TypeScript v5: Updates in type checking and syntax could lead to compilation errors in existing TypeScript code.
  3. Supabase v2: Altered API endpoints and authentication mechanisms may impact database interactions and data handling.

  🦋 WHY THIS CHANGE:

  - To leverage the latest features, improved performance, and enhanced security measures offered by these updated technologies.
  - Aligning our stack with current industry standards for better development experience and future-proofing our projects.

  🦋 ACTION REQUIRED:
  To ensure a smooth transition, we strongly recommend all consumers to thoroughly review our detailed "Gravis V2 Upgrade Guide." This guide outlines the necessary steps for adapting your codebase to these updates and resolving potential compatibility issues.

  🔗 Upgrade Guide: [Gravis V2 Upgrade Guide](https://www.notion.so/onexgroup/Gravis-V2-Upgrade-Guide-a0ed0d572a84412486605d15ae3731df?pvs=4)

  Please take the time to carefully review the guide and make the necessary adjustments to your code. We appreciate your cooperation in this major upgrade and are here to support you through this transition.

## 0.2.0

### Minor Changes

- [#485](https://github.com/gravis-os/gravis-os/pull/485) [`7eaea744`](https://github.com/gravis-os/gravis-os/commit/7eaea7441a1bc9d3ea7ee22c04173a5610bed419) Thanks [@clodal](https://github.com/clodal)! - Upgrade eslint, lint all packages

## 0.1.0

### Minor Changes

- [#446](https://github.com/gravis-os/gravis-os/pull/446) [`38e9245a`](https://github.com/gravis-os/gravis-os/commit/38e9245a3a139d048272fee5d30f833813a6c1da) Thanks [@clodal](https://github.com/clodal)! - Move typescript dependency to root package.json

* [#446](https://github.com/gravis-os/gravis-os/pull/446) [`2e3c0c36`](https://github.com/gravis-os/gravis-os/commit/2e3c0c36acd57550109bb35e8be8bab5687e8785) Thanks [@clodal](https://github.com/clodal)! - Upgrade to typescript v5. Fixed build errors. Removed apps/web package

## 0.0.17

### Patch Changes

- [#380](https://github.com/gravis-os/gravis-os/pull/380) [`dce0cdd3`](https://github.com/gravis-os/gravis-os/commit/dce0cdd33ab354f23e75e5576a4ece81f849dace) Thanks [@clodal](https://github.com/clodal)! - Update eslintconfig to include naming conventions. Renamed eslintrc.js files to .eslintrc.js following the standard convention

## 0.0.16

### Patch Changes

- [#315](https://github.com/gravis-os/gravis-os/pull/315) [`5842296f`](https://github.com/gravis-os/gravis-os/commit/5842296f7e8f7e58fbdb22987f93807458959b7b) Thanks [@clodal](https://github.com/clodal)! - Upgrade gravis cli dep command

## 0.0.15

### Patch Changes

- [#296](https://github.com/gravis-os/gravis-os/pull/296) [`cc437085`](https://github.com/gravis-os/gravis-os/commit/cc437085ff3c587c971a025726306a1ccbadf04b) Thanks [@clodal](https://github.com/clodal)! - Update gravis cli to include the dep command

## 0.0.14

### Patch Changes

- [`ba13867`](https://github.com/gravis-os/gravis-os/commit/ba13867ea27da5ee5087f4530fe91a57bacc84ea) Thanks [@clodal](https://github.com/clodal)! - Compile to target es6 instead of es5 to attempt to get tree-shake gains

## 0.0.13

### Patch Changes

- [`67e8f7a`](https://github.com/gravis-os/gravis-os/commit/67e8f7a9f47d29e9c72cdb05d4102bdd1ee707e5) Thanks [@clodal](https://github.com/clodal)! - Build: update mui and react types deps

## 0.0.12

### Patch Changes

- [`389af8b`](https://github.com/gravis-os/gravis-os/commit/389af8b3fe086131b059a55dba976ad8c2fa4e94) Thanks [@clodal](https://github.com/clodal)! - Enhanced Header and fixed eslint config"

## 0.0.11

### Patch Changes

- [#85](https://github.com/gravis-os/gravis-os/pull/85) [`2e04d13`](https://github.com/gravis-os/gravis-os/commit/2e04d13c5f451de369db8307e2db426456097d9a) Thanks [@winter-steve](https://github.com/winter-steve)! - Move testing related babel config and jest config into rtl package.
  Run test commands using turborepo.

* [#84](https://github.com/gravis-os/gravis-os/pull/84) [`9f74ff1`](https://github.com/gravis-os/gravis-os/commit/9f74ff17c8d6949327c36cbb095b18ee70939069) Thanks [@winter-steve](https://github.com/winter-steve)! - Add testing setup to packages.
  Provide required polyfills and mock env variables.
  Fix ES modules imports.

## 0.0.10

### Patch Changes

- [#82](https://github.com/gravis-os/gravis-os/pull/82) [`feb25a5`](https://github.com/gravis-os/gravis-os/commit/feb25a5bc5c9292f32657e3bbaf2d860d37b0c48) Thanks [@clodal](https://github.com/clodal)! - Add RTL to ui package

* [#82](https://github.com/gravis-os/gravis-os/pull/82) [`c956526`](https://github.com/gravis-os/gravis-os/commit/c9565260b8b10ef1834613bd045c89b90a482a32) Thanks [@clodal](https://github.com/clodal)! - Add @gravis-os/rtl for hosting react testing library files"

- [#82](https://github.com/gravis-os/gravis-os/pull/82) [`d5f769b`](https://github.com/gravis-os/gravis-os/commit/d5f769be4fd88388f730a1fe50ac5927d32a61fc) Thanks [@clodal](https://github.com/clodal)! - Add jest + rtl passing tests to UI based on Button.test.jsx

## 0.0.9

### Patch Changes

- [`8acb1ed`](https://github.com/gravis-os/gravis-os/commit/8acb1edc85a4821bfdc61f1e5452aba29693b3c7) Thanks [@clodal](https://github.com/clodal)! - Update cli to include index file"

## 0.0.8

### Patch Changes

- [`c90bcff`](https://github.com/gravis-os/gravis-os/commit/c90bcff23360d37dae4380fe6905e653bb1a972a) Thanks [@clodal](https://github.com/clodal)! - Update cli generator code to include barrrel"

* [`fb2dd2c`](https://github.com/gravis-os/gravis-os/commit/fb2dd2cdd6906b5f5381860bb599502cf2c19b4a) Thanks [@clodal](https://github.com/clodal)! - Update cli template

- [`6560284`](https://github.com/gravis-os/gravis-os/commit/6560284c1b35cbf4aea0f8f8d9811061116da6dd) Thanks [@clodal](https://github.com/clodal)! - Update cli template

* [`2a7ef9a`](https://github.com/gravis-os/gravis-os/commit/2a7ef9ade630b5b8be31ff5d84532fda37de7f55) Thanks [@clodal](https://github.com/clodal)! - Remove withPageAuth from cli generator as we use middleware for this now

## 0.0.7

### Patch Changes

- Update cli template for dashboardlayout

## 0.0.6

### Patch Changes

- [#58](https://github.com/gravis-os/gravis-os/pull/58) [`30ed59c`](https://github.com/gravis-os/gravis-os/commit/30ed59c57e2faac11fbc1114f9b85cb521354528) Thanks [@clodal](https://github.com/clodal)! - Update cli to replace outdated package. Move module out of config

## 0.0.5

### Patch Changes

- [`c0b4fdb`](https://github.com/gravis-os/gravis-os/commit/c0b4fdb59864503b8bc05a42f851bd002c2e0398) Thanks [@clodal](https://github.com/clodal)! - Bump all packages to fix build error

## 0.0.4

### Patch Changes

- Update build
