import React from 'react'
import { Grid } from '@gravis-os/ui'
import { UseFormReturn } from 'react-hook-form'
import FieldEffectProvider, {
  FieldEffectProviderProps,
} from './FieldEffectProvider'
import renderField, { RenderFieldProps } from './renderField'
import { FormSectionFieldProps } from './types'
import getFormSectionFieldBooleanFunction from './getFormSectionFieldBooleanFunction'
import getFormSectionFieldRenderProps from './getFormSectionFieldRenderProps'

export interface FormSectionJsxFieldProps {
  formContext: UseFormReturn
  item: RenderFieldProps['sectionProps']['item']
  isNew: RenderFieldProps['sectionProps']['isNew']
  isReadOnly: RenderFieldProps['sectionProps']['isReadOnly']
  isPreview: RenderFieldProps['sectionProps']['isPreview']
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
  const { isNew, isPreview, item, isReadOnly, disableEdit } = sectionProps

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
            isReadOnly: isReadOnly || disableEdit,
            isPreview,
          }
        )}
      </Grid>
    )
  }

  const { key, fieldEffect, hidden } = fieldProps
  const fieldJsx = renderField(props as RenderFieldProps)

  // Calculate hidden field, still render the field for hidden prop to take effect and store the form value
  // The set of props available to the end-user when defining a function in the fieldDef
  const renderProps = getFormSectionFieldRenderProps(props as RenderFieldProps)
  const isHidden = getFormSectionFieldBooleanFunction(hidden, renderProps)

  // ==============================
  // Wrappers
  // ==============================
  // Render with a Grid wrapper
  const fieldJsxWithGrid = (
    <Grid
      item
      xs={12}
      key={key}
      {...(fieldProps as FormSectionFieldProps).gridProps}
    >
      {fieldJsx}
    </Grid>
  )

  // Render with a fieldEffect wrapper
  const hasFieldEffect = Boolean(fieldEffect)
  const fieldEffectProviderProps: FieldEffectProviderProps = {
    item,
    ...(fieldProps as FormSectionFieldProps),
    fieldEffect,
    // Manage hidden fields with fieldEffect
    // TODO: Refactor to compose the wrappers with plugins instead
    children: isHidden
      ? isReadOnly || disableEdit
        ? null
        : fieldJsx
      : fieldJsxWithGrid,
    formContext,
  }

  // ==============================
  // Render
  // ==============================
  switch (true) {
    case hasFieldEffect:
      return <FieldEffectProvider {...fieldEffectProviderProps} />
    case (isReadOnly || disableEdit) && isHidden:
      return null
    case isHidden:
      return fieldJsx
    default:
      return fieldJsxWithGrid
  }
}

export default renderFieldWithWrapper
