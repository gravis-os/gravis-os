import React from 'react'
import { Grid } from '@gravis-os/ui'
import FormSection, { FormSectionProps } from './FormSection'

export interface FormSectionsProps extends Partial<FormSectionProps> {
  sections: FormSectionProps[]
}

const FormSections: React.FC<FormSectionsProps> = (props) => {
  const { sections, ...rest } = props

  if (!sections?.length) return null

  return (
    <Grid container spacing={2}>
      {sections.map((section) => (
        <FormSection key={section.key} {...section} {...rest} />
      ))}
    </Grid>
  )
}

export default FormSections
