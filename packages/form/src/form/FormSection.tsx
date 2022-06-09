import React from 'react'
import startCase from 'lodash/startCase'
import { Controller, useFormContext } from 'react-hook-form'
import { Card, CardProps, Grid, GridProps, StackProps } from '@gravis-os/ui'
import {
  StorageAvatarWithUpload,
  StorageFiles,
  StorageGallery,
} from '@gravis-os/storage'
import ControlledAmountField from './ControlledAmountField'
import ControlledRateField from './ControlledRateField'
import ControlledSwitchField from './ControlledSwitchField'
import ControlledModelField from './ControlledModelField'
import { CrudItem, CrudModule, RenderPropsFunction } from '../types'
import ControlledTextField from './ControlledTextField'
import FieldEffectProvider from './FieldEffectProvider'
import ControlledPercentageField from './ControlledPercentageField'
import ControlledPasswordField from './ControlledPasswordField'
import ControlledHtmlField from './ControlledHtmlField'
import getRelationalObjectKey from './getRelationalObjectKey'
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
  type?: string // 'input' | 'model'
  module?: CrudModule
  gridProps?: GridProps
  hidden?: boolean | FormSectionFieldFunction
  disabled?: boolean | FormSectionFieldFunction

  // Filters
  op?: string
  filterKey?: string
}

export interface FormSectionProps extends Omit<CardProps, 'hidden'> {
  key: string
  fields: FormSectionField[] | any // Recursive type
  gridProps?: GridProps

  item?: CrudItem
  isNew?: boolean
  isPreview?: boolean

  // Read Only
  isReadOnly?: boolean
  readOnlySx?: StackProps['sx']
  renderReadOnly?: RenderPropsFunction<FormSectionRenderReadOnlyProps>

  disableCard?: boolean
  module?: CrudModule
  disabledFields?: string[]
}

const FormSection: React.FC<FormSectionProps> = (props) => {
  const {
    disabledFields,
    disableCard,
    item,
    isNew,
    isPreview,
    module: injectedModule,
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
  const { control, setValue } = formContext

  /**
   * Render Form Field
   */
  const renderField = (args) => {
    const { type, module, ...rest } = args
    const { name, disabled, label: injectedLabel } = rest

    // Calculate if the field is in disabledFields, else fallback to disableProp is available
    const nextDisabled = Boolean(disabledFields?.includes(name)) || disabled

    // Shared props by all fields
    const commonProps = {
      ...rest,
      isNew,
      setValue,
      ...(disabledFields?.length && { disabled: nextDisabled }),
    }

    if (isReadOnly) {
      const label = injectedLabel || startCase(name)

      switch (type) {
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
                editable
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
                editable
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
                onUpload={(savedFilePath) =>
                  setValue(field.name, savedFilePath)
                }
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

  // Render Field
  const renderFieldWithWrapper = (field) => {
    const { key, gridProps, fieldEffect, hidden, ...rest } = field

    // Hide field
    const shouldHide =
      hidden &&
      (typeof hidden === 'function'
        ? hidden({ isNew, isPreview, isDetail: !isNew && !isPreview })
        : hidden)
    if (shouldHide) return null

    // Activate Grids when field is an array
    const isGridField = Array.isArray(field)

    // Render custom Jsx
    const isJsxField = React.isValidElement(field)

    // Render with field effect
    const hasFieldEffect = Boolean(fieldEffect)

    // Grid item props
    const gridItemProps = {
      key,
      item: true,
      xs: 12,
      ...gridProps,
    }

    // Construct switch
    const renderFieldWrapperJsx = () => {
      switch (true) {
        // Custom JSX, injected props and render the JSX directly
        case isJsxField:
          return (
            <Grid {...gridItemProps} sx={{ mb: 3, ...gridItemProps.sx }}>
              {React.cloneElement(field, { ...formContext, item, isNew })}
            </Grid>
          )
        // Field is wrapped in an array for gridding
        case isGridField:
          const gridFieldColumns = field.length
          return field.map((f) =>
            renderFieldWithWrapper({
              ...f,
              gridProps: { md: 12 / gridFieldColumns, ...f.gridProps },
            })
          )
        // Default Field Render based on object shape
        default:
          return <Grid {...gridItemProps}>{renderField(rest)}</Grid>
      }
    }
    const fieldJsx = renderFieldWrapperJsx()

    // Wrappers
    if (hasFieldEffect) {
      return (
        <FieldEffectProvider item={item} {...field} {...formContext}>
          {fieldJsx}
        </FieldEffectProvider>
      )
    }

    return fieldJsx
  }

  const sectionJsx = (
    <Grid container spacing={2} {...gridProps}>
      {fields.map(renderFieldWithWrapper)}
    </Grid>
  )

  return (
    <Grid item xs={12} {...gridProps}>
      {disableCard ? sectionJsx : <Card {...rest}>{sectionJsx}</Card>}
    </Grid>
  )
}

export default FormSection
