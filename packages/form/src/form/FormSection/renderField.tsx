import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'

import {
  CheckboxGroupProps,
  ControlledTextField,
  RadioGroupProps,
} from '@gravis-os/fields'
import {
  CrudContextInterface,
  CrudModule,
  UserContextInterface,
} from '@gravis-os/types'
import { printPercentage } from '@gravis-os/utils'
import get from 'lodash/get'
import startCase from 'lodash/startCase'
import dynamic from 'next/dynamic'

import { ControlledModelFieldProps } from '../fields/ControlledModelField'
import getRelationalObjectKey from '../utils/getRelationalObjectKey'
import { FormSectionFieldTypeEnum } from './constants'
import FormSectionReadOnlyStack from './FormSectionReadOnlyStack'
import getFormSectionFieldBooleanFunction from './getFormSectionFieldBooleanFunction'
import getFormSectionFieldRenderProps from './getFormSectionFieldRenderProps'
import getFormSectionFieldWithFunctionType from './getFormSectionFieldWithFunctionType'
import { FormSectionFieldProps, FormSectionProps } from './types'

export interface RenderFieldProps {
  crudContext?: CrudContextInterface // Available if Form is used in CrudForm
  fieldProps: FormSectionFieldProps
  formContext: UseFormReturn
  sectionProps: FormSectionProps
  userContext?: UserContextInterface // Available if Form is used in CrudForm
}

/**
 * Render FormSection Field
 */
