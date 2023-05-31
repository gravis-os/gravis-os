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
import { useRouter } from 'next/router'
import PosPaymentReceiptEmailDialog from './PosPaymentReceiptEmailDialog'
import { usePos } from './PosProvider'
import posConfig from './posConfig'
import { Customer, Receipt } from './types'

export interface PosPaymentSuccessProps {
  pdfMakePrintFunction?: any
  receiptModule?: CrudModule
  emailReceiptDialog?: React.ReactNode
  contactModule?: CrudModule
  receiptLogo?: ElementType<any>
}

const PosPaymentSuccess: React.FC<PosPaymentSuccessProps> = (props) => {
  const {
    receiptModule,
    emailReceiptDialog: injectedEmailReceiptDialog,
    pdfMakePrintFunction,
    ...rest
  } = props
  const { resetCart } = usePos()
  const { print, getPdfGenerator } = pdfMakePrintFunction()
  const router = useRouter()
  const onUseGetItem = useGetItem({ module: receiptModule })
  const { item: receipt }: { item: Receipt } = onUseGetItem
  const { payment_method, total, paid, customer } = receipt || {}
  const { full_name, email } = (customer as any as Customer) || {}

  const handleDone = () => {
    resetCart()
    router.push(posConfig.routes.POS_HOME)
  }

  const commonIconSx = { color: 'text.secondary' }
  const renderTitle = (title) => (
    <Typography variant="h5" gutterBottom>
      {title}
    </Typography>
  )

  const listItems = [
    {
      key: 'payment-method',
      startIcon: <MoneyOutlinedIcon sx={commonIconSx} />,
      title: renderTitle(payment_method),
      href: posConfig.routes.PAYMENT,
      right: (
        <Typography variant="h5" gutterBottom>
          {printAmount(total)}
        </Typography>
      ),
    },
  ]

  const commonSectionTitleProps = {
    variant: 'overline',
    color: 'text.secondary',
    sx: { mb: 1 },
  } as TypographyProps

  const handleOnClickPrintReceipt = async () => {
    print('Receipt', receipt)
  }

  // Email Receipt
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false)
  const handleOpenEmailDialog = () => setIsEmailDialogOpen(true)
  const handleCloseEmailDialog = () => setIsEmailDialogOpen(false)

  const emailReceiptDialogJsx = injectedEmailReceiptDialog || (
    <PosPaymentReceiptEmailDialog
      open={isEmailDialogOpen}
      onClose={handleCloseEmailDialog}
      getPdfGenerator={getPdfGenerator}
      receipt={receipt}
      {...rest}
    />
  )

  const receiptOptionItems = [
    {
      key: 'print-receipt',
      title: 'Print Receipt',
      onClick: handleOnClickPrintReceipt,
    },
    {
      key: 'email-receipt',
      title: 'Email Receipt',
      onClick: handleOpenEmailDialog,
    },
  ]

  return (
    <Stack spacing={2}>
      <Box sx={{ textAlign: 'center', p: 2 }}>
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
                    <Typography variant="h4" gutterBottom>
                      {full_name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
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
                      xs={12}
                      md={12 / (receiptOptionItems?.length || 1)}
                      key={receiptOptionItem.key}
                    >
                      <Button
                        fullWidth
                        color="inherit"
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
              <Button fullWidth color="primary" onClick={handleDone}>
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
