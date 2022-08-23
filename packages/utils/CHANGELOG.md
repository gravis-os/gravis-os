# Changelog

## 0.0.12

### Patch Changes

- [#49](https://github.com/gravis-os/gravis-os/pull/49) [`506a55a`](https://github.com/gravis-os/gravis-os/commit/506a55af4c35baba0b933e13af400a0d092a4b53) Thanks [@clodal](https://github.com/clodal)! - Add printSingularOrPluralText util

## 0.0.11

### Patch Changes

- [`c0b4fdb`](https://github.com/gravis-os/gravis-os/commit/c0b4fdb59864503b8bc05a42f851bd002c2e0398) Thanks [@clodal](https://github.com/clodal)! - Bump all packages to fix build error

- Updated dependencies [[`c0b4fdb`](https://github.com/gravis-os/gravis-os/commit/c0b4fdb59864503b8bc05a42f851bd002c2e0398)]:
  - @gravis-os/types@0.0.5

## 0.0.10

### Patch Changes

- cd20132: Updated tsconfig, eslint, web and dashboard packages
- Updated dependencies [cd20132]
  - @gravis-os/types@0.0.4

## 0.0.9

### Patch Changes

- Update build
- Updated dependencies
  - @gravis-os/types@0.0.3

## 0.0.8

### Patch Changes

- Add types, dashboard, web packages. Squashed bugs"
- Updated dependencies
  - @gravis-os/types@0.0.2

## 0.0.7

### Patch Changes

- Overall bugfixes and enhancements mainly related to SalesOrder workflow"

## 0.0.6

### Patch Changes

- Update packages sitewide to fix build issues"

## 0.0.5

### Patch Changes

- 2315a3e: Apps Document feature overhaul

## 0.0.4

### Patch Changes

- e13cb0d: Update Quotation"

## 0.0.3

### Patch Changes

- Fix build error with util typing"

## 0.0.2

### Patch Changes

- 0ef76d6: Update ModelField to include server-side filtering for advanced search via autocomplete"

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
