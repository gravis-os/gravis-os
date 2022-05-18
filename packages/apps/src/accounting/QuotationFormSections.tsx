import React from 'react'
import { Grid, Card, Stack, Box, Divider } from '@gravis-os/ui'
import { FormSection, FormSectionProps } from '@gravis-os/form'

export interface QuotationFormSectionsProps {
  sections: FormSectionProps[]
}

const QuotationFormSections: React.FC<QuotationFormSectionsProps> = (props) => {
  const { sections, ...rest } = props

  if (!sections?.length) return null

  const formSectionProps = { disableCard: true, ...rest }

  const getSectionPropsByKey = (key: string) =>
    sections.find((section) => section.key === key)

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
        <Box>
          <FormSection
            {...formSectionProps}
            {...getSectionPropsByKey('lines')}
          />
        </Box>

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

export default QuotationFormSections
