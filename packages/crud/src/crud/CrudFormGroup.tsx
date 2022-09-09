import React from 'react'
import { Card, Grid, Typography } from '@gravis-os/ui'
import CrudForm, { CrudFormProps } from './CrudForm'

export interface CrudFormGroupProps extends CrudFormProps {}

const CrudFormGroup: React.FC<CrudFormGroupProps> = (props) => {
  const { ...rest } = props

  return (
    <CrudForm
      disableHeader
      disableMetaSection
      formProps={{ buttonProps: { fullWidth: false, size: 'small' } }}
      formTemplateProps={{ disableCard: true, disableHeader: true }}
      {...rest}
    >
      {(renderProps) => {
        const { cancelButtonJsx, editOrSubmitButtonJsx, formJsx, sections } =
          renderProps

        // We will always only take the first section
        const firstSection = sections[0]
        const { title, subtitle } = firstSection

        return (
          <Grid container>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                <Typography variant="h4" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {subtitle}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card
                disableLastGutterBottom
                actions={[
                  { key: 'cancel', children: cancelButtonJsx },
                  { key: 'edit-or-submit', children: editOrSubmitButtonJsx },
                ]}
                actionProps={{
                  sx: { justifyContent: 'space-between', px: 2, pb: 2 },
                }}
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
