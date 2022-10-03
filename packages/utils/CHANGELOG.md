# Changelog

## 0.0.20

### Patch Changes

- Add printIsoDate util

## 0.0.19

### Patch Changes

- [`633358d`](https://github.com/gravis-os/gravis-os/commit/633358d74f8d2b93e80b934b150cfa09382c2c40) Thanks [@clodal](https://github.com/clodal)! - Update html field to include img with b64 src"

## 0.0.18

### Patch Changes

- [`a4999a6`](https://github.com/gravis-os/gravis-os/commit/a4999a6eafae9e36c6f35347b44eb100babd8a1f) Thanks [@clodal](https://github.com/clodal)! - Upgrade isGuestPath matcher with isPathMatch utils. Add Html component

## 0.0.17

### Patch Changes

- Downgrade back to react query v3 from v4 due to no QueryClient issue"

- Updated dependencies []:
  - @gravis-os/types@0.0.15

## 0.0.16

### Patch Changes

- [`6a84756`](https://github.com/gravis-os/gravis-os/commit/6a84756527800f2fc1229fb196294fca091a6ba3) Thanks [@clodal](https://github.com/clodal)! - Update react-query from v3 to v4. Upgrade SaaSRouterMiddleware

- Updated dependencies [[`6a84756`](https://github.com/gravis-os/gravis-os/commit/6a84756527800f2fc1229fb196294fca091a6ba3)]:
  - @gravis-os/types@0.0.14

## 0.0.15

### Patch Changes

- [#84](https://github.com/gravis-os/gravis-os/pull/84) [`9f74ff1`](https://github.com/gravis-os/gravis-os/commit/9f74ff17c8d6949327c36cbb095b18ee70939069) Thanks [@winter-steve](https://github.com/winter-steve)! - Add testing setup to packages.
  Provide required polyfills and mock env variables.
  Fix ES modules imports.

## 0.0.14

### Patch Changes

- [`9e27e13`](https://github.com/gravis-os/gravis-os/commit/9e27e13a55cdf606da8d370b2d7759db1ecf354d) Thanks [@clodal](https://github.com/clodal)! - Update next from 12.1 to 12.3. Upgrade @supabase auth"

- Updated dependencies [[`9e27e13`](https://github.com/gravis-os/gravis-os/commit/9e27e13a55cdf606da8d370b2d7759db1ecf354d)]:
  - @gravis-os/types@0.0.13

## 0.0.13

### Patch Changes

- [`e2ca8fc`](https://github.com/gravis-os/gravis-os/commit/e2ca8fcd251bd54ca4b7d547d1ded93667171f6b) Thanks [@clodal](https://github.com/clodal)! - Upgrade React from 18.1 to 18.2

- Updated dependencies [[`e2ca8fc`](https://github.com/gravis-os/gravis-os/commit/e2ca8fcd251bd54ca4b7d547d1ded93667171f6b)]:
  - @gravis-os/types@0.0.12

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
