import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Card, Grid } from '@gravis-os/ui'
import renderFieldWithWrapper from './renderFieldWithWrapper'
import type { FormSectionProps } from './types'

const FormSection: React.FC<FormSectionProps> = (props) => {
  const {
    disabledFields,
    disableCard,

    item,
    isNew,
    isPreview,
    gridProps,
    fields: injectedFields,

    // isReadOnly
    isReadOnly,
    readOnlySx,
    renderReadOnly,
    renderReadOnlySection,

    // Contexts
    crudContext,
    userContext,

    disableEdit,
    ...rest
  } = props
  const { title } = rest

  // Clean up fields
  const fields = injectedFields.filter(Boolean)

  // Form
  const formContext = useFormContext()
  if (!formContext) return null

  // All FormSection fields are wrapped in a Grid container
  const shouldRenderReadOnlySection =
    (isReadOnly || disableEdit) && renderReadOnlySection
  const childrenJsx = shouldRenderReadOnlySection ? (
    renderReadOnlySection({ item, label: title })
  ) : (
    <Grid container spacing={2}>
      {fields.map((field) =>
        renderFieldWithWrapper({
          formContext,
          sectionProps: props,
          fieldProps: field,
          crudContext,
          userContext,
        })
      )}
    </Grid>
  )

  const renderChildren = () => {
    switch (true) {
      case disableCard:
        return childrenJsx
      default:
        return <Card {...rest}>{childrenJsx}</Card>
    }
  }

  return (
    <Grid item xs={12} {...gridProps}>
      {renderChildren()}
    </Grid>
  )
}

export default FormSection
