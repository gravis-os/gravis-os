import React from 'react'
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
  receiptLogo?: any
}

const PosPaymentReceipt: React.FC<PosPaymentReceiptProps> = (props) => {
  const { item, receiptLogo } = props
  const {
    payment_method,
    paid,
    subtotal,
    tax,
    total,
    id,
    cart_items,
    customer,
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
      value: `${padStart(`${id}`, 6, '0')}`,
      TypographyProps: { fontWeight: 'bold' },
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
      value: printAmount(paid || ''),
      TypographyProps: { fontWeight: 'bold' },
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
    title?: string
    customer?: Customer
  }> = ({ title, customer }) => {
    const {
      full_name,
      email,
      shipping_address_line_1,
      shipping_address_line_2,
      shipping_address_country,
      shipping_address_city,
      shipping_address_postal_code,
    } = (customer as Customer) || {}
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
    <Stack spacing={2} px={2} sx={containerSx}>
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
                title="Bill to"
                customer={customer as any as Customer}
              />
            </Grid>
          </Grid>

          <Typography variant="h2">
            {`${printAmount(paid || '')} paid on ${today}`}
          </Typography>

          <Box>
            <DataTable
              rowData={cart_items as any as Partial<CartItem>[]}
              columnDefs={columnDefs}
              disableHeader
              sx={{
                height: '100%',
                width: PRINT_PDF_A4_WIDTH,
                breakInside: 'avoid',
              }}
              domLayout="print"
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
