import React from 'react'
import dynamic from 'next/dynamic'
import get from 'lodash/get'
import startCase from 'lodash/startCase'
import { Controller, UseFormReturn } from 'react-hook-form'
import {
  CrudContextInterface,
  CrudModule,
  UserContextInterface,
} from '@gravis-os/types'
import {
  ControlledTextField,
  RadioGroupProps,
  CheckboxGroupProps,
} from '@gravis-os/fields'
import { printPercentage } from '@gravis-os/utils'
import getFormSectionFieldWithFunctionType from './getFormSectionFieldWithFunctionType'
import getFormSectionFieldRenderProps from './getFormSectionFieldRenderProps'
import getFormSectionFieldBooleanFunction from './getFormSectionFieldBooleanFunction'
import { ControlledModelFieldProps } from '../fields/ControlledModelField'
import FormSectionReadOnlyStack from './FormSectionReadOnlyStack'
import getRelationalObjectKey from '../utils/getRelationalObjectKey'
import { FormSectionFieldProps, FormSectionProps } from './types'
import { FormSectionFieldTypeEnum } from './constants'

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
    disableEdit,
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
    render,

    // These props should be deprecated in favor of `props`
    checkboxTableProps,
    modelFieldProps,
    chipFieldProps,

    props: componentProps,

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
    multiple,
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
      case FormSectionFieldTypeEnum.CHECKBOX_TABLE:
        const DynamicControlledCheckboxTable = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledCheckboxTable
          )
        )
        return (
          <DynamicControlledCheckboxTable
            control={control}
            checkboxTableProps={{ ...checkboxTableProps, isReadOnly: true }}
            {...commonProps}
          />
        )
      case FormSectionFieldTypeEnum.MODEL:
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
            ? modelValue.map(getModelTitle)
            : getModelTitle(modelValue)

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

        if (hasRenderReadOnly) {
          return renderReadOnly({
            item,
            name,
            module,
            label,
            value: files,
            title: label,
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
            label={label}
            sx={readOnlySx}
            files={files}
            fileProps={{
              bucketName,
            }}
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

        const DynamicHtml = dynamic(() =>
          import('@gravis-os/ui').then((module) => module.Html)
        )

        return (
          <FormSectionReadOnlyStack
            label={label}
            title={typeof html === 'string' ? <DynamicHtml html={html} /> : '-'}
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
        const DynamicControlledCheckboxTable = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledCheckboxTable
          )
        )
        return (
          <DynamicControlledCheckboxTable
            control={control}
            checkboxTableProps={checkboxTableProps}
            {...commonProps}
          />
        )
      case FormSectionFieldTypeEnum.RADIO:
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
      case FormSectionFieldTypeEnum.JSON:
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
      case FormSectionFieldTypeEnum.CHECKBOX:
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
      case FormSectionFieldTypeEnum.DATE:
        const DynamicControlledDateField = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledDateField
          )
        )
        return <DynamicControlledDateField control={control} {...commonProps} />
      case FormSectionFieldTypeEnum.DATE_TIME:
        const DynamicControlledDateTimeField = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledDateTimeField
          )
        )
        return (
          <DynamicControlledDateTimeField control={control} {...commonProps} />
        )
      case FormSectionFieldTypeEnum.TIME:
        const DynamicControlledTimeField = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledTimeField
          )
        )
        return <DynamicControlledTimeField control={control} {...commonProps} />
      case FormSectionFieldTypeEnum.TIME_RANGE:
        const DynamicControlledTimeRangeField = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledTimeRangeField
          )
        )
        return (
          <DynamicControlledTimeRangeField control={control} {...commonProps} />
        )
      case FormSectionFieldTypeEnum.AMOUNT:
        const DynamicControlledAmountField = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledAmountField
          )
        )
        return (
          <DynamicControlledAmountField control={control} {...commonProps} />
        )
      case FormSectionFieldTypeEnum.PERCENTAGE:
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
      case FormSectionFieldTypeEnum.RATE:
        const DynamicControlledRateField = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledRateField
          )
        )
        return <DynamicControlledRateField control={control} {...commonProps} />
      case FormSectionFieldTypeEnum.SWITCH:
        const DynamicControlledSwitchField = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledSwitchField
          )
        )
        return (
          <DynamicControlledSwitchField control={control} {...commonProps} />
        )
      case FormSectionFieldTypeEnum.FILES:
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
      case FormSectionFieldTypeEnum.IMAGES:
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
      case FormSectionFieldTypeEnum.IMAGE:
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
      case FormSectionFieldTypeEnum.MODEL:
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
      case FormSectionFieldTypeEnum.CHIP:
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
      case FormSectionFieldTypeEnum.PASSWORD:
        const DynamicControlledPasswordField = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledPasswordField
          )
        )
        return (
          <DynamicControlledPasswordField control={control} {...commonProps} />
        )
      case FormSectionFieldTypeEnum.HTML:
        const DynamicControlledHtmlField = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledHtmlField
          )
        )
        return <DynamicControlledHtmlField control={control} {...commonProps} />
      case FormSectionFieldTypeEnum.COUNTRY_CODE:
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
      case FormSectionFieldTypeEnum.COUNTRY:
        const DynamicControlledCountryField = dynamic(() =>
          import('@gravis-os/fields').then(
            (module) => module.ControlledCountryField
          )
        )
        return (
          <DynamicControlledCountryField control={control} {...commonProps} />
        )
      case FormSectionFieldTypeEnum.EMAIL:
        return (
          <ControlledTextField
            control={control}
            {...commonProps}
            type="email"
          />
        )
      case FormSectionFieldTypeEnum.MOBILE:
        return (
          <ControlledTextField
            control={control}
            {...commonProps}
            type="tel"
            inputProps={{
              pattern: '^[0-9]*$',
              title: 'Please enter numbers only.',
            }}
          />
        )
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

  const childrenJsx = getChildrenJsx()

  return render ? render({ formContext, children: childrenJsx }) : childrenJsx
}

export default renderField
