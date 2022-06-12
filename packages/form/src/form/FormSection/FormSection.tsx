import React from 'react'
import startCase from 'lodash/startCase'
import { Controller, useFormContext, UseFormReturn } from 'react-hook-form'
import {
  ButtonProps,
  Card,
  CardProps,
  Grid,
  GridProps,
  StackProps,
} from '@gravis-os/ui'
import {
  StorageAvatarWithUpload,
  StorageFiles,
  StorageGallery,
} from '@gravis-os/storage'
import ControlledAmountField from '../fields/ControlledAmountField'
import ControlledRateField from '../fields/ControlledRateField'
import ControlledSwitchField from '../fields/ControlledSwitchField'
import ControlledModelField from '../fields/ControlledModelField'
import { CrudItem, CrudModule, RenderPropsFunction } from '../../types'
import ControlledTextField from '../fields/ControlledTextField'
import FieldEffectProvider, {
  FieldEffectOptions,
  FieldEffectProviderProps,
} from './FieldEffectProvider'
import ControlledPercentageField from '../fields/ControlledPercentageField'
import ControlledPasswordField from '../fields/ControlledPasswordField'
import ControlledHtmlField from '../fields/ControlledHtmlField'
import getRelationalObjectKey from '../utils/getRelationalObjectKey'
import FormSectionReadOnlyStack from './FormSectionReadOnlyStack'

export interface FormSectionRenderReadOnlyProps {
  item?: Record<string, unknown>
  name: string
  module: CrudModule
  label: string
  value: Record<string, React.ReactNode>
  title: string
}

export type FormSectionFieldFunction = ({
  isNew,
  isPreview,
  isDetail,
}: {
  isNew: boolean
  isPreview: boolean
  isDetail: boolean
}) => boolean

export interface FormSectionField {
  key: string
  name: string
  label?: string
  type?: string // 'input' | 'model'
  module?: CrudModule
  gridProps?: GridProps
  hidden?: boolean | FormSectionFieldFunction
  disabled?: boolean | FormSectionFieldFunction
  fieldEffect?: FieldEffectOptions

  // Filters
  op?: string
  filterKey?: string
}

export interface FormSectionProps extends Omit<CardProps, 'hidden'> {
  key: string
  fields: FormSectionField[] | FormSectionField[][] // Recursive nested type
  gridProps?: GridProps

  item?: CrudItem
  isNew?: boolean
  isPreview?: boolean

  // Read Only
  isReadOnly?: boolean
  readOnlySx?: StackProps['sx']
  renderReadOnly?: RenderPropsFunction<FormSectionRenderReadOnlyProps>

  actionButtons?: ButtonProps[]

  disableCard?: boolean
  module?: CrudModule
  disabledFields?: string[]
}

interface RenderFieldProps {
  formContext: UseFormReturn
  sectionProps: FormSectionProps
  fieldProps: FormSectionField
}
/**
 * Render Form Field
 */
const renderField = (props: RenderFieldProps) => {
  const { formContext, sectionProps, fieldProps } = props
  const { control, setValue } = formContext
  const {
    isNew,
    isReadOnly,
    item,
    disabledFields,
    renderReadOnly,
    readOnlySx,
    module: injectedModule,
  } = sectionProps
  const { type, module, key, gridProps, fieldEffect, hidden, ...rest } =
    fieldProps
  const { name, disabled, label: injectedLabel } = rest

  // Calculate if the field is in disabledFields, else fallback to check if the disabled prop is defined
  const isDisabled = Boolean(disabledFields?.includes(name) || disabled)

  // Shared props by all fields
  const commonProps = {
    ...rest,
    isNew,
    setValue,
    ...(disabledFields?.length && { disabled: isDisabled }),
  }

  if (isReadOnly) {
    const label = injectedLabel || startCase(name)

    switch (type) {
      case 'files':
        return 'Hello W!'
      case 'model':
        const modelName = getRelationalObjectKey(name)
        const modelLabel = injectedLabel || startCase(modelName)

        if (!item) return null

        const modelValue = item[getRelationalObjectKey(name)]

        // Escape if no value found
        if (!modelValue) return null

        const title = modelValue[module.pk || 'title']

        if (renderReadOnly) {
          return renderReadOnly({
            item,
            name,
            module,
            label: modelLabel,
            value: modelValue,
            title,
          })
        }
        return (
          <FormSectionReadOnlyStack
            label={modelLabel}
            title={title}
            sx={readOnlySx}
          />
        )
      default:
        return (
          <FormSectionReadOnlyStack
            label={label}
            title={item?.[name]}
            sx={readOnlySx}
          />
        )
    }
  }

  // ==============================
  // Render
  // ==============================
  switch (type) {
    case 'amount':
      return <ControlledAmountField control={control} {...commonProps} />
    case 'percentage':
      return <ControlledPercentageField control={control} {...commonProps} />
    case 'rate':
      return <ControlledRateField control={control} {...commonProps} />
    case 'switch':
      return <ControlledSwitchField control={control} {...commonProps} />
    case 'files':
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
    case 'images':
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
    case 'image':
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
    case 'model':
      return (
        <ControlledModelField
          control={control}
          module={module}
          {...commonProps}
        />
      )
    case 'password':
      return <ControlledPasswordField control={control} {...commonProps} />
    case 'html':
      return <ControlledHtmlField control={control} {...commonProps} />
    case 'textarea':
      return (
        <ControlledTextField
          control={control}
          multiline
          rows={4}
          {...commonProps}
        />
      )
    default:
      return <ControlledTextField control={control} {...commonProps} />
  }
}

