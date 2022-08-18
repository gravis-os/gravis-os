# Changelog

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
