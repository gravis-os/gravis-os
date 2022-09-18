# Changelog

## 0.0.19

### Patch Changes

- [`8e38806`](https://github.com/gravis-os/gravis-os/commit/8e3880669d427bb110b23519a8eb8b65899858e4) Thanks [@clodal](https://github.com/clodal)! - Minor update type

## 0.0.18

### Patch Changes

- [#72](https://github.com/gravis-os/gravis-os/pull/72) [`c4a6d46`](https://github.com/gravis-os/gravis-os/commit/c4a6d46fe84010da689a29b5cdb8ba46d2dc8f75) Thanks [@clodal](https://github.com/clodal)! - Update form saving action in Form

- Updated dependencies [[`1a19199`](https://github.com/gravis-os/gravis-os/commit/1a19199613b5aced5206cd58bf440288dcb2be1d), [`dc6812a`](https://github.com/gravis-os/gravis-os/commit/dc6812a8214392f49dc9d485f14d859bfac789fd), [`643a5f0`](https://github.com/gravis-os/gravis-os/commit/643a5f007fa1a3ae36401d42b383eb110ff35086), [`6f9d4f1`](https://github.com/gravis-os/gravis-os/commit/6f9d4f15c59bd1fe287075c13996fec2ac1a6c83), [`2a00ed3`](https://github.com/gravis-os/gravis-os/commit/2a00ed39ebac6087f5523c26c1d2d6751a1bb98b), [`9d44b57`](https://github.com/gravis-os/gravis-os/commit/9d44b5765604c77be68cef1e52fc3d1cfd82729a), [`6d243bc`](https://github.com/gravis-os/gravis-os/commit/6d243bc9703e8b33d126ca240aae4ff55fb5f7b9), [`c4a6d46`](https://github.com/gravis-os/gravis-os/commit/c4a6d46fe84010da689a29b5cdb8ba46d2dc8f75), [`6cf49b3`](https://github.com/gravis-os/gravis-os/commit/6cf49b3e711ef9c4acf328cbfc5b3320e10331ab)]:
  - @gravis-os/form@0.0.42
  - @gravis-os/ui@0.0.23
  - @gravis-os/types@0.0.10

## 0.0.17

### Patch Changes

- [#61](https://github.com/gravis-os/gravis-os/pull/61) [`7941ceb`](https://github.com/gravis-os/gravis-os/commit/7941cebc696a0922022fa39469c04c95fee16fd1) Thanks [@al1xt](https://github.com/al1xt)! - fix useUser returning null when auth is still loading by deferring its usage until after

- Updated dependencies [[`1ef317c`](https://github.com/gravis-os/gravis-os/commit/1ef317c7a3390ee1bbe46ae3244e2f4dc9e1e744), [`4913f41`](https://github.com/gravis-os/gravis-os/commit/4913f41f3883703d4fa104d11685691dfcb7c1a5), [`58b6f9c`](https://github.com/gravis-os/gravis-os/commit/58b6f9c5de13e43c269a14ed1d1ae99cfa05d3fd)]:
  - @gravis-os/form@0.0.39

## 0.0.16

### Patch Changes

- [#56](https://github.com/gravis-os/gravis-os/pull/56) [`5eea5ea`](https://github.com/gravis-os/gravis-os/commit/5eea5ea523259dd86b08d8206faf3da3349124d4) Thanks [@clodal](https://github.com/clodal)! - In tenant-facing modules, update form fields to automatically set workspace_id and hide certain fields based on user auth

* [#56](https://github.com/gravis-os/gravis-os/pull/56) [`f608bc1`](https://github.com/gravis-os/gravis-os/commit/f608bc1c95f71d248cd0c89d01d85a17fc9a2ce6) Thanks [@clodal](https://github.com/clodal)! - Add CrudFormGroup

* Updated dependencies [[`5eea5ea`](https://github.com/gravis-os/gravis-os/commit/5eea5ea523259dd86b08d8206faf3da3349124d4), [`38b6ff2`](https://github.com/gravis-os/gravis-os/commit/38b6ff2f4e9fa7d1a6c3145dbcf087d151f41425), [`f608bc1`](https://github.com/gravis-os/gravis-os/commit/f608bc1c95f71d248cd0c89d01d85a17fc9a2ce6)]:
  - @gravis-os/form@0.0.34
  - @gravis-os/types@0.0.9
  - @gravis-os/ui@0.0.20

## 0.0.15

### Patch Changes

- [#48](https://github.com/gravis-os/gravis-os/pull/48) [`d535ecd`](https://github.com/gravis-os/gravis-os/commit/d535ecd5f60974a066892864bc57a397de441c69) Thanks [@clodal](https://github.com/clodal)! - Check build and sanity test auth changes with downstream

* [#48](https://github.com/gravis-os/gravis-os/pull/48) [`3834a7a`](https://github.com/gravis-os/gravis-os/commit/3834a7adfaca871ba6ee27214b2ac1a28d327981) Thanks [@clodal](https://github.com/clodal)! - Update auth and saas to work with backward compat, build success, and e2e tests

- [#47](https://github.com/gravis-os/gravis-os/pull/47) [`c77635d`](https://github.com/gravis-os/gravis-os/commit/c77635d91ebe213baae41fd043ec30c4221529b9) Thanks [@clodal](https://github.com/clodal)! - Add UnauthorizedBox component"

- Updated dependencies [[`3834a7a`](https://github.com/gravis-os/gravis-os/commit/3834a7adfaca871ba6ee27214b2ac1a28d327981)]:
  - @gravis-os/types@0.0.8

## 0.0.14

### Patch Changes

- [#46](https://github.com/gravis-os/gravis-os/pull/46) [`b2950b1`](https://github.com/gravis-os/gravis-os/commit/b2950b176c2f5cbec3eaa5fac8ed5d8aaf3e1e30) Thanks [@clodal](https://github.com/clodal)! - Update SaaS middleware to move dashboard routes into /admin path to keep other level 1 paths free

- Updated dependencies [[`b72fc1d`](https://github.com/gravis-os/gravis-os/commit/b72fc1d91b91ee37529da0e145ade9361f8171da), [`b2950b1`](https://github.com/gravis-os/gravis-os/commit/b2950b176c2f5cbec3eaa5fac8ed5d8aaf3e1e30)]:
  - @gravis-os/form@0.0.31
  - @gravis-os/types@0.0.7

## 0.0.13

### Patch Changes

- Update SaasMiddlewareRouter to manage routes better

- Updated dependencies []:
  - @gravis-os/types@0.0.6

## 0.0.12

### Patch Changes

- [`c0b4fdb`](https://github.com/gravis-os/gravis-os/commit/c0b4fdb59864503b8bc05a42f851bd002c2e0398) Thanks [@clodal](https://github.com/clodal)! - Bump all packages to fix build error

- Updated dependencies [[`c0b4fdb`](https://github.com/gravis-os/gravis-os/commit/c0b4fdb59864503b8bc05a42f851bd002c2e0398)]:
  - @gravis-os/form@0.0.30
  - @gravis-os/types@0.0.5
  - @gravis-os/ui@0.0.18

## 0.0.11

### Patch Changes

- [#43](https://github.com/gravis-os/gravis-os/pull/43) [`8f1224f`](https://github.com/gravis-os/gravis-os/commit/8f1224fc74a886ae94c05abcf5d3ed0570160789) Thanks [@clodal](https://github.com/clodal)! - Update Auth and Middleware packages to streamline login flow

- Updated dependencies [[`8f1224f`](https://github.com/gravis-os/gravis-os/commit/8f1224fc74a886ae94c05abcf5d3ed0570160789)]:
  - @gravis-os/form@0.0.29
  - @gravis-os/ui@0.0.17

## 0.0.10

### Patch Changes

- [#42](https://github.com/gravis-os/gravis-os/pull/42) [`0ab3560`](https://github.com/gravis-os/gravis-os/commit/0ab3560ddf2250b5c1b74c34f14f433fa04b7bc4) Thanks [@clodal](https://github.com/clodal)! - Feature/upgrade supabase auth

- Updated dependencies [[`0ab3560`](https://github.com/gravis-os/gravis-os/commit/0ab3560ddf2250b5c1b74c34f14f433fa04b7bc4)]:
  - @gravis-os/form@0.0.28

## 0.0.9

### Patch Changes

- cd20132: Updated tsconfig, eslint, web and dashboard packages
- Updated dependencies [cd20132]
  - @gravis-os/form@0.0.18
  - @gravis-os/types@0.0.4
  - @gravis-os/ui@0.0.15

## 0.0.8

### Patch Changes

- Update build
- Updated dependencies
  - @gravis-os/form@0.0.17
  - @gravis-os/types@0.0.3
  - @gravis-os/ui@0.0.14

## 0.0.7

### Patch Changes

- Add types, dashboard, web packages. Squashed bugs"
- Updated dependencies
- Updated dependencies [96c9535]
- Updated dependencies [3326527]
  - @gravis-os/form@0.0.16
  - @gravis-os/types@0.0.2
  - @gravis-os/ui@0.0.13

## 0.0.6

### Patch Changes

- Overall bugfixes and enhancements mainly related to SalesOrder workflow"
- Updated dependencies
  - @gravis-os/form@0.0.15
  - @gravis-os/ui@0.0.12

## 0.0.5

### Patch Changes

- Update packages sitewide to fix build issues"
- Updated dependencies
  - @gravis-os/form@0.0.12
  - @gravis-os/ui@0.0.11

## 0.0.4

### Patch Changes

- 2315a3e: Apps Document feature overhaul
- fe49642: Update Quotation to Document"
- Updated dependencies [2315a3e]
- Updated dependencies [fe49642]
  - @gravis-os/form@0.0.10
  - @gravis-os/ui@0.0.10

## 0.0.3

### Patch Changes

- Update exports

## 0.0.2

### Patch Changes

- Update supabase auth to use v1.4.0 for more stable auth form"

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Ver
sioning](https://semver.org/spec/v2.0.0.html).

---

## 0.2.0 (2022-05-06)

Add RegisterForm.submitOptions
Upgrade Storybook to show Auth components
Minor update copy in SupabaseAuth

## [0.1.4] - 2022-04-19

### Updated

Moved react-quill to peerdep because of css import issue

## [0.1.3] - 2022-04-19

### Updated

In CrudTable, prevent unnecessary re-renders by memoizing the colDefs var
Add Delete confirmation dialog
Add HtmlField

## [0.1.2] - 2022-04-17

### Updated

Fix issue with broken useGetCrudTableColumnDefs in first column

## [0.1.1] - 2022-04-17

### Updated

Patch ag grid styles
Update readme

## [0.1.0] - 2022-04-17

### Updated

Add sample storybook with mui theme
Add CrudForm example and Switch field
Update ControlledSwitchField defaultValue
Minor update add yalc script
Update Button story docs
Minor update CrudTable page headers
Add msw
Add useRouterQueryFilters
Use react query in Detail page
Add shorthand to DetailPage
Update CrudForm, CrudTable and useGetItem with react query mutations
Fix issue with loading drawer showing unexpectedly in DetailPage
Clean up CrudTable
Minor update unused imports
Add CrudAddDialog
Add onClose action to PageHeader
Add PageHeader.actions
Update Manage IconButton
Fix build errors
Add ability to set initialValue in CrudAddDialog and fix query duping issue in useGetItem
Add CrudTable.addFormProps to expose defaultValues easily
Clean up DetailPageHeader
Add CrudForm.disabledFields
Add CrudTable.previewFormProps
Add base