const renderField = (props: RenderFieldProps) => {
  const { fieldProps, formContext, sectionProps } = props
  const { control, formState, setValue } = formContext
  const { errors } = formState

  const {
    disabledFields,
    disableEdit,
    isNew,
    isPreview,
    isReadOnly,
    item,
    module: injectedModule,
    readOnlySx,
    renderReadOnly,
  } = sectionProps
  const {
    // These props should be deprecated in favor of `props`
    checkboxTableProps,
    chipFieldProps,
    fieldEffect,
    formatDateTimeValue,
    gridProps,
    key,

    modelFieldProps,
    module,
    props: componentProps,

    render,
    type,

    ...rest
  } = fieldProps
  const {
    defaultValue,
    disabled,
    helperText,
    hidden,
    label: injectedLabel,
    multiple,
    name,
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
    defaultValue: nextDefaultValue,
    // Resolved values
    disabled: isDisabled,
    error: Boolean(get(errors, name)),
    helperText: get(errors, name)?.message || helperText,
    hidden: isHidden,
    isNew,
    setValue,
    ...componentProps,
  }

  // ==============================
  // Read Only Render
  // In edit mode, isReadOnly is false, so for an immutable field,
  // it will still stay uneditable with disableEdit flag
  // If disableEdit is not specified, it has no effects
  // ==============================
  if (isReadOnly || disableEdit) {
    const label = injectedLabel || startCase(name)

    // Handle custom render
    const hasRenderReadOnly = typeof renderReadOnly === 'function'

    // Switch statements for managing readOnly mode for each field type
    switch (type) {
      case FormSectionFieldTypeEnum.CHECKBOX_TABLE: {
        const DynamicControlledCheckboxTable = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledCheckboxTable
          )
        )
        return (
          <DynamicControlledCheckboxTable
            checkboxTableProps={{ ...checkboxTableProps, isReadOnly: true }}
            control={control}
            {...commonProps}
          />
        )
      }
      case FormSectionFieldTypeEnum.MODEL: {
        const modelName = getRelationalObjectKey(name)
        const modelLabel = injectedLabel || startCase(modelName)

        if (!item) return null

        // In partitionManyToManyValues.ts, the formValues's keys are checked
        // based on the subfix `ids` e.g for warehouses of a product, the key
        // has to be `warehouse_ids`, but `getRelationalObjectKey` will remove
        // the subfix, so we need to check both the raw and processed `name`
        const modelValue = get(item, modelName) || get(item, name)

        // Escape if no value found
        if (!disableEdit && !isReadOnly && !modelValue) return null
        const getModelTitle = (value) =>
          get(
            value,
            (fieldProps as Partial<ControlledModelFieldProps>).pk ||
              module.pk ||
              'title'
          )
        const modelTitle =
          multiple && Array.isArray(modelValue)
            ? modelValue.map((modelVal) => getModelTitle(modelVal))
            : getModelTitle(modelValue)

        if (hasRenderReadOnly) {
          return renderReadOnly({
            title: modelTitle,
            item,
            label: modelLabel,
            module,
            name,
            value: modelValue,
          })
        }
        return (
          <FormSectionReadOnlyStack
            label={modelLabel}
            sx={readOnlySx}
            title={modelTitle}
          />
        )
      }
      case FormSectionFieldTypeEnum.IMAGE:
      case FormSectionFieldTypeEnum.IMAGES:
      case FormSectionFieldTypeEnum.FILES: {
        const files = get(item, name)

        if (hasRenderReadOnly) {
          return renderReadOnly({
            title: label,
            item,
            label,
            module,
            name,
            value: files,
          })
        }

        const { bucketName } = fieldProps
        const FormSectionReadOnlyFiles = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.FormSectionReadOnlyFiles
          )
        )
        return (
          <FormSectionReadOnlyFiles
            fileProps={{
              bucketName,
            }}
            files={files}
            label={label}
            sx={readOnlySx}
          />
        )
      }
      case FormSectionFieldTypeEnum.CHIP: {
        const joinedTitle = get(item, name)?.join(', ')

        if (hasRenderReadOnly) {
          return renderReadOnly({
            title: joinedTitle,
            item,
            label,
            module,
            name,
            value: joinedTitle,
          })
        }

        return (
          <FormSectionReadOnlyStack
            label={label}
            sx={readOnlySx}
            title={joinedTitle}
          />
        )
      }
      case FormSectionFieldTypeEnum.HTML: {
        const html = get(item, name)

        const DynamicHtml = dynamic(() =>
          import('@gravis-os/ui').then((module) => module.Html)
        )

        return (
          <FormSectionReadOnlyStack
            label={label}
            sx={readOnlySx}
            title={typeof html === 'string' ? <DynamicHtml html={html} /> : '-'}
          />
        )
      }
      case FormSectionFieldTypeEnum.PERCENTAGE: {
        const percentage = printPercentage(get(item, name), { dp: 2 })

        if (hasRenderReadOnly) {
          return renderReadOnly({
            title: percentage,
            item,
            label,
            module,
            name,
            value: percentage,
          })
        }

        return (
          <FormSectionReadOnlyStack
            label={label}
            sx={readOnlySx}
            title={percentage}
          />
        )
      }
      default: {
        const title = formatDateTimeValue
          ? formatDateTimeValue(item)
          : get(item, name)

        if (hasRenderReadOnly) {
          return renderReadOnly({
            title,
            item,
            label,
            module,
            name,
            value: title, // Set value as title
          })
        }

        return (
          <FormSectionReadOnlyStack
            label={label}
            sx={readOnlySx}
            title={title}
          />
        )
      }
    }
  }

  // ==============================
  // Render
  // ==============================
  const getChildrenJsx = () => {
    switch (type) {
      case FormSectionFieldTypeEnum.CHECKBOX_TABLE: {
        const DynamicControlledCheckboxTable = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledCheckboxTable
          )
        )
        return (
          <DynamicControlledCheckboxTable
            checkboxTableProps={checkboxTableProps}
            control={control}
            {...commonProps}
          />
        )
      }
      case FormSectionFieldTypeEnum.RADIO: {
        const DynamicControlledRadioGroup = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledRadioGroup
          )
        )
        return (
          <DynamicControlledRadioGroup
            control={control}
            {...commonProps}
            options={(commonProps.options || []) as RadioGroupProps['options']}
          />
        )
      }
      case FormSectionFieldTypeEnum.JSON: {
        const DynamicControlledJsonField = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledJsonField
          )
        )
        return (
          <DynamicControlledJsonField
            control={control}
            module={injectedModule as CrudModule}
            {...commonProps}
          />
        )
      }
      case FormSectionFieldTypeEnum.CHECKBOX: {
        const DynamicControlledCheckboxGroup = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledCheckboxGroup
          )
        )
        return (
          <DynamicControlledCheckboxGroup
            control={control}
            {...commonProps}
            options={
              (commonProps.options || []) as CheckboxGroupProps['options']
            }
          />
        )
      }
      case FormSectionFieldTypeEnum.DATE: {
        const DynamicControlledDateField = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledDateField
          )
        )
        return <DynamicControlledDateField control={control} {...commonProps} />
      }
      case FormSectionFieldTypeEnum.DATE_TIME: {
        const DynamicControlledDateTimeField = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledDateTimeField
          )
        )
        return (
          <DynamicControlledDateTimeField control={control} {...commonProps} />
        )
      }
      case FormSectionFieldTypeEnum.TIME: {
        const DynamicControlledTimeField = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledTimeField
          )
        )
        return <DynamicControlledTimeField control={control} {...commonProps} />
      }
      case FormSectionFieldTypeEnum.TIME_RANGE: {
        const DynamicControlledTimeRangeField = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledTimeRangeField
          )
        )
        return (
          <DynamicControlledTimeRangeField control={control} {...commonProps} />
        )
      }
      case FormSectionFieldTypeEnum.AMOUNT: {
        const DynamicControlledAmountField = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledAmountField
          )
        )
        return (
          <DynamicControlledAmountField control={control} {...commonProps} />
        )
      }
      case FormSectionFieldTypeEnum.PERCENTAGE: {
        const DynamicControlledPercentageField = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledPercentageField
          )
        )
        return (
          <DynamicControlledPercentageField
            control={control}
            {...commonProps}
          />
        )
      }
      case FormSectionFieldTypeEnum.RATE: {
        const DynamicControlledRateField = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledRateField
          )
        )
        return <DynamicControlledRateField control={control} {...commonProps} />
      }
      case FormSectionFieldTypeEnum.SWITCH: {
        const DynamicControlledSwitchField = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledSwitchField
          )
        )
        return (
          <DynamicControlledSwitchField control={control} {...commonProps} />
        )
      }
      case FormSectionFieldTypeEnum.FILES: {
        const DynamicStorageFiles = dynamic(() =>
          import('@gravis-os/storage').then((module) => module.StorageFiles)
        )
        return (
          <Controller
            control={control}
            render={({ field }) => (
              <DynamicStorageFiles
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
      }
      case FormSectionFieldTypeEnum.IMAGES: {
        const DynamicStorageGallery = dynamic(() =>
          import('@gravis-os/storage').then((module) => module.StorageGallery)
        )
        return (
          <Controller
            control={control}
            render={({ field }) => (
              <DynamicStorageGallery
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
      }
      case FormSectionFieldTypeEnum.IMAGE: {
        const DynamicStorageAvatarWithUpload = dynamic(() =>
          import('@gravis-os/storage').then(
            (module) => module.StorageAvatarWithUpload
          )
        )
        return (
          <Controller
            control={control}
            render={({ field }) => (
              <DynamicStorageAvatarWithUpload
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
      }
      case FormSectionFieldTypeEnum.MODEL: {
        const DynamicControlledModelField = dynamic(
          () => import('../fields/ControlledModelField')
        )
        return (
          <DynamicControlledModelField
            control={control}
            module={module}
            {...commonProps}
            {...modelFieldProps}
          />
        )
      }
      case FormSectionFieldTypeEnum.CHIP: {
        const DynamicControlledChipField = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledChipField
          )
        )
        return (
          <DynamicControlledChipField
            control={control}
            {...commonProps}
            {...chipFieldProps}
          />
        )
      }
      case FormSectionFieldTypeEnum.PASSWORD: {
        const DynamicControlledPasswordField = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledPasswordField
          )
        )
        return (
          <DynamicControlledPasswordField control={control} {...commonProps} />
        )
      }
      case FormSectionFieldTypeEnum.HTML: {
        const DynamicControlledHtmlField = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledHtmlField
          )
        )
        return <DynamicControlledHtmlField control={control} {...commonProps} />
      }
      case FormSectionFieldTypeEnum.COUNTRY_CODE: {
        const DynamicControlledCountryCodeField = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledCountryCodeField
          )
        )
        return (
          <DynamicControlledCountryCodeField
            control={control}
            {...commonProps}
          />
        )
      }
      case FormSectionFieldTypeEnum.COUNTRY: {
        const DynamicControlledCountryField = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledCountryField
          )
        )
        return (
          <DynamicControlledCountryField control={control} {...commonProps} />
        )
      }
      case FormSectionFieldTypeEnum.EMAIL: {
        return (
          <ControlledTextField
            control={control}
            {...commonProps}
            type="email"
          />
        )
      }
      case FormSectionFieldTypeEnum.MOBILE: {
        return (
          <ControlledTextField
            control={control}
            {...commonProps}
            inputProps={{
              title: 'Please enter numbers only.',
              pattern: '^[0-9]*$',
            }}
            type="tel"
          />
        )
      }
      case FormSectionFieldTypeEnum.TEXTAREA: {
        return (
          <ControlledTextField
            control={control}
            multiline
            rows={4}
            {...commonProps}
          />
        )
      }
      case FormSectionFieldTypeEnum.TEXT:
      case FormSectionFieldTypeEnum.INPUT:
      default: {
        return <ControlledTextField control={control} {...commonProps} />
      }
    }
  }

  const childrenJsx = getChildrenJsx()

  return render ? render({ children: childrenJsx, formContext }) : childrenJsx
}

export default renderField
