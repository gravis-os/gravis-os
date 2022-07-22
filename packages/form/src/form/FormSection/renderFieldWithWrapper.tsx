import React from 'react'
import { Grid } from '@gravis-os/ui'
import { UseFormReturn } from 'react-hook-form'
import FieldEffectProvider, {
  FieldEffectProviderProps,
} from './FieldEffectProvider'
import { FormSectionProps } from './FormSection'
import renderField, {
  FormSectionFieldBooleanFunction,
  FormSectionFieldProps,
  RenderFieldProps,
} from './renderField'

export interface FormSectionJsxFieldProps {
  formContext: UseFormReturn
  item: FormSectionProps['item']
  isNew: FormSectionProps['isNew']
  isReadOnly: FormSectionProps['isReadOnly']
}

/**
 * Render FormSectionField with Wrapper
 * (contains recursive code for nested fields)
 * has to be render function because of recursion
 * Where Wrapper could be a Grid, React.ElementType, etc.
 */
export interface RenderFieldWithWrapperProps
  extends Omit<RenderFieldProps, 'fieldProps'> {
  fieldProps:
    | FormSectionFieldProps
    | FormSectionFieldProps[]
    | React.ReactElement
}
const renderFieldWithWrapper = (props: RenderFieldWithWrapperProps) => {
  const { formContext, sectionProps, fieldProps } = props
  const { isNew, isPreview, item, isReadOnly } = sectionProps

  /**
   * Handle Recursion case
   * Field is wrapped in an array for gridding
   * Activate Grids when field is an array
   */
  const isGridField = Array.isArray(fieldProps)
  if (isGridField) {
    // This field object is an array of fields if isGridField === true
    const fields = fieldProps as FormSectionFieldProps[]
    const gridFieldColumns = fields.length
    return fields.map((field) =>
      renderFieldWithWrapper({
        ...props,
        sectionProps,
        fieldProps: {
          ...field,
          gridProps: { md: 12 / gridFieldColumns, ...field?.gridProps },
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
      <Grid
        item
        xs={12}
        {...sectionProps.gridProps}
        sx={{ mb: 3, ...sectionProps.gridProps?.sx }}
      >
        {React.cloneElement<FormSectionJsxFieldProps>(
          fieldProps as React.ReactElement,
          {
            formContext,
            item,
            isNew,
            isReadOnly,
          }
        )}
      </Grid>
    )
  }

  const { key, fieldEffect, hidden } = fieldProps

  // Hide field
  const shouldHide = Boolean(
    hidden &&
      (typeof hidden === 'function'
        ? (hidden as FormSectionFieldBooleanFunction)({
            isNew,
            isPreview,
            isDetail: !isNew && !isPreview,
            formContext,
          })
        : hidden)
  )
  if (shouldHide) return null

  // Define children
  const childrenJsx = (
    <Grid
      item
      xs={12}
      key={key}
      {...(fieldProps as FormSectionFieldProps).gridProps}
    >
      {renderField(props as RenderFieldProps)}
    </Grid>
  )

  // Render with fieldEffect
  const hasFieldEffect = Boolean(fieldEffect)
  if (hasFieldEffect) {
    const fieldEffectProviderProps: FieldEffectProviderProps = {
      item,
      ...(fieldProps as FormSectionFieldProps),
      fieldEffect,
      children: childrenJsx,
      formContext,
    }
    return <FieldEffectProvider {...fieldEffectProviderProps} />
  }

  // Default render
  return childrenJsx
}

export default renderFieldWithWrapper
