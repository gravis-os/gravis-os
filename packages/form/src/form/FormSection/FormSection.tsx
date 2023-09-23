import React from 'react'
import { useFormContext } from 'react-hook-form'

import { Card, Grid } from '@gravis-os/ui'

import type { FormSectionProps } from './types'

import renderFieldWithWrapper from './renderFieldWithWrapper'

const FormSection: React.FC<FormSectionProps> = (props) => {
  const {
    // Contexts
    crudContext,
    disableCard,

    disabledFields,
    disableEdit,
    fields: injectedFields,
    gridProps,
    isNew,

    isPreview,
    // isReadOnly
    isReadOnly,
    item,
    readOnlySx,

    renderReadOnly,
    renderReadOnlySection,

    userContext,
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
          crudContext,
          fieldProps: field,
          formContext,
          sectionProps: props,
          userContext,
        })
      )}
    </Grid>
  )

  const renderChildren = () => {
    switch (true) {
      case disableCard: {
        return childrenJsx
      }
      default: {
        return <Card {...rest}>{childrenJsx}</Card>
      }
    }
  }

  return (
    <Grid item xs={12} {...gridProps}>
      {renderChildren()}
    </Grid>
  )
}

export default FormSection
