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
  ButtonProps,
} from '@gravis-os/ui'
import {
  FormSection,
  FormSectionProps,
  FormSectionReadOnlyStack,
  FormSectionRenderReadOnlyProps,
} from '@gravis-os/form'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { DocumentItem } from './types'

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

export interface DocumentFormSectionsProps {
  sections: FormSectionProps[]
  actionButtons?: ButtonProps[]
  isReadOnly?: boolean
  setIsReadOnly?: React.Dispatch<React.SetStateAction<boolean>>
}

const DocumentFormSections: React.FC<DocumentFormSectionsProps> = (props) => {
  const { isReadOnly, setIsReadOnly, sections, ...rest } = props

  if (!sections?.length) return null

  const formSectionProps = { isReadOnly, disableCard: true, ...rest }

  const getSectionPropsByKey = (key: string) =>
    sections.find((section) => section.key === key)

  const actionButtons = [
    {
      key: 'edit',
      children: isReadOnly ? 'Edit' : 'Save',
      startIcon: isReadOnly ? (
        <ModeEditOutlineOutlinedIcon />
      ) : (
        <SaveOutlinedIcon />
      ),
      onClick: () => setIsReadOnly(!isReadOnly),
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
  ].map((item) => ({ ...item, color: 'inherit' as ButtonProps['color'] }))

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
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {actionButtons?.map((actionButton) => (
              <Button key={actionButton.key} {...actionButton} />
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
                <Grid item xs={12} md={7}>
                  <Grid container spacing={6}>
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

                    {/* Addresses */}
                    <FormSection
                      gridProps={{ md: 6 }}
                      renderReadOnlySection={(props: {
                        title: React.ReactNode
                        item?: DocumentItem
                      }) => {
                        const { title, item } = props
                        return (
                          <FormSectionReadOnlyStack disableTitle label={title}>
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={5}
                            >
                              <div>
                                <Typography
                                  variant="subtitle1"
                                  color="primary"
                                  startIcon={
                                    <LocalShippingOutlinedIcon fontSize="small" />
                                  }
                                  gutterBottom
                                >
                                  Ship to
                                </Typography>

                                <Typography variant="body2">
                                  {item.shipping_address_line_1}
                                </Typography>
                                <Typography variant="body2">
                                  {item.shipping_address_line_2}{' '}
                                  {item.shipping_address_postal_code}
                                </Typography>
                                <Typography variant="body2">
                                  {item.shipping_address_city},{' '}
                                  {item.shipping_address_country}
                                </Typography>
                              </div>
                            </Stack>
                          </FormSectionReadOnlyStack>
                        )
                      }}
                      {...formSectionProps}
                      {...getSectionPropsByKey('shipping_address')}
                    />
                    <FormSection
                      gridProps={{ md: 6 }}
                      {...formSectionProps}
                      {...getSectionPropsByKey('billing_address')}
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

                <Grid xs={0} md={1} />

                <Grid item xs={12} md={4}>
                  <Grid container spacing={6}>
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

        {/* Document Lines */}
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
                <Grid container spacing={4}>
                  {/* Notes */}
                  <FormSection
                    gridProps={{ spacing: 4 }}
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
                    gridProps={{ spacing: 0.5 }}
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

export default DocumentFormSections
