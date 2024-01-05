# @gravis-os/tsconfig

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

## 0.1.0

### Minor Changes

- [#485](https://github.com/gravis-os/gravis-os/pull/485) [`7eaea744`](https://github.com/gravis-os/gravis-os/commit/7eaea7441a1bc9d3ea7ee22c04173a5610bed419) Thanks [@clodal](https://github.com/clodal)! - Upgrade eslint, lint all packages

## 0.0.9

### Patch Changes

- [#380](https://github.com/gravis-os/gravis-os/pull/380) [`dce0cdd3`](https://github.com/gravis-os/gravis-os/commit/dce0cdd33ab354f23e75e5576a4ece81f849dace) Thanks [@clodal](https://github.com/clodal)! - Update eslintconfig to include naming conventions. Renamed eslintrc.js files to .eslintrc.js following the standard convention

## 0.0.8

### Patch Changes

- [`ba13867`](https://github.com/gravis-os/gravis-os/commit/ba13867ea27da5ee5087f4530fe91a57bacc84ea) Thanks [@clodal](https://github.com/clodal)! - Compile to target es6 instead of es5 to attempt to get tree-shake gains

## 0.0.7

### Patch Changes

- [`6c9a847`](https://github.com/gravis-os/gravis-os/commit/6c9a847c5355df0d7cf408c3771fe3f92d39008f) Thanks [@clodal](https://github.com/clodal)! - Ensure that sideEffects: false on all packages

## 0.0.6

### Patch Changes

- [#149](https://github.com/gravis-os/gravis-os/pull/149) [`d5c8c3e`](https://github.com/gravis-os/gravis-os/commit/d5c8c3ec9e9736d4871906206a653c30b14a3c22) Thanks [@al1xt](https://github.com/al1xt)! - Add source maps for types

## 0.0.5

### Patch Changes

- [`6c0d753`](https://github.com/gravis-os/gravis-os/commit/6c0d75395e7d62966fba1f6a95c36c7ed707feba) Thanks [@clodal](https://github.com/clodal)! - Fix build error in web app

## 0.0.4

### Patch Changes

- [`a9b4f8b`](https://github.com/gravis-os/gravis-os/commit/a9b4f8b07dad99d671fb54d697aaa5fedcbe099a) Thanks [@clodal](https://github.com/clodal)! - Update nextjs tsconfig to fix build errors on Vercell

## 0.0.3

### Patch Changes

- [`bbfabaf`](https://github.com/gravis-os/gravis-os/commit/bbfabaf5d155b4c1fc29c2b2d0d0103c735703e2) Thanks [@clodal](https://github.com/clodal)! - Update tsconfig to disable implicit any for nextjs build to pass

## 0.0.2

### Patch Changes

- cd20132: Updated tsconfig, eslint, web and dashboard packages
