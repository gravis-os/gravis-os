# Changelog

## 0.0.23

### Patch Changes

- rebuild

## 0.0.22

### Patch Changes

- fix date fields

## 0.0.21

### Patch Changes

- rebuild

## 0.0.20

### Patch Changes

- [#30](https://github.com/gravis-os/gravis-os/pull/30) [`ab2df15`](https://github.com/gravis-os/gravis-os/commit/ab2df15f8b2705ff9027b7aed219a0fc127bda1d) Thanks [@al1xt](https://github.com/al1xt)! - add date type to renderField

## 0.0.19

### Patch Changes

- Add new section to DocumentFormSections

## 0.0.18

### Patch Changes

- cd20132: Updated tsconfig, eslint, web and dashboard packages
- Updated dependencies [cd20132]
  - @gravis-os/storage@0.0.10
  - @gravis-os/types@0.0.4
  - @gravis-os/ui@0.0.15

## 0.0.17

### Patch Changes

- Update build
- Updated dependencies
  - @gravis-os/storage@0.0.9
  - @gravis-os/types@0.0.3
  - @gravis-os/ui@0.0.14

## 0.0.16

### Patch Changes

- Add types, dashboard, web packages. Squashed bugs"
- Updated dependencies
- Updated dependencies [96c9535]
- Updated dependencies [3326527]
  - @gravis-os/storage@0.0.8
  - @gravis-os/types@0.0.2
  - @gravis-os/ui@0.0.13

## 0.0.15

### Patch Changes

- Overall bugfixes and enhancements mainly related to SalesOrder workflow"
- Updated dependencies
  - @gravis-os/storage@0.0.7
  - @gravis-os/ui@0.0.12

## 0.0.14

### Patch Changes

- 91adcfb: Fix typings

## 0.0.13

### Patch Changes

- Fix typing to resolve build error

## 0.0.12

### Patch Changes

- Update packages sitewide to fix build issues"
- Updated dependencies
  - @gravis-os/storage@0.0.6
  - @gravis-os/ui@0.0.11

## 0.0.11

### Patch Changes

- Fix typing issues

## 0.0.10

### Patch Changes

- 2315a3e: Apps Document feature overhaul
- fe49642: Update Quotation to Document"
- Updated dependencies [2315a3e]
- Updated dependencies [fe49642]
  - @gravis-os/storage@0.0.5
  - @gravis-os/ui@0.0.10

## 0.0.9

### Patch Changes

- e13cb0d: Update Quotation"
- Updated dependencies [e13cb0d]
  - @gravis-os/ui@0.0.9

## 0.0.8

### Patch Changes

- 03189c1: Complete StorageGallery component. Renamed StorageDropzone to StorageFiles"
- 0ef76d6: Update ModelField to include server-side filtering for advanced search via autocomplete"
- Updated dependencies [03189c1]
  - @gravis-os/storage@0.0.4
  - @gravis-os/ui@0.0.8

## 0.0.7

### Patch Changes

- Add StorageGallery

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
