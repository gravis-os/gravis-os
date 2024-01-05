# Changelog

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

## 0.2.1

### Patch Changes

- [#503](https://github.com/gravis-os/gravis-os/pull/503) [`887adfa8`](https://github.com/gravis-os/gravis-os/commit/887adfa8353d38fb685b463d3c5fb1529220971c) Thanks [@clodal](https://github.com/clodal)! - Fix issues that were causing console warnings and hydration issues downstream"

## 0.2.0

### Minor Changes

- [#485](https://github.com/gravis-os/gravis-os/pull/485) [`7eaea744`](https://github.com/gravis-os/gravis-os/commit/7eaea7441a1bc9d3ea7ee22c04173a5610bed419) Thanks [@clodal](https://github.com/clodal)! - Upgrade eslint, lint all packages

## 0.1.0

### Minor Changes

- [#446](https://github.com/gravis-os/gravis-os/pull/446) [`38e9245a`](https://github.com/gravis-os/gravis-os/commit/38e9245a3a139d048272fee5d30f833813a6c1da) Thanks [@clodal](https://github.com/clodal)! - Move typescript dependency to root package.json

* [#446](https://github.com/gravis-os/gravis-os/pull/446) [`2e3c0c36`](https://github.com/gravis-os/gravis-os/commit/2e3c0c36acd57550109bb35e8be8bab5687e8785) Thanks [@clodal](https://github.com/clodal)! - Upgrade to typescript v5. Fixed build errors. Removed apps/web package

## 0.0.31

### Patch Changes

- [#396](https://github.com/gravis-os/gravis-os/pull/396) [`f04f51b3`](https://github.com/gravis-os/gravis-os/commit/f04f51b38a4b45765e513b9ce2be7d65da60cb34) Thanks [@clodal](https://github.com/clodal)! - Refactor code for better treeshaking and bundle size via code splitting of unused components

## 0.0.30

### Patch Changes

- [#393](https://github.com/gravis-os/gravis-os/pull/393) [`c0b9609c`](https://github.com/gravis-os/gravis-os/commit/c0b9609c97f3f21b3c9d8970c4494513c5ed0e21) Thanks [@clodal](https://github.com/clodal)! - Remove console logs to rule out side effects

## 0.0.29

### Patch Changes

- [#380](https://github.com/gravis-os/gravis-os/pull/380) [`dce0cdd3`](https://github.com/gravis-os/gravis-os/commit/dce0cdd33ab354f23e75e5576a4ece81f849dace) Thanks [@clodal](https://github.com/clodal)! - Update eslintconfig to include naming conventions. Renamed eslintrc.js files to .eslintrc.js following the standard convention

## 0.0.28

### Patch Changes

- [`ba13867`](https://github.com/gravis-os/gravis-os/commit/ba13867ea27da5ee5087f4530fe91a57bacc84ea) Thanks [@clodal](https://github.com/clodal)! - Compile to target es6 instead of es5 to attempt to get tree-shake gains

## 0.0.27

### Patch Changes

- [`67e8f7a`](https://github.com/gravis-os/gravis-os/commit/67e8f7a9f47d29e9c72cdb05d4102bdd1ee707e5) Thanks [@clodal](https://github.com/clodal)! - Build: update mui and react types deps

## 0.0.26

### Patch Changes

- [`05c6f74`](https://github.com/gravis-os/gravis-os/commit/05c6f7457b83e5cc2340592765d7a0917cf1b118) Thanks [@clodal](https://github.com/clodal)! - Rename gravis-os/web to gravis-os/landing

## 0.0.25

### Patch Changes

- Downgrade back to react query v3 from v4 due to no QueryClient issue"

## 0.0.24

### Patch Changes

- [`6a84756`](https://github.com/gravis-os/gravis-os/commit/6a84756527800f2fc1229fb196294fca091a6ba3) Thanks [@clodal](https://github.com/clodal)! - Update react-query from v3 to v4. Upgrade SaaSRouterMiddleware

## 0.0.23

### Patch Changes

- [`9e27e13`](https://github.com/gravis-os/gravis-os/commit/9e27e13a55cdf606da8d370b2d7759db1ecf354d) Thanks [@clodal](https://github.com/clodal)! - Update next from 12.1 to 12.3. Upgrade @supabase auth"

## 0.0.22

### Patch Changes

- [`e2ca8fc`](https://github.com/gravis-os/gravis-os/commit/e2ca8fcd251bd54ca4b7d547d1ded93667171f6b) Thanks [@clodal](https://github.com/clodal)! - Upgrade React from 18.1 to 18.2

## 0.0.21

### Patch Changes

- [`c0b4fdb`](https://github.com/gravis-os/gravis-os/commit/c0b4fdb59864503b8bc05a42f851bd002c2e0398) Thanks [@clodal](https://github.com/clodal)! - Bump all packages to fix build error

## 0.0.20

### Patch Changes

- Update stripe to upgrade @supabase/supabase-auth-helpers

## 0.0.19

### Patch Changes

- Update stripe middleware

## 0.0.18

### Patch Changes

- Update stripe create checkout session middleware

## 0.0.17

### Patch Changes

- Update stripe router middleware being unable to capture stripeConfig due to withApiAuth

## 0.0.16

### Patch Changes

- Update stripe package subpath exports

## 0.0.15

### Patch Changes

- Update export subpath in stripe package

## 0.0.14

### Patch Changes

- In Stripe package.json add server exports subpath

## 0.0.13

### Patch Changes

- Update stripeConfig in middleware"

## 0.0.12

### Patch Changes

- Update Stripe package api routes

## 0.0.11

### Patch Changes

- Add stripeConfig.apiRoutes

## 0.0.10

### Patch Changes

- Encapsulate initStripeSupabaseAdmin call in middleware to prevent leak"

## 0.0.9

### Patch Changes

- Update StripeRouterMiddleware routes

## 0.0.8

### Patch Changes

- Add StripeRouterMiddleware

## 0.0.7

### Patch Changes

- Split Stripe package into client and server to prevent imports from being called

## 0.0.6

### Patch Changes

- Add debug info to stripe"

## 0.0.5

### Patch Changes

- Updaate broken stripe build"

## 0.0.4

### Patch Changes

- Abstract process.env variables from @gravis-os/stripe

## 0.0.3

### Patch Changes

- Update Stripe API names

## 0.0.2

### Patch Changes

- Add @gravis-os/stripe
