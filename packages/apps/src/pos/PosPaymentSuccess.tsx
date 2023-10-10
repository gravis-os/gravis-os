'use client'

import React, { ElementType, useState } from 'react'

import { useGetItem } from '@gravis-os/crud'
import { CrudModule } from '@gravis-os/types'
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  Stack,
  Typography,
  TypographyProps,
} from '@gravis-os/ui'
import { printAmount } from '@gravis-os/utils'
import MoneyOutlinedIcon from '@mui/icons-material/MoneyOutlined'
import toString from 'lodash/toString'
import { useRouter } from 'next/navigation'

import { getReceiptFileName } from '.'
import posConfig from './posConfig'
import PosPaymentReceiptEmailDialog from './PosPaymentReceiptEmailDialog'
import { usePos } from './PosProvider'
import { Customer, Receipt } from './types'

export interface GetPdfMakeGeneratorResult {
  download(cb?: () => void, options?: any): void
  download(defaultFileName: string, cb?: () => void, options?: any): void
  getBlob(cb: (result: Blob) => void, options?: any): void
}
export interface PosPaymentSuccessProps {
  contactModule?: CrudModule
  emailReceiptDialog?: React.ReactNode
  getPdfMakeGenerator?: (reportType: string, item) => GetPdfMakeGeneratorResult
  receiptLogo?: ElementType<any>
  receiptModule?: CrudModule
}

const PosPaymentSuccess: React.FC<PosPaymentSuccessProps> = (props) => {
  const {
    emailReceiptDialog: injectedEmailReceiptDialog,
    getPdfMakeGenerator,
    receiptModule,
    ...rest
  } = props
  const { resetCart } = usePos()
  const router = useRouter()
  const onUseGetItem = useGetItem({ module: receiptModule })
  const { item: receipt }: { item: Receipt } = onUseGetItem
  const { customer, paid, payment_method, total } = receipt || {}
  const { email, full_name } = (customer as any as Customer) || {}

  const handleDone = () => {
    resetCart()
    router.push(posConfig.routes.POS_HOME)
  }

  const commonIconSx = { color: 'text.secondary' }
  const renderTitle = (title) => (
    <Typography gutterBottom variant="h5">
      {title}
    </Typography>
  )

  const listItems = [
    {
      title: renderTitle(payment_method),
      href: posConfig.routes.PAYMENT,
      key: 'payment-method',
      right: (
        <Typography gutterBottom variant="h5">
          {printAmount(total)}
        </Typography>
      ),
      startIcon: <MoneyOutlinedIcon sx={commonIconSx} />,
    },
  ]

  const commonSectionTitleProps = {
    color: 'text.secondary',
    sx: { mb: 1 },
    variant: 'overline',
  } as TypographyProps

  const handleOnClickPrintReceipt = async () => {
    const fileName = getReceiptFileName(toString(receipt?.id))
    getPdfMakeGenerator('Receipt', receipt).download(fileName)
  }

  // Email Receipt
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false)
  const handleOpenEmailDialog = () => setIsEmailDialogOpen(true)
  const handleCloseEmailDialog = () => setIsEmailDialogOpen(false)

  const emailReceiptDialogJsx = injectedEmailReceiptDialog || (
    <PosPaymentReceiptEmailDialog
      getPdfMakeGenerator={getPdfMakeGenerator}
      onClose={handleCloseEmailDialog}
      open={isEmailDialogOpen}
      receipt={receipt}
      {...rest}
    />
  )

  const receiptOptionItems = [
    {
      title: 'Print Receipt',
      key: 'print-receipt',
      onClick: handleOnClickPrintReceipt,
    },
    {
      title: 'Email Receipt',
      key: 'email-receipt',
      onClick: handleOpenEmailDialog,
    },
  ]

  return (
    <Stack spacing={2}>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h1">
          Change Due: {printAmount((paid || 0) - (total || 0))}
        </Typography>
      </Box>

      <Box>
        <Container>
          <Stack spacing={4}>
            {/* Customer */}
            <div>
              <Typography {...commonSectionTitleProps}>Customer</Typography>
              <div>
                {full_name ? (
                  <>
                    <Typography gutterBottom variant="h4">
                      {full_name}
                    </Typography>
                    <Typography gutterBottom variant="body1">
                      {email}
                    </Typography>
                  </>
                ) : (
                  '-'
                )}
              </div>
            </div>

            {/* Receipt Option */}
            <div>
              <Typography {...commonSectionTitleProps}>
                Receipt Option
              </Typography>
              <Grid container spacing={2}>
                {receiptOptionItems.map((receiptOptionItem) => {
                  return (
                    <Grid
                      item
                      key={receiptOptionItem.key}
                      md={12 / (receiptOptionItems?.length || 1)}
                      xs={12}
                    >
                      <Button
                        color="inherit"
                        fullWidth
                        variant="outlined"
                        {...receiptOptionItem}
                      />
                    </Grid>
                  )
                })}
              </Grid>
            </div>

            {/* Payment */}
            <Box>
              <Typography {...commonSectionTitleProps}>Payment</Typography>
              <List disablePadding divider items={listItems} />
            </Box>

            <Stack spacing={2}>
              <Button fullWidth>Add Order Note</Button>
              <Divider />
              <Button color="primary" fullWidth onClick={handleDone}>
                Done
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
      {emailReceiptDialogJsx}
    </Stack>
  )
}

export default PosPaymentSuccess
