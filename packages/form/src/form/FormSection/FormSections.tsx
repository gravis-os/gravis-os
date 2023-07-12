import React from 'react'
import { Grid, GridProps } from '@gravis-os/ui'
import FormSection, { FormSectionProps } from './FormSection'

export interface FormSectionsProps extends Partial<FormSectionProps> {
  sections: FormSectionProps[]
  containerProps?: GridProps
}

const FormSections: React.FC<FormSectionsProps> = (props) => {
  const { sections, containerProps = {}, ...rest } = props
  if (!sections?.length) return null

  return (
    <Grid container spacing={2} {...containerProps}>
      {sections.map((section) => (
        <FormSection key={section.key} {...section} {...rest} />
      ))}
    </Grid>
  )
}

export default FormSections
