import React from 'react'
import isNil from 'lodash/isNil'
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
import getFormSectionFieldBooleanFunction from './getFormSectionFieldBooleanFunction'

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
  const { userContext, crudContext, formContext, sectionProps, fieldProps } =
    props
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

  // Calculate hidden field
  const isHidden = getFormSectionFieldBooleanFunction(hidden, props)
  if (isHidden) return null

  // If no value return null so the grid won't return an empty space
  const value = item?.[(fieldProps as FormSectionFieldProps).name]
  if (item && isNil(value)) return null

  // Define children (default)
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
