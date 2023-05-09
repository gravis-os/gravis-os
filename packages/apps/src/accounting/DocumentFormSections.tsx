import { CrudFormJsxProps } from '@gravis-os/crud'
import {
  FormSection,
  FormSectionProps,
  FormSectionReadOnlyStack,
  FormSectionRenderReadOnlyProps,
} from '@gravis-os/form'
import {
  Box,
  Button,
  ButtonProps,
  Card,
  ConfirmationDialog,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@gravis-os/ui'
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { SxProps } from '@mui/material'
import React from 'react'
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
          {value?.mobile}
        </Typography>

        <Typography
          spacing={1}
          variant="body2"
          startIcon={<EmailOutlinedIcon color="primary" fontSize="small" />}
        >
          {value?.email}
        </Typography>
      </Stack>
    </FormSectionReadOnlyStack>
  )
}

export interface DocumentFormSectionsProps extends CrudFormJsxProps {
  actionButtons?: ButtonProps[]
  onPrint?: () => void
  printMode?: boolean
  printModeOptions?: { pageBreak?: boolean }
  disableEdit?: boolean
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
    actionButtons: injectedActionButtons = [],
    onPrint,
    printMode,
    printModeOptions,
    disableEdit = false,
    ...rest
  } = props

  const { pageBreak } = printModeOptions || {}

  if (!sections?.length) return null

  const formSectionProps = { isReadOnly, disableCard: true, item, ...rest }

  const getSectionPropsByKey = (key: string) =>
    sections.find((section) => section.key === key)
  const sectionKeys = [
    'assignee',
    'salesperson',
    'status',
    'title',
    'type',
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
    'driver',
    'delivery_at',
    'delivery_details',
    'signature',
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
      color: 'primary',
      disabled: disableEdit,
    },
    {
      key: 'print',
      children: 'Print',
      startIcon: <LocalPrintshopOutlinedIcon />,
      onClick: onPrint,
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
    ...injectedActionButtons,
  ].map((item) => ({ color: 'inherit' as ButtonProps['color'], ...item }))

  const containerSx: SxProps = printMode
    ? {
        '& > .MuiCard-root': { background: 'none', boxShadow: 'none' },
        '& > div > .MuiCard-root': { background: 'none', boxShadow: 'none' },
      }
    : null

  return (
    <Stack spacing={2} sx={containerSx}>
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
          <Stack
            display={printMode ? 'none' : 'flex'}
            direction="row"
            alignItems="center"
            spacing={0.5}
          >
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
              <Stack direction="row" spacing={6} sx={{ width: 'fit-content' }}>
                {Boolean(sectionsPropsByKey.type) && (
                  <FormSection
                    {...formSectionProps}
                    {...sectionsPropsByKey.type}
                  />
                )}
                {Boolean(sectionsPropsByKey.published_at) && (
                  <FormSection
                    {...formSectionProps}
                    {...sectionsPropsByKey.published_at}
                  />
                )}
              </Stack>
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
                <Grid item xs={printMode ? 7 : 12} md={7}>
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

                <Grid item xs={printMode ? 5 : 12} md={4}>
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
                    <Grid container spacing={printMode ? 1.5 : 2}>
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
                      <Grid item xs={12} md={12}>
                        {Boolean(sectionsPropsByKey.driver) && (
                          <FormSection
                            readOnlySx={{ textAlign: 'right' }}
                            {...formSectionProps}
                            {...sectionsPropsByKey.driver}
                          />
                        )}
                      </Grid>
                      <Grid item xs={12} md={12}>
                        {Boolean(sectionsPropsByKey.delivery_at) && (
                          <FormSection
                            readOnlySx={{ textAlign: 'right' }}
                            {...formSectionProps}
                            {...sectionsPropsByKey.delivery_at}
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

        {printMode && pageBreak && <Box sx={{ pageBreakAfter: 'always' }} />}

        <Card disableBorderRadiusTop>
          {/* Summary */}
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Grid container spacing={1}>
              <Grid item xs={printMode ? 6 : 12} md={6}>
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

              <Grid item xs={printMode ? 6 : 12} md={6}>
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
                  {/* Delivered On */}
                  {Boolean(sectionsPropsByKey.delivery_details) && (
                    <FormSection
                      readOnlySx={{ textAlign: 'right' }}
                      gridProps={{ spacing: 1 }}
                      {...formSectionProps}
                      {...sectionsPropsByKey.delivery_details}
                    />
                  )}
                  {/* Signature */}
                  {Boolean(sectionsPropsByKey.signature) && (
                    <FormSection
                      readOnlySx={{ textAlign: 'right' }}
                      {...formSectionProps}
                      {...sectionsPropsByKey.signature}
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
