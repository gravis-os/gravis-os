import React from 'react'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined'
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined'
import {
  Button,
  Box,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@gravis-os/ui'
import {
  FormSection,
  FormSectionProps,
  FormSectionReadOnlyStack,
  FormSectionRenderReadOnlyProps,
} from '@gravis-os/form'

const CompanyReadOnlyFormSection: React.FC<FormSectionRenderReadOnlyProps> = (
  props
) => {
  const { label, title, value } = props
  return (
    <FormSectionReadOnlyStack title={title} label={label}>
      <Stack direction="row" alignItems="center" spacing={5}>
        <div>
          <Typography
            variant="subtitle1"
            color="primary"
            startIcon={<ApartmentOutlinedIcon fontSize="small" />}
            gutterBottom
          >
            Bill to
          </Typography>
          <Typography variant="body2">
            {value.billing_address_line_1}
          </Typography>
          <Typography variant="body2">
            {value.billing_address_line_2} {value.billing_address_postal_code}
          </Typography>
          <Typography variant="body2">
            {value.billing_address_city}, {value.billing_address_country}
          </Typography>
        </div>

        <div>
          <Typography
            variant="subtitle1"
            color="primary"
            startIcon={<LocalShippingOutlinedIcon fontSize="small" />}
            gutterBottom
          >
            Ship to
          </Typography>
          <Typography variant="body2">
            {value.shipping_address_line_1}
          </Typography>
          <Typography variant="body2">
            {value.shipping_address_line_2} {value.shipping_address_postal_code}
          </Typography>
          <Typography variant="body2">
            {value.shipping_address_city}, {value.shipping_address_country}
          </Typography>
        </div>
      </Stack>
    </FormSectionReadOnlyStack>
  )
}

const ContactReadOnlyFormSection: React.FC<FormSectionRenderReadOnlyProps> = (
  props
) => {
  const { label, title, value } = props

  return (
    <FormSectionReadOnlyStack title={title} label={label}>
      <Stack spacing={0.5}>
        <Typography
          spacing={1}
          variant="body2"
          startIcon={
            <PhoneIphoneOutlinedIcon color="primary" fontSize="small" />
          }
        >
          {value.mobile}
        </Typography>

        <Typography
          spacing={1}
          variant="body2"
          startIcon={<EmailOutlinedIcon color="primary" fontSize="small" />}
        >
          {value.email}
        </Typography>
      </Stack>
    </FormSectionReadOnlyStack>
  )
}

export interface QuotationFormSectionsProps {
  sections: FormSectionProps[]
}

const QuotationFormSections: React.FC<QuotationFormSectionsProps> = (props) => {
  const { sections, ...rest } = props

  if (!sections?.length) return null

  const formSectionProps = { disableCard: true, ...rest }

  const getSectionPropsByKey = (key: string) =>
    sections.find((section) => section.key === key)

  const actionButtons = [
    {
      key: 'edit',
      children: 'Edit',
      startIcon: <ModeEditOutlineOutlinedIcon />,
    },
    {
      key: 'print',
      children: 'Print',
      startIcon: <LocalPrintshopOutlinedIcon />,
    },
    {
      key: 'delete',
      children: 'Delete',
      startIcon: <DeleteOutlineOutlinedIcon />,
    },
    {
      key: 'margin',
      children: 'Margin',
      startIcon: <ShowChartOutlinedIcon />,
    },
  ].map((item) => ({ ...item, color: 'inherit' as any }))

  return (
    <Stack spacing={2}>
      {/* Toolbar */}
      <Card
        square
        disableLastGutterBottom
        contentProps={{ sx: { py: 1, pl: 1, pr: 3 } }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          justifyContent="space-between"
        >
          {/* Left */}
          <Stack direction="row" alignItems="center" spacing={1}>
            {actionButtons?.map((action) => (
              <Button key={action.key} {...action} />
            ))}
          </Stack>

          {/* Right */}
          <Box sx={{ width: '100%' }}>
            <Grid container>
              {/* Salesperson */}
              <FormSection
                gridProps={{ xs: 6 }}
                {...formSectionProps}
                {...getSectionPropsByKey('salesperson')}
              />

              {/* Status */}
              <FormSection
                gridProps={{ xs: 6 }}
                readOnlySx={{ textAlign: 'right' }}
                {...formSectionProps}
                {...getSectionPropsByKey('status')}
              />
            </Grid>
          </Box>
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

            <Divider sx={{ '&&': { mt: 0 } }} />

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
                      renderReadOnly={(props) => (
                        <CompanyReadOnlyFormSection {...props} />
                      )}
                      {...formSectionProps}
                      {...getSectionPropsByKey('company')}
                    />
                    {/* Contact */}
                    <FormSection
                      renderReadOnly={(props) => (
                        <ContactReadOnlyFormSection {...props} />
                      )}
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
                      readOnlySx={{ textAlign: 'right' }}
                      {...formSectionProps}
                      {...getSectionPropsByKey('order')}
                    />
                    <FormSection
                      readOnlySx={{ textAlign: 'right' }}
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
                  {/* Attachments */}
                  <FormSection
                    {...formSectionProps}
                    {...getSectionPropsByKey('attachments')}
                  />
                </Grid>
              </Grid>

              <Grid xs={0} md={2} />

              <Grid item xs={12} md={4}>
                <Grid container>
                  {/* Pricing */}
                  <FormSection
                    readOnlySx={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
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
