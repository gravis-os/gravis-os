import React from 'react'
import startCase from 'lodash/startCase'
import { Controller, UseFormReturn } from 'react-hook-form'
import {
  StorageAvatarWithUpload,
  StorageFiles,
  StorageGallery,
} from '@gravis-os/storage'
import { GridProps } from '@gravis-os/ui'
import getRelationalObjectKey from '../utils/getRelationalObjectKey'
import FormSectionReadOnlyStack from './FormSectionReadOnlyStack'
import ControlledAmountField from '../fields/ControlledAmountField'
import ControlledPercentageField from '../fields/ControlledPercentageField'
import ControlledRateField from '../fields/ControlledRateField'
import ControlledSwitchField from '../fields/ControlledSwitchField'
import ControlledModelField from '../fields/ControlledModelField'
import ControlledPasswordField from '../fields/ControlledPasswordField'
import ControlledHtmlField from '../fields/ControlledHtmlField'
import ControlledTextField from '../fields/ControlledTextField'
import { CrudModule } from '../../types'
import { FormSectionProps } from './FormSection'
import { FieldEffectOptions } from './FieldEffectProvider'

export enum FormSectionFieldTypeEnum {
  // String
  HTML = 'html',
  INPUT = 'input',
  PASSWORD = 'password',
  TEXTAREA = 'textarea',
  TEXT = 'text', // alias for input

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
}

export type FormSectionFieldBooleanFunction = ({
  isNew,
  isPreview,
  isDetail,
}: {
  isNew: boolean
  isPreview: boolean
  isDetail: boolean
  formContext: UseFormReturn
}) => boolean

export interface FormSectionFieldProps {
  // Core
  key: string
  name: string
  label?: string
  type?: FormSectionFieldTypeEnum | string // Should not have string type but adding so as to prevent having to TS casting downstream
  module?: CrudModule

  // Manage layout
  gridProps?: GridProps

  // Manage state
  hidden?: boolean | FormSectionFieldBooleanFunction
  disabled?: boolean | FormSectionFieldBooleanFunction

  // For setting value
  fieldEffect?: FieldEffectOptions

  // Filters
  op?: string
  filterKey?: string
}

export interface RenderFieldProps {
  formContext: UseFormReturn
  sectionProps: FormSectionProps
  fieldProps: FormSectionFieldProps
}

/**
 * Render FormSection Field
 */
const renderField = (props: RenderFieldProps) => {
  const { formContext, sectionProps, fieldProps } = props
  const { control, setValue } = formContext
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
  const { type, module, key, gridProps, fieldEffect, ...rest } = fieldProps
  const { name, disabled, hidden, label: injectedLabel } = rest

  // Calculate if the field is in disabledFields, else fallback to check if the disabled prop is defined
  const isDisabled = Boolean(
    disabledFields?.includes(name) || typeof disabled === 'function'
      ? (disabled as FormSectionFieldBooleanFunction)({
          isNew,
          isPreview,
          isDetail: !isNew && !isPreview,
          formContext,
        })
      : disabled
  )

  // Shared props by all fields
  const commonProps = {
    ...rest,
    isNew,
    setValue,
    disabled: isDisabled,
    hidden: hidden as boolean, // Cast as boolean. Typing purposes
  }

  if (isReadOnly) {
    const label = injectedLabel || startCase(name)

    // Handle custom render
    const hasRenderReadOnly = typeof renderReadOnly === 'function'

    switch (type) {
      case FormSectionFieldTypeEnum.MODEL:
        const modelName = getRelationalObjectKey(name)
        const modelLabel = injectedLabel || startCase(modelName)

        if (!item) return null

        const modelValue = item[getRelationalObjectKey(name)]

        // Escape if no value found
        if (!modelValue) return null

        const modelTitle = modelValue[module.pk || 'title']

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
      default:
        const title = item?.[name]

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
  switch (type) {
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
              onUpload={(savedFilePath) => setValue(field.name, savedFilePath)}
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
    case FormSectionFieldTypeEnum.TEXT:
    case FormSectionFieldTypeEnum.INPUT:
    default:
      return <ControlledTextField control={control} {...commonProps} />
  }
}

export default renderField
