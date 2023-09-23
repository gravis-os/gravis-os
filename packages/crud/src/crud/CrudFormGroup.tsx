import React from 'react'

import { Card, Grid, Typography } from '@gravis-os/ui'

import CrudForm, { CrudFormProps } from './CrudForm'

export interface CrudFormGroupProps extends CrudFormProps {
  subtitle?: React.ReactNode
  title?: React.ReactNode
}

const CrudFormGroup: React.FC<CrudFormGroupProps> = (props) => {
  const { title: injectedTitle, subtitle: injectedSubtitle, ...rest } = props

  return (
    <CrudForm
      disableHeader
      disableMetaSection
      disableRedirectOnSuccess
      formProps={{ buttonProps: { fullWidth: false, size: 'small' } }}
      formTemplateProps={{ disableCard: true, disableHeader: true }}
      {...rest}
    >
      {(renderProps) => {
        const { cancelButtonJsx, editOrSubmitButtonJsx, formJsx, sections } =
          renderProps

        // Take the first section as a fallback
        const firstSection = sections[0]
        const title = injectedTitle || firstSection.title
        const subtitle = injectedSubtitle || firstSection.subtitle

        return (
          <Grid container>
            <Grid item md={4} xl={3} xs={12}>
              <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                <Typography variant="h4">{title}</Typography>
                <Typography color="text.secondary" variant="body1">
                  {subtitle}
                </Typography>
              </Card>
            </Grid>
            <Grid item md={8} xl={9} xs={12}>
              <Card
                actionProps={{
                  sx: { justifyContent: 'flex-end', pb: 1, px: 2 },
                }}
                actions={[
                  { children: cancelButtonJsx, key: 'cancel' },
                  { children: editOrSubmitButtonJsx, key: 'edit-or-submit' },
                ]}
                disableLastGutterBottom
                sx={{ pt: 1 }}
              >
                {formJsx}
              </Card>
            </Grid>
          </Grid>
        )
      }}
    </CrudForm>
  )
}

export default CrudFormGroup
