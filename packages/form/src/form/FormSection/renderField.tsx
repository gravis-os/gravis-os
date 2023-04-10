import React from 'react'
import get from 'lodash/get'
import startCase from 'lodash/startCase'
import { Controller, UseFormReturn } from 'react-hook-form'
import {
  StorageAvatarWithUpload,
  StorageFiles,
  StorageGallery,
} from '@gravis-os/storage'
import { GridProps, Html } from '@gravis-os/ui'
import {
  CrudContextInterface,
  CrudModule,
  UserContextInterface,
} from '@gravis-os/types'
import { SxProps } from '@mui/material'
import {
  ControlledAmountField,
  ControlledCheckboxTable,
  ControlledCheckboxTableOptions,
  ControlledChipField,
  ControlledChipFieldProps,
  ControlledCountryCodeField,
  ControlledCountryField,
  ControlledDateField,
  ControlledDateTimeField,
  ControlledHtmlField,
  ControlledPasswordField,
  ControlledPercentageField,
  ControlledRadioGroup,
  ControlledRateField,
  ControlledSwitchField,
  ControlledTextField,
} from '@gravis-os/fields'
import { printPercentage } from '@gravis-os/utils'
import getFormSectionFieldWithFunctionType, {
  FormSectionFieldWithFunctionType,
} from './getFormSectionFieldWithFunctionType'
import getFormSectionFieldRenderProps from './getFormSectionFieldRenderProps'
import getFormSectionFieldBooleanFunction, {
  FormSectionFieldBooleanFunction,
} from './getFormSectionFieldBooleanFunction'
import { FieldEffectOptions } from './FieldEffectProvider'
import { FormSectionProps } from './FormSection'
import { ModelFieldProps } from '../fields/ModelField'
import ControlledModelField, {
  ControlledModelFieldProps,
} from '../fields/ControlledModelField'
import FormSectionReadOnlyStack from './FormSectionReadOnlyStack'
import getRelationalObjectKey from '../utils/getRelationalObjectKey'

export enum FormSectionFieldTypeEnum {
  // String
  HTML = 'html',
  INPUT = 'input',
  EMAIL = 'email',
  PASSWORD = 'password',
  TEXTAREA = 'textarea',
  TEXT = 'text', // alias for input
  RADIO_GROUP = 'radio_group',

  // Dropdown
  COUNTRY_CODE = 'country_code',
  COUNTRY = 'country',

  // Number
  AMOUNT = 'amount',
  PERCENTAGE = 'percentage',
  RATE = 'rate',

  // Boolean
  SWITCH = 'switch',

  // Blob
  FILES = 'files',
  IMAGES = 'images',
  IMAGE = 'image',

  // Objects/Arrays
  MODEL = 'model',
  CHIP = 'chip',
  CHECKBOX_TABLE = 'CHECKBOX_TABLE',

  // Date
  DATE = 'date',
  DATE_TIME = 'date_time',
}

// Also known as the fieldDefinition/fieldDef
export interface FormSectionFieldProps {
  // Core
  key: string
  name: string
  label?: string
  type?: FormSectionFieldTypeEnum | string // Should not have string type but adding so as to prevent having to TS casting downstream
  module?: CrudModule
  multiple?: boolean
  options?: string[] | Array<{ key: string; value: string; label: string }>
  select?: any // Can either be MUI textfield select or react-query selector

  modelFieldProps?: Partial<ModelFieldProps>
  chipFieldProps?: Partial<ControlledChipFieldProps>
  checkboxTableProps?: ControlledCheckboxTableOptions

  // Manage layout
  gridProps?: GridProps

  // Manage state
  hidden?: boolean | FormSectionFieldBooleanFunction
  disabled?: boolean | FormSectionFieldBooleanFunction
  required?: boolean
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

  // Styling
  sx?: SxProps
  backgroundColor?: string
}

export interface RenderFieldProps {
  formContext: UseFormReturn
  sectionProps: FormSectionProps
  fieldProps: FormSectionFieldProps
  crudContext?: CrudContextInterface // Available if Form is used in CrudForm
  userContext?: UserContextInterface // Available if Form is used in CrudForm
}

/**
 * Render FormSection Field
 */
