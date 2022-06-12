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
import { CrudItem, CrudModule, RenderPropsFunction } from '../../types'
import renderFieldWithWrapper from './renderFieldWithWrapper'
import { FormSectionFieldProps } from './renderField'

export interface FormSectionRenderReadOnlyProps {
  item?: Record<string, unknown>
  name: string
  module: CrudModule
  label: string
  value: Record<string, React.ReactNode>
  title: string
}

export interface FormSectionProps extends Omit<CardProps, 'hidden'> {
  key: string
  fields: FormSectionFieldProps[] | FormSectionFieldProps[][] // Recursive nested type

  // Note that this only controls the section.gridProps. There is also a field.gridProps
  gridProps?: GridProps

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
    gridProps,
    fields,

    // isReadOnly
    isReadOnly,
    readOnlySx,
    renderReadOnly,
    renderReadOnlySection,

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
