import React, { ElementType } from 'react'

import { DataTable } from '@gravis-os/crud'
import { Box, Card, Divider, Grid, Stack, Typography } from '@gravis-os/ui'
import { printAmount } from '@gravis-os/utils'
import { SxProps } from '@mui/system'
import dayjs from 'dayjs'
import padStart from 'lodash/padStart'

import getDiscountedPriceFromItem from '../utils/getDiscountedPriceFromItem'
import { CartItem, Customer, Receipt } from './types'

export const PRINT_PDF_A4_WIDTH = '755px'

export interface PosPaymentReceiptProps {
  item: Receipt
  receiptLogo?: ElementType<any>
}

const printCustomerCountry = (
  shipping_address_city,
  shipping_address_country
) => {
  if (shipping_address_city && shipping_address_country) {
    return `${shipping_address_city}, ${shipping_address_country}`
  }
  if (shipping_address_city) {
    return `${shipping_address_city}`
  }
  if (shipping_address_country) {
    return `${shipping_address_country}`
  }
}

const PosPaymentReceipt: React.FC<PosPaymentReceiptProps> = (props) => {
  const { item, receiptLogo } = props
  const {
    id,
    cart_items,
    customer,
    paid,
    payment_method,
    subtotal,
    tax,
    total,
  } = item || {}

  const today = dayjs().format('MMM DD, YYYY')

  const columnDefs = [
    {
      field: 'title',
      headerName: 'Title',
    },
    {
      field: 'brand.title',
      headerName: 'Brand',
      maxWidth: 200,
    },
    {
      field: 'price',
      headerName: 'Price',
      maxWidth: 100,
      valueGetter: ({ data }) => {
        return printAmount(getDiscountedPriceFromItem(data))
      },
    },
  ]

  const detailSections = [
    {
      title: 'Receipt number',
      key: 'receipt-number',
      TypographyProps: { fontWeight: 'bold' },
      value: `${padStart(`${id}`, 6, '0')}`,
    },
    {
      title: 'Date paid',
      key: 'date-paid',
      value: today,
    },
    {
      title: 'Payment method',
      key: 'payment-method',
      value: payment_method || '-',
    },
  ]

  const pricingSections = [
    {
      title: 'Subtotal',
      key: 'subtotal',
      value: printAmount(subtotal || ''),
    },
    {
      title: 'Tax',
      key: 'tax',
      value: printAmount(tax || ''),
    },
    {
      title: 'Total',
      key: 'total',
      value: printAmount(total || ''),
    },
    {
      title: 'Amount Paid',
      key: 'paid',
      TypographyProps: { fontWeight: 'bold' },
      value: printAmount(paid || ''),
    },
  ]

  const ReceiptDetails: React.FC<{
    detailSections: any[]
  }> = ({ detailSections }) => {
    return (
      <Grid container spacing={0}>
        {detailSections?.map((section) => (
          <React.Fragment key={section?.key}>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="body1" {...section.TypographyProps}>
                    {section.title}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" {...section.TypographyProps}>
                    {section.value}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} />
          </React.Fragment>
        ))}
      </Grid>
    )
  }

  const BillingDetails: React.FC<{
    customer?: Customer
    title?: string
  }> = ({ title, customer }) => {
    const {
      email,
      full_name,
      shipping_address_city,
      shipping_address_country,
      shipping_address_line_1,
      shipping_address_line_2,
      shipping_address_postal_code,
    } = (customer as Customer) || {}
    const billingDetailValues = [
      full_name,
      email,
      shipping_address_line_1,
      shipping_address_line_2,
      shipping_address_postal_code,
      printCustomerCountry(shipping_address_city, shipping_address_country),
    ]
    return (
      <Stack>
        <Typography variant="h5">{title}</Typography>
        {billingDetailValues?.map((value) => (
          <Typography variant="body1">{value}</Typography>
        ))}
      </Stack>
    )
  }

  const containerSx: SxProps = {
    '& > .MuiCard-root': { background: 'none', boxShadow: 'none' },
    '& > div > .MuiCard-root': { background: 'none', boxShadow: 'none' },
  }

  return (
    <Stack px={2} spacing={2} sx={containerSx}>
      <Card>
        <Stack direction="row" justifyContent="space-between" pt={2}>
          <Typography variant="h1">Receipt</Typography>
          <Box component={receiptLogo} height={40} />
        </Stack>
      </Card>

      <Divider />

      <Card disableBorderRadiusBottom>
        <Stack rowGap={3}>
          <ReceiptDetails detailSections={detailSections} />

          <Grid container>
            <Grid item xs={6}>
              <BillingDetails
                customer={customer as any as Customer}
                title="Bill to"
              />
            </Grid>
          </Grid>

          <Typography variant="h2">
            {`${printAmount(paid || '')} paid on ${today}`}
          </Typography>

          <Box>
            <DataTable
              columnDefs={columnDefs}
              disableHeader
              domLayout="print"
              rowData={cart_items as any as Partial<CartItem>[]}
              sx={{
                breakInside: 'avoid',
                height: '100%',
                width: PRINT_PDF_A4_WIDTH,
              }}
            />
          </Box>

          <Grid container sx={{ breakInside: 'avoid' }}>
            {pricingSections?.map((section) => (
              <React.Fragment key={section?.key}>
                <Grid item xs={6} />
                <Grid item xs={6}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" {...section.TypographyProps}>
                      {section.title}
                    </Typography>
                    <Typography variant="body2" {...section.TypographyProps}>
                      {section.value}
                    </Typography>
                  </Stack>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Stack>
      </Card>
    </Stack>
  )
}

export default PosPaymentReceipt
