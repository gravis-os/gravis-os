import React from 'react'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined'
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined'
import { CrudFormJsxProps } from '@gravis-os/crud'
import {
  Button,
  Box,
  Card,
  ConfirmationDialog,
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

export interface DocumentFormSectionsProps extends CrudFormJsxProps {
  actionButtons?: ButtonProps[]
}

const DocumentFormSections: React.FC<any> = (props) => {
  const {
    formContext,
    onSubmit,
    onDelete,
    isReadOnly,
    setIsReadOnly,
    sections,
    item,
    ...rest
  } = props

  if (!sections?.length) return null

  const formSectionProps = { isReadOnly, disableCard: true, item, ...rest }

  const getSectionPropsByKey = (key: string) =>
    sections.find((section) => section.key === key)
  const sectionKeys = [
    'assignee',
    'salesperson',
    'status',
    'title',
    'published_at',
    'project',
    'company',
    'contact',
    'warehouse',
    'shipping_address',
    'billing_address',
    'total',
    'order',
    'payment',
    'ready_at',
    'arrived_at',
    'ship_via',
    'shipped_at',
    'lines',
    'notes',
    'attachments',
    'pricing',
  ]
  const sectionsPropsByKey: Record<string, FormSectionProps> =
    sectionKeys.reduce(
      (acc, key) => ({ ...acc, [key]: getSectionPropsByKey(key) }),
      {}
    )

  const actionButtons = [
    {
      key: 'edit',
      children: isReadOnly ? 'Edit' : 'Save',
      startIcon: isReadOnly ? (
        <ModeEditOutlineOutlinedIcon />
      ) : (
        <SaveOutlinedIcon />
      ),
      onClick: async () => {
        if (isReadOnly) return setIsReadOnly(!isReadOnly)

        await formContext.handleSubmit(async (values) => {
          await onSubmit(values)
          setIsReadOnly(true)
        })()
      },
    },
    {
      key: 'print',
      children: 'Print',
      startIcon: <LocalPrintshopOutlinedIcon />,
    },
    <ConfirmationDialog
      buttonComponent={Button}
      buttonProps={{
        key: 'delete',
        children: 'Delete',
        startIcon: <DeleteOutlineOutlinedIcon />,
        tooltip: 'Delete',
        color: 'inherit',
      }}
      disableToastSuccess
      onConfirm={() => onDelete(item)}
    />,
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
            {actionButtons?.map((actionButton) => {
              const isReactElement = React.isValidElement(actionButton)
              if (isReactElement) return actionButton

              return <Button key={actionButton.key} {...actionButton} />
            })}
          </Stack>

          {/* Right */}
          <Box sx={{ width: '100%' }}>
            <Grid container>
              {/* Assignee */}
              {Boolean(sectionsPropsByKey.assignee) && (
                <FormSection
                  gridProps={{ xs: 6 }}
                  {...formSectionProps}
                  {...sectionsPropsByKey.assignee}
                />
              )}

              {/* Salesperson */}
              {Boolean(sectionsPropsByKey.salesperson) && (
                <FormSection
                  gridProps={{ xs: 6 }}
                  {...formSectionProps}
                  {...sectionsPropsByKey.salesperson}
                />
              )}

              {/* Status */}
              {Boolean(sectionsPropsByKey.status) && (
                <FormSection
                  gridProps={{ xs: 6 }}
                  readOnlySx={{ textAlign: 'right' }}
                  {...formSectionProps}
                  {...sectionsPropsByKey.status}
                />
              )}
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
              {Boolean(sectionsPropsByKey.title) && (
                <FormSection
                  {...formSectionProps}
                  {...sectionsPropsByKey.title}
                />
              )}
              {Boolean(sectionsPropsByKey.published_at) && (
                <FormSection
                  {...formSectionProps}
                  {...sectionsPropsByKey.published_at}
                />
              )}
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
                    {Boolean(sectionsPropsByKey.project) && (
                      <FormSection
                        {...formSectionProps}
                        {...sectionsPropsByKey.project}
                      />
                    )}

                    {/* Company */}
                    {Boolean(sectionsPropsByKey.company) && (
                      <FormSection
                        {...formSectionProps}
                        {...sectionsPropsByKey.company}
                      />
                    )}

                    {/* Contact */}
                    {Boolean(sectionsPropsByKey.contact) && (
                      <FormSection
                        renderReadOnly={(props) => (
                          <ContactReadOnlyFormSection {...props} />
                        )}
                        {...formSectionProps}
                        {...sectionsPropsByKey.contact}
                      />
                    )}

                    {/* Warehouse */}
                    {Boolean(sectionsPropsByKey.warehouse) && (
                      <FormSection
                        renderReadOnly={(props) => (
                          <ContactReadOnlyFormSection {...props} />
                        )}
                        {...formSectionProps}
                        {...sectionsPropsByKey.warehouse}
                      />
                    )}

                    <Grid item>
                      <Grid container spacing={2}>
                        {/* Addresses */}
                        {Boolean(sectionsPropsByKey.shipping_address) && (
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
                            {...sectionsPropsByKey.shipping_address}
                          />
                        )}
                        {Boolean(sectionsPropsByKey.billing_address) && (
                          <FormSection
                            gridProps={{ md: true }}
                            renderReadOnlySection={(props: {
                              label: React.ReactNode
                              item?: DocumentItem
                            }) => (
                              <AddressReadOnlyFormSection
                                prefix="billing"
                                icon={
                                  <ApartmentOutlinedIcon fontSize="small" />
                                }
                                title="Bill to"
                                {...props}
                              />
                            )}
                            {...formSectionProps}
                            {...sectionsPropsByKey.billing_address}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid xs={0} md={1} />

                <Grid item xs={12} md={4}>
                  <Grid container spacing={5}>
                    {/* Total */}
                    {Boolean(sectionsPropsByKey.total) && (
                      <FormSection
                        {...formSectionProps}
                        {...sectionsPropsByKey.total}
                      />
                    )}
                    {/* Others */}
                    {Boolean(sectionsPropsByKey.order) && (
                      <FormSection
                        readOnlySx={{ textAlign: 'right' }}
                        {...formSectionProps}
                        {...sectionsPropsByKey.order}
                      />
                    )}
                    {Boolean(sectionsPropsByKey.payment) && (
                      <FormSection
                        readOnlySx={{ textAlign: 'right' }}
                        {...formSectionProps}
                        {...sectionsPropsByKey.payment}
                      />
                    )}
                    <Grid container>
                      <Grid item xs={12} md={6}>
                        {Boolean(sectionsPropsByKey.ready_at) && (
                          <FormSection
                            readOnlySx={{ textAlign: 'right' }}
                            {...formSectionProps}
                            {...sectionsPropsByKey.ready_at}
                          />
                        )}
                      </Grid>
                      <Grid item xs={12} md={6}>
                        {Boolean(sectionsPropsByKey.arrived_at) && (
                          <FormSection
                            readOnlySx={{ textAlign: 'right' }}
                            {...formSectionProps}
                            {...sectionsPropsByKey.arrived_at}
                          />
                        )}
                      </Grid>
                      <Grid item xs={12} md={6}>
                        {Boolean(sectionsPropsByKey.ship_via) && (
                          <FormSection
                            readOnlySx={{ textAlign: 'right' }}
                            {...formSectionProps}
                            {...sectionsPropsByKey.ship_via}
                          />
                        )}
                      </Grid>
                      <Grid item xs={12} md={6}>
                        {Boolean(sectionsPropsByKey.shipped_at) && (
                          <FormSection
                            readOnlySx={{ textAlign: 'right' }}
                            {...formSectionProps}
                            {...sectionsPropsByKey.shipped_at}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </Card>

        {/* Document Lines */}
        <Box>
          {Boolean(sectionsPropsByKey.lines) && (
            <FormSection {...formSectionProps} {...sectionsPropsByKey.lines} />
          )}
        </Box>

        <Card disableBorderRadiusTop>
          {/* Summary */}
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Grid container>
              <Grid item xs={12} md={6}>
                <Grid container spacing={4}>
                  {/* Notes */}
                  {Boolean(sectionsPropsByKey.notes) && (
                    <FormSection
                      gridProps={{ spacing: 4 }}
                      {...formSectionProps}
                      {...sectionsPropsByKey.notes}
                    />
                  )}

                  {/* Attachments */}
                  {Boolean(sectionsPropsByKey.attachments) && (
                    <FormSection
                      {...formSectionProps}
                      {...sectionsPropsByKey.attachments}
                    />
                  )}
                </Grid>
              </Grid>

              <Grid xs={0} md={2} />

              <Grid item xs={12} md={4}>
                <Grid container>
                  {/* Pricing */}
                  {Boolean(sectionsPropsByKey.pricing) && (
                    <FormSection
                      readOnlySx={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                      gridProps={{ spacing: 0.5 }}
                      {...formSectionProps}
                      {...sectionsPropsByKey.pricing}
                    />
                  )}
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
