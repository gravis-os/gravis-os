import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Grid, GridProps, Card, CardProps } from '@gravis-os/ui'
import { StorageAvatarWithUpload, StorageDropzone } from '@gravis-os/storage'
import ControlledAmountField from './ControlledAmountField'
import ControlledRateField from './ControlledRateField'
import ControlledSwitchField from './ControlledSwitchField'
import { CrudItem, CrudModule } from '../types'
import ModelField from './ModelField'
import ControlledTextField from './ControlledTextField'
import FieldEffectProvider from './FieldEffectProvider'
import ControlledPercentageField from './ControlledPercentageField'
import ControlledPasswordField from './ControlledPasswordField'
import ControlledHtmlField from './ControlledHtmlField'

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
}

export interface FormSectionProps extends Omit<CardProps, 'hidden'> {
  key: string
  fields: FormSectionField[] | any // Recursive type
  gridProps?: GridProps

  item?: CrudItem
  isNew?: boolean
  isPreview?: boolean
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
    ...rest
  } = props

  // Form
  const formContext = useFormContext()
  if (!formContext) return null
  const { control, setValue } = formContext

  // Render Form Field
  const renderFormField = (formField) => {
    const { type, module, ...rest } = formField
    const { name, disabled } = rest

    // Calculate if the field is in disabledFields, else fallback to disableProp is available
    const nextDisabled = Boolean(disabledFields?.includes(name)) || disabled

    // Shared props by all fields
    const commonProps = {
      ...rest,
      isNew,
      setValue,
      ...(disabledFields?.length && { disabled: nextDisabled }),
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
      case 'images':
        return (
          <Controller
            control={control}
            render={({ field }) => (
              <StorageDropzone
                {...field}
                editable
                item={item}
                module={injectedModule as CrudModule} // Product
                storageModule={module} // ProductImage[]
                // TODO@Joel: Handle if new item i.e. Product.id does not exist. Need to defer this.
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
          <Controller
            control={control}
            render={({ field }) => (
              <ModelField
                {...field}
                module={module}
                setValue={setValue}
                {...commonProps}
              />
            )}
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
  const renderField = (field) => {
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
    const renderFieldJsx = () => {
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
            renderField({
              ...f,
              gridProps: { md: 12 / gridFieldColumns, ...f.gridProps },
            })
          )
        // Default Field Render based on object shape
        default:
          return <Grid {...gridItemProps}>{renderFormField(rest)}</Grid>
      }
    }
    const fieldJsx = renderFieldJsx()

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
    <Grid container spacing={2}>
      {fields.map(renderField)}
    </Grid>
  )

  return (
    <Grid item xs={12} {...gridProps}>
      {disableCard ? sectionJsx : <Card {...rest}>{sectionJsx}</Card>}
    </Grid>
  )
}

export default FormSection
