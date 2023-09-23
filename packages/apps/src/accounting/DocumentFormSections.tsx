import React from 'react'

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

import { DocumentItem } from './types'

const AddressReadOnlyFormSection: React.FC<{
  icon?: React.ReactElement
  item?: DocumentItem
  label?: React.ReactNode
  prefix?: string
  title?: React.ReactNode
}> = (props) => {
  const {
    title,
    icon,
    item: injectedItem,
    label,
    prefix: injectedPrefix,
  } = props

  // Fallback with typing intact for safety reasons
  const item = injectedItem || ({} as DocumentItem)

  const prefix = injectedPrefix ? `${injectedPrefix}_` : ''
  const cityCountryArray = [
    item[`${prefix}address_city`],
    item[`${prefix}address_country`],
  ].filter(Boolean)

  return (
    <Stack alignItems="center" direction="row" spacing={5}>
      <div>
        {(title || label) && (
          <Typography
            color="primary"
            gutterBottom
            startIcon={icon}
            variant="subtitle1"
          >
            {label ?? title}
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
  const { title, label, value } = props

  return (
    <FormSectionReadOnlyStack label={label} title={title}>
      <Stack spacing={0.5}>
        <Typography
          spacing={1}
          startIcon={
            <PhoneIphoneOutlinedIcon color="primary" fontSize="small" />
          }
          variant="body2"
        >
          {value?.mobile}
        </Typography>

        <Typography
          spacing={1}
          startIcon={<EmailOutlinedIcon color="primary" fontSize="small" />}
          variant="body2"
        >
          {value?.email}
        </Typography>
      </Stack>
    </FormSectionReadOnlyStack>
  )
}

export interface DocumentFormSectionsProps extends CrudFormJsxProps {
  actionButtons?: ButtonProps[]
  disableEdit?: boolean
  onPrint?: () => void
  printMode?: boolean
  printModeOptions?: { pageBreak?: boolean }
}

const DocumentFormSections: React.FC<any> = (props) => {
  const {
    actionButtons: injectedActionButtons = [],
    disableEdit = false,
    formContext,
    isReadOnly,
    item,
    onDelete,
    onPrint,
    onSubmit,
    printMode,
    printModeOptions,
    sections,
    setIsReadOnly,
    ...rest
  } = props
  const { pageBreak } = printModeOptions || {}

  if (!sections?.length) return null

  const formSectionProps = { disableCard: true, isReadOnly, item, ...rest }

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
    'currency',
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
    Object.fromEntries(
      sectionKeys.map((key) => [key, getSectionPropsByKey(key)])
    )

  const actionButtons = [
    {
      children: isReadOnly ? 'Edit' : 'Save',
      color: 'primary',
      disabled: disableEdit,
      key: 'edit',
      onClick: async () => {
        if (isReadOnly) return setIsReadOnly(!isReadOnly)

        await formContext.handleSubmit(async (values) => {
          await onSubmit(values)
          setIsReadOnly(true)
        })()
      },
      startIcon: isReadOnly ? (
        <ModeEditOutlineOutlinedIcon />
      ) : (
        <SaveOutlinedIcon />
      ),
    },
    {
      children: 'Print',
      key: 'print',
      onClick: onPrint,
      startIcon: <LocalPrintshopOutlinedIcon />,
    },
    <ConfirmationDialog
      buttonComponent={Button}
      buttonProps={{
        children: 'Delete',
        color: 'inherit',
        key: 'delete',
        startIcon: <DeleteOutlineOutlinedIcon />,
        tooltip: 'Delete',
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
        contentProps={{ sx: { pl: 1, pr: 3, py: 1 } }}
        disableLastGutterBottom
        square
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={1}
        >
          {/* Left */}
          <Stack
            alignItems="center"
            direction="row"
            display={printMode ? 'none' : 'flex'}
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
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              spacing={1}
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
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              spacing={1}
            >
              <Grid container>
                <Grid item md={7} xs={printMode ? 7 : 12}>
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

                    {/* Currency */}
                    {Boolean(sectionsPropsByKey.currency) && (
                      <FormSection
                        {...formSectionProps}
                        {...sectionsPropsByKey.currency}
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
                              item?: DocumentItem
                              label: React.ReactNode
                            }) => (
                              <AddressReadOnlyFormSection
                                icon={
                                  <LocalShippingOutlinedIcon fontSize="small" />
                                }
                                prefix="shipping"
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
                              item?: DocumentItem
                              label: React.ReactNode
                            }) => (
                              <AddressReadOnlyFormSection
                                icon={
                                  <ApartmentOutlinedIcon fontSize="small" />
                                }
                                prefix="billing"
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

                <Grid md={1} xs={0} />

                <Grid item md={4} xs={printMode ? 5 : 12}>
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
                      <Grid item md={6} xs={12}>
                        {Boolean(sectionsPropsByKey.ready_at) && (
                          <FormSection
                            readOnlySx={{ textAlign: 'right' }}
                            {...formSectionProps}
                            {...sectionsPropsByKey.ready_at}
                          />
                        )}
                      </Grid>
                      <Grid item md={6} xs={12}>
                        {Boolean(sectionsPropsByKey.arrived_at) && (
                          <FormSection
                            readOnlySx={{ textAlign: 'right' }}
                            {...formSectionProps}
                            {...sectionsPropsByKey.arrived_at}
                          />
                        )}
                      </Grid>
                      <Grid item md={6} xs={12}>
                        {Boolean(sectionsPropsByKey.ship_via) && (
                          <FormSection
                            readOnlySx={{ textAlign: 'right' }}
                            {...formSectionProps}
                            {...sectionsPropsByKey.ship_via}
                          />
                        )}
                      </Grid>
                      <Grid item md={6} xs={12}>
                        {Boolean(sectionsPropsByKey.shipped_at) && (
                          <FormSection
                            readOnlySx={{ textAlign: 'right' }}
                            {...formSectionProps}
                            {...sectionsPropsByKey.shipped_at}
                          />
                        )}
                      </Grid>
                      <Grid item md={12} xs={12}>
                        {Boolean(sectionsPropsByKey.driver) && (
                          <FormSection
                            readOnlySx={{ textAlign: 'right' }}
                            {...formSectionProps}
                            {...sectionsPropsByKey.driver}
                          />
                        )}
                      </Grid>
                      <Grid item md={12} xs={12}>
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
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            <Grid container spacing={1}>
              <Grid item md={6} xs={printMode ? 6 : 12}>
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

              <Grid item md={6} xs={printMode ? 6 : 12}>
                <Grid container>
                  {/* Pricing */}
                  {Boolean(sectionsPropsByKey.pricing) && (
                    <FormSection
                      gridProps={{ spacing: 0.5 }}
                      readOnlySx={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                      {...formSectionProps}
                      {...sectionsPropsByKey.pricing}
                    />
                  )}
                  {/* Delivered On */}
                  {Boolean(sectionsPropsByKey.delivery_details) && (
                    <FormSection
                      gridProps={{ spacing: 1 }}
                      readOnlySx={{ textAlign: 'right' }}
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
