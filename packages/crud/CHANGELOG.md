# Changelog

## 0.0.34

### Patch Changes

- [#49](https://github.com/gravis-os/gravis-os/pull/49) [`506a55a`](https://github.com/gravis-os/gravis-os/commit/506a55af4c35baba0b933e13af400a0d092a4b53) Thanks [@clodal](https://github.com/clodal)! - Add printSingularOrPluralText util

* [#49](https://github.com/gravis-os/gravis-os/pull/49) [`b722571`](https://github.com/gravis-os/gravis-os/commit/b72257196a63d3b6dec79fdef70ca428893eb85e) Thanks [@clodal](https://github.com/clodal)! - In CrudTable, add checkbox selection to perform bulk delete

* Updated dependencies [[`506a55a`](https://github.com/gravis-os/gravis-os/commit/506a55af4c35baba0b933e13af400a0d092a4b53), [`51c95b9`](https://github.com/gravis-os/gravis-os/commit/51c95b9e5bd39be6b422de68658d8337e81b8c7f)]:
  - @gravis-os/utils@0.0.12
  - @gravis-os/form@0.0.32

## 0.0.33

### Patch Changes

- [#45](https://github.com/gravis-os/gravis-os/pull/45) [`b72fc1d`](https://github.com/gravis-os/gravis-os/commit/b72fc1d91b91ee37529da0e145ade9361f8171da) Thanks [@winter-steve](https://github.com/winter-steve)! - Set correct display and form value for with create option in ModelField. Pass forms state through ModelFieldWithCrud render props

- Updated dependencies [[`b72fc1d`](https://github.com/gravis-os/gravis-os/commit/b72fc1d91b91ee37529da0e145ade9361f8171da), [`b2950b1`](https://github.com/gravis-os/gravis-os/commit/b2950b176c2f5cbec3eaa5fac8ed5d8aaf3e1e30)]:
  - @gravis-os/form@0.0.31
  - @gravis-os/auth@0.0.14
  - @gravis-os/types@0.0.7

## 0.0.32

### Patch Changes

- [`c0b4fdb`](https://github.com/gravis-os/gravis-os/commit/c0b4fdb59864503b8bc05a42f851bd002c2e0398) Thanks [@clodal](https://github.com/clodal)! - Bump all packages to fix build error

* [#44](https://github.com/gravis-os/gravis-os/pull/44) [`097b96a`](https://github.com/gravis-os/gravis-os/commit/097b96aa1ed6e550d447b223bad33dc84f1c4209) Thanks [@clodal](https://github.com/clodal)! - In Crud, add fallbackPlaceholder

* Updated dependencies [[`c0b4fdb`](https://github.com/gravis-os/gravis-os/commit/c0b4fdb59864503b8bc05a42f851bd002c2e0398)]:
  - @gravis-os/auth@0.0.12
  - @gravis-os/form@0.0.30
  - @gravis-os/storage@0.0.12
  - @gravis-os/types@0.0.5
  - @gravis-os/ui@0.0.18

## 0.0.31

### Patch Changes

- [#42](https://github.com/gravis-os/gravis-os/pull/42) [`0ab3560`](https://github.com/gravis-os/gravis-os/commit/0ab3560ddf2250b5c1b74c34f14f433fa04b7bc4) Thanks [@clodal](https://github.com/clodal)! - Feature/upgrade supabase auth

- Updated dependencies [[`0ab3560`](https://github.com/gravis-os/gravis-os/commit/0ab3560ddf2250b5c1b74c34f14f433fa04b7bc4)]:
  - @gravis-os/auth@0.0.10
  - @gravis-os/form@0.0.28

## 0.0.30

### Patch Changes

- [#40](https://github.com/gravis-os/gravis-os/pull/40) [`50653ab`](https://github.com/gravis-os/gravis-os/commit/50653abc95cefae9711bdd6e0bc9651421475574) Thanks [@winter-steve](https://github.com/winter-steve)! - Use correct primary table id when updating relations by selecting the updated item id and disable deletions of related entities when creating on submit

* [`3b47687`](https://github.com/gravis-os/gravis-os/commit/3b47687680846519000486e8c847c4b58052a31e) Thanks [@winter-steve](https://github.com/winter-steve)! - Make module for data table optional

* Updated dependencies [[`cfe43a9`](https://github.com/gravis-os/gravis-os/commit/cfe43a9b93341e21f15a19ad26e5585567a56518)]:
  - @gravis-os/form@0.0.27

## 0.0.29

### Patch Changes

- [#39](https://github.com/gravis-os/gravis-os/pull/39) [`04466dc`](https://github.com/gravis-os/gravis-os/commit/04466dc41859899cfc575629d2f3f48eb927e6e1) Thanks [@al1xt](https://github.com/al1xt)! - fix bannerProps typing for DetailPageProps and allow options for mutation hooks

* [#37](https://github.com/gravis-os/gravis-os/pull/37) [`356c1b9`](https://github.com/gravis-os/gravis-os/commit/356c1b904dbcc2276b39944023350e6a3154b10b) Thanks [@winter-steve](https://github.com/winter-steve)! - update useGetItem return type to include react-query's return values

## 0.0.28

### Patch Changes

- [#38](https://github.com/gravis-os/gravis-os/pull/38) [`74302e3`](https://github.com/gravis-os/gravis-os/commit/74302e3c768d3ec7e98d8a1fc2714dbaad87a591) Thanks [@winter-steve](https://github.com/winter-steve)! - allow saveManyToManyValues to handle explicitly declared relations from the module config

## 0.0.27

### Patch Changes

- rebuild

- Updated dependencies []:
  - @gravis-os/form@0.0.25

## 0.0.26

### Patch Changes

- [#25](https://github.com/gravis-os/gravis-os/pull/25) [`b30d66f`](https://github.com/gravis-os/gravis-os/commit/b30d66fe356f0e73624af1050f122a2bc2428a5d) Thanks [@al1xt](https://github.com/al1xt)! - show link automatically when preview is disabled

* [#33](https://github.com/gravis-os/gravis-os/pull/33) [`1befa46`](https://github.com/gravis-os/gravis-os/commit/1befa46010ec1a12e030afc6b96a71ce02c30927) Thanks [@winter-steve](https://github.com/winter-steve)! - Expose form control elements (i.e. edit, cancel, save button) through render props to be consumed downstream. Ensure that form is rendered only after item fetching is completed

- [#34](https://github.com/gravis-os/gravis-os/pull/34) [`5c1de70`](https://github.com/gravis-os/gravis-os/commit/5c1de704390ef08b93c1b3f3021408d5d50cb242) Thanks [@al1xt](https://github.com/al1xt)! - allow deleting 1-M relations with useCrudForm

- Updated dependencies [[`1befa46`](https://github.com/gravis-os/gravis-os/commit/1befa46010ec1a12e030afc6b96a71ce02c30927)]:
  - @gravis-os/form@0.0.24

## 0.0.25

### Patch Changes

- rebuild

- Updated dependencies []:
  - @gravis-os/form@0.0.21

## 0.0.24

### Patch Changes

- [#31](https://github.com/gravis-os/gravis-os/pull/31) [`828b3f3`](https://github.com/gravis-os/gravis-os/commit/828b3f3f41b5f0f710b43e4532bb4086303599bb) Thanks [@al1xt](https://github.com/al1xt)! - allow disabling of some features in useGetCrudTableColumnDefs

- Updated dependencies [[`ab2df15`](https://github.com/gravis-os/gravis-os/commit/ab2df15f8b2705ff9027b7aed219a0fc127bda1d)]:
  - @gravis-os/form@0.0.20

## 0.0.23

### Patch Changes

- Add new section to DocumentFormSections
- Updated dependencies
  - @gravis-os/form@0.0.19

## 0.0.22

### Patch Changes

- cd20132: Updated tsconfig, eslint, web and dashboard packages
- Updated dependencies [cd20132]
  - @gravis-os/auth@0.0.9
  - @gravis-os/form@0.0.18
  - @gravis-os/storage@0.0.10
  - @gravis-os/types@0.0.4
  - @gravis-os/ui@0.0.15

## 0.0.21

### Patch Changes

- Update build
- Updated dependencies
  - @gravis-os/auth@0.0.8
  - @gravis-os/form@0.0.17
  - @gravis-os/storage@0.0.9
  - @gravis-os/types@0.0.3
  - @gravis-os/ui@0.0.14

## 0.0.20

### Patch Changes

- Update Crud Typings"

## 0.0.19

### Patch Changes

- Add types, dashboard, web packages. Squashed bugs"
- 96c9535: Abstract Tabs in DetailPage to UI
- 3326527: Add Tabs & List UI components"
- Updated dependencies
- Updated dependencies [96c9535]
- Updated dependencies [3326527]
  - @gravis-os/auth@0.0.7
  - @gravis-os/form@0.0.16
  - @gravis-os/storage@0.0.8
  - @gravis-os/types@0.0.2
  - @gravis-os/ui@0.0.13

## 0.0.18

### Patch Changes

- Overall bugfixes and enhancements mainly related to SalesOrder workflow"
- Updated dependencies
  - @gravis-os/auth@0.0.6
  - @gravis-os/form@0.0.15
  - @gravis-os/storage@0.0.7
  - @gravis-os/ui@0.0.12

## 0.0.17

### Patch Changes

- 91adcfb: Fix typings
- Updated dependencies [91adcfb]
  - @gravis-os/form@0.0.14

## 0.0.16

### Patch Changes

- Update packages sitewide to fix build issues"
- Updated dependencies
  - @gravis-os/auth@0.0.5
  - @gravis-os/form@0.0.12
  - @gravis-os/storage@0.0.6
  - @gravis-os/ui@0.0.11

## 0.0.15

### Patch Changes

- Fix typing issues
- Updated dependencies
  - @gravis-os/form@0.0.11

## 0.0.14

### Patch Changes

- Update typing in Gravis

  - [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)

## 0.0.13

### Patch Changes

- 2315a3e: Apps Document feature overhaul
- fe49642: Update Quotation to Document"
- Updated dependencies [2315a3e]
- Updated dependencies [fe49642]
  - @gravis-os/auth@0.0.4
  - @gravis-os/form@0.0.10
  - @gravis-os/storage@0.0.5
  - @gravis-os/ui@0.0.10

## 0.0.11

### Patch Changes

- e13cb0d: Update Quotation"
- Updated dependencies [e13cb0d]
  - @gravis-os/form@0.0.9
  - @gravis-os/ui@0.0.9

## 0.0.10

### Patch Changes

- Fix issue with CrudForm oneToMany partition not working when creating a new item"

## 0.0.9

### Patch Changes

- 0ef76d6: Update ModelField to include server-side filtering for advanced search via autocomplete"
- Updated dependencies [03189c1]
- Updated dependencies [0ef76d6]
  - @gravis-os/form@0.0.8
  - @gravis-os/storage@0.0.4
  - @gravis-os/ui@0.0.8

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