const renderField = (props: RenderFieldProps) => {
  const { formContext, sectionProps, fieldProps } = props
  const { control, setValue, formState } = formContext
  const { errors } = formState

  const {
    isNew,
    isPreview,
    isReadOnly,
    item,
    disabledFields,
    renderReadOnly,
    readOnlySx,
    module: injectedModule,
  } = sectionProps
  const {
    type,
    module,
    key,
    gridProps,
    fieldEffect,
    checkboxTableProps,
    render,
    modelFieldProps,
    chipFieldProps,
    ...rest
  } = fieldProps
  const {
    name,
    disabled,
    hidden,
    helperText,
    defaultValue,
    label: injectedLabel,
    withCreate,
  } = rest

  // ==============================
  // Resolve Props
  // ==============================
  // The set of props available to the end-user when defining a function in the fieldDef
  const renderProps = getFormSectionFieldRenderProps(props)

  // Calculate if the field is in disabledFields, else fallback to check if the disabled prop is defined
  const isDisabled =
    disabledFields?.includes(name) ||
    getFormSectionFieldBooleanFunction(disabled, renderProps)
  const isHidden = getFormSectionFieldBooleanFunction(hidden, renderProps)
  const nextDefaultValue = getFormSectionFieldWithFunctionType(
    defaultValue,
    renderProps
  )

  // Shared props by all fields
  const commonProps = {
    ...rest,
    isNew,
    setValue,
    error: Boolean(get(errors, name)),
    helperText: get(errors, name)?.message || helperText,
    // Resolved values
    disabled: isDisabled,
    hidden: isHidden,
    defaultValue: nextDefaultValue,
  }

  // ==============================
  // Read Only Render
  // ==============================
  if (isReadOnly) {
    const label = injectedLabel || startCase(name)

    // Handle custom render
    const hasRenderReadOnly = typeof renderReadOnly === 'function'

    // Switch statements for managing readOnly mode for each field type
    switch (type) {
      case FormSectionFieldTypeEnum.CHECKBOX_TABLE:
        return (
          <ControlledCheckboxTable
            control={control}
            checkboxTableProps={{ ...checkboxTableProps, isReadOnly: true }}
            {...commonProps}
          />
        )

      case FormSectionFieldTypeEnum.MODEL:
        const modelName = getRelationalObjectKey(name)
        const modelLabel = injectedLabel || startCase(modelName)

        if (!item) return null

        const modelValue = get(item, getRelationalObjectKey(name))

        // Escape if no value found
        if (!isReadOnly && !modelValue) return null

        const modelTitle = get(
          modelValue,
          (fieldProps as Partial<ControlledModelFieldProps>).pk ||
            module.pk ||
            'title'
        )

        if (hasRenderReadOnly) {
          return renderReadOnly({
            item,
            name,
            module,
            label: modelLabel,
            value: modelValue,
            title: modelTitle,
          })
        }

        return (
          <FormSectionReadOnlyStack
            label={modelLabel}
            title={modelTitle}
            sx={readOnlySx}
          />
        )
      case FormSectionFieldTypeEnum.IMAGE:
      case FormSectionFieldTypeEnum.IMAGES:
      case FormSectionFieldTypeEnum.FILES:
        const files = get(item, name)
        return (
          <FormSectionReadOnlyStack
            label={label}
            sx={readOnlySx}
            title={files}
            isFiles
          />
        )
      case FormSectionFieldTypeEnum.CHIP:
        const joinedTitle = get(item, name)?.join(', ')

        if (hasRenderReadOnly) {
          return renderReadOnly({
            item,
            name,
            module,
            label,
            value: joinedTitle,
            title: joinedTitle,
          })
        }

        return (
          <FormSectionReadOnlyStack
            label={label}
            title={joinedTitle}
            sx={readOnlySx}
          />
        )
      case FormSectionFieldTypeEnum.HTML:
        const html = get(item, name)

        return (
          <FormSectionReadOnlyStack
            label={label}
            title={typeof html === 'string' ? <Html html={html} /> : '-'}
            sx={readOnlySx}
          />
        )
      case FormSectionFieldTypeEnum.PERCENTAGE:
        const percentage = printPercentage(get(item, name), { dp: 2 })

        if (hasRenderReadOnly) {
          return renderReadOnly({
            item,
            name,
            module,
            label,
            value: percentage,
            title: percentage,
          })
        }

        return (
          <FormSectionReadOnlyStack
            label={label}
            title={percentage}
            sx={readOnlySx}
          />
        )
      default:
        const title = get(item, name)

        if (hasRenderReadOnly) {
          return renderReadOnly({
            item,
            name,
            module,
            label,
            value: title, // Set value as title
            title,
          })
        }

        return (
          <FormSectionReadOnlyStack
            label={label}
            title={title}
            sx={readOnlySx}
          />
        )
    }
  }

  // ==============================
  // Render
  // ==============================
  const getChildrenJsx = () => {
    switch (type) {
      case FormSectionFieldTypeEnum.CHECKBOX_TABLE:
        return (
          <ControlledCheckboxTable
            control={control}
            checkboxTableProps={checkboxTableProps}
            {...commonProps}
          />
        )
      case FormSectionFieldTypeEnum.RADIO_GROUP:
        return (
          <ControlledRadioGroup
            control={control}
            {...commonProps}
            options={commonProps.options || []}
          />
        )
      case FormSectionFieldTypeEnum.DATE:
        return <ControlledDateField control={control} {...commonProps} />
      case FormSectionFieldTypeEnum.DATE_TIME:
        return <ControlledDateTimeField control={control} {...commonProps} />
      case FormSectionFieldTypeEnum.AMOUNT:
        return <ControlledAmountField control={control} {...commonProps} />
      case FormSectionFieldTypeEnum.PERCENTAGE:
        return <ControlledPercentageField control={control} {...commonProps} />
      case FormSectionFieldTypeEnum.RATE:
        return <ControlledRateField control={control} {...commonProps} />
      case FormSectionFieldTypeEnum.SWITCH:
        return <ControlledSwitchField control={control} {...commonProps} />
      case FormSectionFieldTypeEnum.FILES:
        return (
          <Controller
            control={control}
            render={({ field }) => (
              <StorageFiles
                {...field}
                item={item}
                module={injectedModule as CrudModule} // Product
                storageModule={module} // ProductImage[]
                {...commonProps}
              />
            )}
            {...commonProps}
          />
        )
      case FormSectionFieldTypeEnum.IMAGES:
        return (
          <Controller
            control={control}
            render={({ field }) => (
              <StorageGallery
                {...field}
                item={item}
                module={injectedModule as CrudModule} // Product
                storageModule={module} // ProductImage[]
                {...commonProps}
              />
            )}
            {...commonProps}
          />
        )
      case FormSectionFieldTypeEnum.IMAGE:
        return (
          <Controller
            control={control}
            render={({ field }) => (
              <StorageAvatarWithUpload
                {...field}
                editable
                item={item}
                module={injectedModule as CrudModule}
                onUpload={(savedFilePath) =>
                  setValue(field.name, savedFilePath, { shouldDirty: true })
                }
                {...commonProps}
              />
            )}
            {...commonProps}
          />
        )
      case FormSectionFieldTypeEnum.MODEL:
        return (
          <ControlledModelField
            control={control}
            module={module}
            {...commonProps}
            {...modelFieldProps}
          />
        )
      case FormSectionFieldTypeEnum.CHIP:
        return (
          <ControlledChipField
            control={control}
            {...commonProps}
            {...chipFieldProps}
          />
        )
      case FormSectionFieldTypeEnum.EMAIL:
        return (
          <ControlledTextField
            control={control}
            {...commonProps}
            type="email"
          />
        )
      case FormSectionFieldTypeEnum.PASSWORD:
        return <ControlledPasswordField control={control} {...commonProps} />
      case FormSectionFieldTypeEnum.HTML:
        return <ControlledHtmlField control={control} {...commonProps} />
      case FormSectionFieldTypeEnum.TEXTAREA:
        return (
          <ControlledTextField
            control={control}
            multiline
            rows={4}
            {...commonProps}
          />
        )
      // Dropdowns
      case FormSectionFieldTypeEnum.COUNTRY_CODE:
        return <ControlledCountryCodeField control={control} {...commonProps} />
      case FormSectionFieldTypeEnum.COUNTRY:
        return <ControlledCountryField control={control} {...commonProps} />
      case FormSectionFieldTypeEnum.TEXT:
      case FormSectionFieldTypeEnum.INPUT:
      default:
        return <ControlledTextField control={control} {...commonProps} />
    }
  }
  const childrenJsx = getChildrenJsx()

  return render ? render({ formContext, children: childrenJsx }) : childrenJsx
}

export default renderField
