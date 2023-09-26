import React from 'react'
import { UseFormReturn } from 'react-hook-form'

import {
  CheckboxGroupProps,
  ControlledCheckboxTableOptions,
  ControlledChipFieldProps,
  RadioGroupProps,
  TextFieldProps,
} from '@gravis-os/fields'
import { CrudItem, CrudModule, RenderPropsFunction } from '@gravis-os/types'
import { ButtonProps, CardProps, GridProps, StackProps } from '@gravis-os/ui'
import { SxProps } from '@mui/material'

import { ModelFieldProps } from '../fields/ModelField'
import { FormSectionFieldTypeEnum } from './constants'
import { FieldEffectOptions } from './FieldEffectProvider'
import { FormSectionFieldBooleanFunction } from './getFormSectionFieldBooleanFunction'
import { FormSectionFieldWithFunctionType } from './getFormSectionFieldWithFunctionType'
import { RenderFieldWithWrapperProps } from './renderFieldWithWrapper'

export interface FormSectionRenderReadOnlyProps {
  item?: CrudItem
  label: string
  module: CrudModule
  name: string
  title: string
  value: any
}

export interface FormSectionProps extends Omit<CardProps, 'hidden'> {
  actionButtons?: ButtonProps[]
  // Contexts
  crudContext?: RenderFieldWithWrapperProps['crudContext'] // If Form is used inside CrudForm

  disableCard?: boolean

  disableEdit?: boolean
  disabledFields?: string[]
  fields: Array<RenderFieldWithWrapperProps['fieldProps']>
  // Note that this only controls the section.gridProps. There is also a field.gridProps
  gridProps?: GridProps

  isNew?: boolean
  isPreview?: boolean
  // Read Only
  isReadOnly?: boolean
  item?: CrudItem

  key: string
  module?: CrudModule

  readOnlySx?: StackProps['sx']
  renderReadOnly?: RenderPropsFunction<FormSectionRenderReadOnlyProps>

  renderReadOnlySection?: RenderPropsFunction<{
    item?: CrudItem
    label: React.ReactNode
  }>
  userContext?: RenderFieldWithWrapperProps['userContext'] // If Form is used inside AuthProvider
}

// Also known as the fieldDefinition/fieldDef
export interface FormSectionFieldProps {
  backgroundColor?: string
  bucketName?: string
  checkboxTableProps?: ControlledCheckboxTableOptions
  chipFieldProps?: Partial<ControlledChipFieldProps>
  compact?: boolean
  defaultValue?:
    | FormSectionFieldWithFunctionType
    | boolean
    | number
    | readonly string[]
    | string
  disabled?: FormSectionFieldBooleanFunction | boolean
  // For setting value
  fieldEffect?: FieldEffectOptions
  filterKey?: string

  // Generic name to pass props to the underlying component field.
  // Not to be confused with `fieldProps` as that is from RHF.
  filterLabel?: string

  formatDateTimeValue?: (item: CrudItem) => string
  // Manage layout
  gridProps?: GridProps
  helperText?: React.ReactNode

  // Manage state
  hidden?: FormSectionFieldBooleanFunction | boolean

  // Core
  key: string

  label?: string
  // Declares the column names of non-foreign keys on the related many-to-many table for saving
  manyToManyExtraColumnKeys?: string[]
  modelFieldProps?: Partial<ModelFieldProps>
  module?: CrudModule
  multiple?: boolean
  name: string

  // Filters
  op?: string

  options?:
    | CheckboxGroupProps['options']
    | RadioGroupProps['options']
    | TextFieldProps['options']

  placeholder?: string

  // This is for passing props to the underlying component field.
  props?: Record<string, any>
  // Render - manage custom renders for installing hooks
  render?: (props: {
    children: React.ReactNode
    formContext: UseFormReturn
  }) => any // Typings not working here should be React.ReactNode
  required?: boolean

  select?: any // Can either be MUI textfield select or react-query selector

  setFilterQuery?: (filter: [key: string, value: any]) => string[]

  shouldQuillAutofocus?: boolean

  // Submission
  skipOnSubmit?: boolean

  // Styling
  sx?: SxProps
  type?: FormSectionFieldTypeEnum | string // Should not have string type but adding so as to prevent having to TS casting downstream
  // withCreate function
  withCreate?: boolean
}
