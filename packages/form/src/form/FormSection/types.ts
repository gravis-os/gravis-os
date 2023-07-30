import React from 'react'
import { ButtonProps, CardProps, GridProps, StackProps } from '@gravis-os/ui'
import { CrudItem, CrudModule, RenderPropsFunction } from '@gravis-os/types'
import {
  CheckboxGroupProps,
  ControlledCheckboxTableOptions,
  ControlledChipFieldProps,
  RadioGroupProps,
  TextFieldProps,
} from '@gravis-os/fields'
import { UseFormReturn } from 'react-hook-form'
import { SxProps } from '@mui/material'
import { RenderFieldWithWrapperProps } from './renderFieldWithWrapper'
import { ModelFieldProps } from '../fields/ModelField'
import { FormSectionFieldBooleanFunction } from './getFormSectionFieldBooleanFunction'
import { FormSectionFieldWithFunctionType } from './getFormSectionFieldWithFunctionType'
import { FieldEffectOptions } from './FieldEffectProvider'
import { FormSectionFieldTypeEnum } from './constants'

export interface FormSectionRenderReadOnlyProps {
  item?: CrudItem
  name: string
  module: CrudModule
  label: string
  value: any
  title: string
}

export interface FormSectionProps extends Omit<CardProps, 'hidden'> {
  key: string
  fields: Array<RenderFieldWithWrapperProps['fieldProps']>

  // Note that this only controls the section.gridProps. There is also a field.gridProps
  gridProps?: GridProps

  module?: CrudModule
  item?: CrudItem
  isNew?: boolean
  isPreview?: boolean

  // Read Only
  isReadOnly?: boolean
  readOnlySx?: StackProps['sx']
  renderReadOnly?: RenderPropsFunction<FormSectionRenderReadOnlyProps>
  renderReadOnlySection?: RenderPropsFunction<{
    label: React.ReactNode
    item?: CrudItem
  }>

  disableEdit?: boolean
  actionButtons?: ButtonProps[]

  disableCard?: boolean
  disabledFields?: string[]

  // Contexts
  crudContext?: RenderFieldWithWrapperProps['crudContext'] // If Form is used inside CrudForm
  userContext?: RenderFieldWithWrapperProps['userContext'] // If Form is used inside AuthProvider
}

// Also known as the fieldDefinition/fieldDef
export interface FormSectionFieldProps {
  // Core
  key: string
  name: string
  label?: string
  placeholder?: string
  type?: FormSectionFieldTypeEnum | string // Should not have string type but adding so as to prevent having to TS casting downstream
  module?: CrudModule
  multiple?: boolean
  options?:
    | TextFieldProps['options']
    | CheckboxGroupProps['options']
    | RadioGroupProps['options']
  select?: any // Can either be MUI textfield select or react-query selector

  // Generic name to pass props to the underlying component field.
  // Not to be confused with `fieldProps` as that is from RHF.
  // This is for passing props to the underlying component field.
  props?: Record<string, any>

  modelFieldProps?: Partial<ModelFieldProps>
  chipFieldProps?: Partial<ControlledChipFieldProps>
  checkboxTableProps?: ControlledCheckboxTableOptions

  shouldQuillAutofocus?: boolean

  // Manage layout
  gridProps?: GridProps

  // Manage state
  hidden?: boolean | FormSectionFieldBooleanFunction
  disabled?: boolean | FormSectionFieldBooleanFunction
  required?: boolean
  compact?: boolean
  helperText?: React.ReactNode
  defaultValue?:
    | string
    | number
    | boolean
    | readonly string[]
    | FormSectionFieldWithFunctionType

  // For setting value
  fieldEffect?: FieldEffectOptions

  // withCreate function
  withCreate?: boolean

  // Filters
  op?: string
  filterKey?: string

  // Render - manage custom renders for installing hooks
  render?: (props: {
    children: React.ReactNode
    formContext: UseFormReturn
  }) => any // Typings not working here should be React.ReactNode

  // Declares the column names of non-foreign keys on the related many-to-many table for saving
  manyToManyExtraColumnKeys?: string[]

  // Submission
  skipOnSubmit?: boolean

  bucketName?: string

  // Styling
  sx?: SxProps
  backgroundColor?: string
}