export interface FormSectionJsxFieldProps {
  formContext: UseFormReturn
  item: FormSectionProps['item']
  isNew: FormSectionProps['isNew']
}

// Render Field (contains recursion)
interface RenderFieldWithWrapperProps
  extends Omit<RenderFieldProps, 'fieldProps'> {
  fieldProps: FormSectionField | FormSectionField[] | React.ReactElement
}
const renderFieldWithWrapper = (props: RenderFieldWithWrapperProps) => {
  const { formContext, sectionProps, fieldProps } = props
  const { gridProps, isNew, isPreview, item } = sectionProps

  /**
   * Handle Recursion case
   * Field is wrapped in an array for gridding
   * Activate Grids when field is an array
   */
  const isGridField = Array.isArray(fieldProps)
  if (isGridField) {
    // This field object is an array of fields if isGridField === true
    const fields = fieldProps as FormSectionField[]
    const gridFieldColumns = fields.length
    return fields.map((field) =>
      renderFieldWithWrapper({
        ...props,
        sectionProps: {
          ...sectionProps,
          gridProps: { md: 12 / gridFieldColumns, ...field.gridProps },
        },
        fieldProps: {
          ...field,
        },
      })
    )
  }

  /**
   * Handle JSX case
   * Render custom Jsx
   * Custom JSX, injected props and render the JSX directly
   */
  const isJsxField = React.isValidElement(fieldProps)
  if (isJsxField) {
    return (
      <Grid item xs={12} {...gridProps} sx={{ mb: 3, ...gridProps?.sx }}>
        {React.cloneElement<FormSectionJsxFieldProps>(
          fieldProps as React.ReactElement,
          {
            formContext,
            item,
            isNew,
          }
        )}
      </Grid>
    )
  }

  const { key, fieldEffect, hidden } = fieldProps

  // Hide field
  const shouldHide =
    hidden &&
    (typeof hidden === 'function'
      ? hidden({ isNew, isPreview, isDetail: !isNew && !isPreview })
      : hidden)
  if (shouldHide) return null

  // Define children
  const childrenJsx = (
    <Grid item xs={12} key={key} {...gridProps}>
      {renderField(props as RenderFieldProps)}
    </Grid>
  )

  // Render with fieldEffect
  const hasFieldEffect = Boolean(fieldEffect)
  if (hasFieldEffect) {
    const fieldEffectProviderProps: FieldEffectProviderProps = {
      item,
      ...(fieldProps as FormSectionField),
      fieldEffect,
      children: childrenJsx,
      formContext,
    }
    return <FieldEffectProvider {...fieldEffectProviderProps} />
  }

  // Default render
  return childrenJsx
}

const FormSection: React.FC<FormSectionProps> = (props) => {
  const {
    disabledFields,
    disableCard,
    item,
    isNew,
    isPreview,
    gridProps,
    fields,

    // Read Only
    isReadOnly,
    readOnlySx,
    renderReadOnly,

    ...rest
  } = props

  // Form
  const formContext = useFormContext()
  if (!formContext) return null

  // Children is wrapped in a Grid container
  const childrenJsx = (
    <Grid container spacing={2}>
      {fields.map((field) =>
        renderFieldWithWrapper({
          formContext,
          sectionProps: props,
          fieldProps: field,
        })
      )}
    </Grid>
  )

  return (
    <Grid item xs={12} {...gridProps}>
      {disableCard ? childrenJsx : <Card {...rest}>{childrenJsx}</Card>}
    </Grid>
  )
}

export default FormSection
