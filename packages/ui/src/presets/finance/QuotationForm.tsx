import React from 'react'
import Grid from '../../ui/Grid'
import Card from '../../ui/Card'
import Stack from '../../ui/Stack'
import Box from '../../ui/Box'
import Divider from '../../ui/Divider'
import FormSection, { FormSectionProps } from '../../form/FormSection'

export interface QuotationFormProps {
  sections: FormSectionProps[]
}

const QuotationForm: React.FC<QuotationFormProps> = props => {
  const { sections, ...rest } = props

  if (!sections?.length) return null

  const formSectionProps = { disableCard: true, ...rest }

  const getSectionPropsByKey = (key: string) =>
    sections.find(section => section.key === key)

  return (
    <Stack spacing={2}>
      {/* Toolbar */}
      <Card square disableLastGutterBottom py={2}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          justifyContent="space-between"
        >
          <Box minWidth={215}>
            {/* Sales Person */}
            <FormSection
              {...formSectionProps}
              {...getSectionPropsByKey('salesperson')}
            />
          </Box>

          <div>
            {/* Status */}
            <Grid container>
              <FormSection
                {...formSectionProps}
                {...getSectionPropsByKey('status')}
              />
            </Grid>
          </div>
        </Stack>
      </Card>

      {/* Paper */}
      <div>
        <Card disableBorderRadiusBottom>
          <Stack spacing={4}>
            {/* Header */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              justifyContent="space-between"
            >
              <FormSection
                {...formSectionProps}
                {...getSectionPropsByKey('title')}
              />
              <FormSection
                {...formSectionProps}
                {...getSectionPropsByKey('published_at')}
              />
            </Stack>

            <Divider />

            {/* Letter Head */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              justifyContent="space-between"
            >
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Grid container>
                    {/* Project + Amount */}
                    <FormSection
                      {...formSectionProps}
                      {...getSectionPropsByKey('project')}
                    />
                    {/* Company */}
                    <FormSection
                      {...formSectionProps}
                      {...getSectionPropsByKey('company')}
                    />
                    {/* Contact */}
                    <FormSection
                      {...formSectionProps}
                      {...getSectionPropsByKey('contact')}
                    />
                  </Grid>
                </Grid>

                <Grid xs={0} md={2} />

                <Grid item xs={12} md={4}>
                  <Grid container>
                    {/* Total */}
                    <FormSection
                      {...formSectionProps}
                      {...getSectionPropsByKey('total')}
                    />

                    {/* Others */}
                    <FormSection
                      {...formSectionProps}
                      {...getSectionPropsByKey('order')}
                    />
                    <FormSection
                      {...formSectionProps}
                      {...getSectionPropsByKey('payment')}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </Card>

        {/* QuotationLines */}
        <Box sx={{ backgroundColor: 'background.default', height: 32 }} />

        <Card disableBorderRadiusTop>
          {/* Summary */}
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Grid container>
              <Grid item xs={12} md={6}>
                <Grid container>
                  {/* Notes */}
                  <FormSection
                    {...formSectionProps}
                    {...getSectionPropsByKey('notes')}
                  />
                </Grid>
              </Grid>

              <Grid xs={0} md={2} />

              <Grid item xs={12} md={4}>
                <Grid container>
                  {/* Pricing */}
                  <FormSection
                    {...formSectionProps}
                    {...getSectionPropsByKey('pricing')}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </Card>
      </div>
    </Stack>
  )
}

export default QuotationForm
