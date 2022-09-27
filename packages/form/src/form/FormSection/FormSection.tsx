import React from 'react'
import { useFormContext } from 'react-hook-form'
import {
  ButtonProps,
  Card,
  CardProps,
  Grid,
  GridProps,
  StackProps,
} from '@gravis-os/ui'
import { CrudItem, CrudModule, RenderPropsFunction } from '@gravis-os/types'
import renderFieldWithWrapper, {
  RenderFieldWithWrapperProps,
} from './renderFieldWithWrapper'

export interface FormSectionRenderReadOnlyProps {
  item?: CrudItem
  name: string
  module: CrudModule
  label: string
  value: Record<string, React.ReactNode>
  title: string
}

export interface FormSectionProps extends Omit<CardProps, 'hidden'> {
  key: string
  fields: Array<RenderFieldWithWrapperProps['fieldProps']>

  // Note that this only controls the section.gridProps. There is also a field.gridProps
  gridProps?: GridProps

  module?: CrudModule
  item?: CrudItem
  isNew?: boolean
  isPreview?: boolean

  // Read Only
  isReadOnly?: boolean
  readOnlySx?: StackProps['sx']
  renderReadOnly?: RenderPropsFunction<FormSectionRenderReadOnlyProps>
  renderReadOnlySection?: RenderPropsFunction<{
    label: React.ReactNode
    item?: CrudItem
  }>

  actionButtons?: ButtonProps[]

  disableCard?: boolean
  disabledFields?: string[]

  // Contexts
  crudContext?: RenderFieldWithWrapperProps['crudContext'] // If Form is used inside CrudForm
  userContext?: RenderFieldWithWrapperProps['userContext'] // If Form is used inside AuthProvider
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

    // isReadOnly
    isReadOnly,
    readOnlySx,
    renderReadOnly,
    renderReadOnlySection,

    // Contexts
    crudContext,
    userContext,

    ...rest
  } = props
  const { title } = rest

  // Form
  const formContext = useFormContext()
  if (!formContext) return null

  // All FormSection fields are wrapped in a Grid container
  const shouldRenderReadOnlySection = isReadOnly && renderReadOnlySection
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
