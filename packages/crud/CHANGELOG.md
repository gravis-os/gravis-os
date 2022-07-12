# Changelog

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
