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

const AddressReadOnlyFormSection: React.FC<{
  title?: React.ReactNode
  icon?: React.ReactElement
  item?: DocumentItem
  prefix?: string
}> = (props) => {
  const { icon, title, item: injectedItem, prefix: injectedPrefix } = props

  // Fallback with typing intact for safety reasons
  const item = injectedItem || ({} as DocumentItem)

  const prefix = injectedPrefix ? `${injectedPrefix}_` : ''
  const cityCountryArray = [
    item[`${prefix}address_city`],
    item[`${prefix}address_country`],
  ].filter(Boolean)

  return (
    <Stack direction="row" alignItems="center" spacing={5}>
      <div>
        {title && (
          <Typography
            variant="subtitle1"
            color="primary"
            startIcon={icon}
            gutterBottom
          >
            {title}
          </Typography>
        )}

        <Typography variant="body2">
          {item[`${prefix}address_line_1`] || '-'}
        </Typography>
        <Typography variant="body2">
          {item[`${prefix}address_line_2`]}{' '}
          {item[`${prefix}address_postal_code`]}
        </Typography>
        <Typography variant="body2">{cityCountryArray.join(', ')}</Typography>
      </div>
    </Stack>
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
      // TODO@Joel: Setup delete action here. Pass a deleteHandler down from CrudForm.
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
                  <Grid container spacing={5}>
                    {/* Project + Amount */}
                    <FormSection
                      {...formSectionProps}
                      {...getSectionPropsByKey('project')}
                    />

                    <Grid item>
                      <Grid container spacing={2}>
                        {/* Company */}
                        <FormSection
                          {...formSectionProps}
                          {...getSectionPropsByKey('company')}
                        />

                        {/* Addresses */}
                        <FormSection
                          gridProps={{ md: true }}
                          renderReadOnlySection={(props: {
                            label: React.ReactNode
                            item?: DocumentItem
                          }) => (
                            <AddressReadOnlyFormSection
                              prefix="shipping"
                              icon={
                                <LocalShippingOutlinedIcon fontSize="small" />
                              }
                              title="Ship to"
                              {...props}
                            />
                          )}
                          {...formSectionProps}
                          {...getSectionPropsByKey('shipping_address')}
                        />
                        <FormSection
                          gridProps={{ md: true }}
                          renderReadOnlySection={(props: {
                            label: React.ReactNode
                            item?: DocumentItem
                          }) => (
                            <AddressReadOnlyFormSection
                              prefix="billing"
                              icon={<ApartmentOutlinedIcon fontSize="small" />}
                              title="Bill to"
                              {...props}
                            />
                          )}
                          {...formSectionProps}
                          {...getSectionPropsByKey('billing_address')}
                        />
                      </Grid>
                    </Grid>

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
                  <Grid container spacing={5}>
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
