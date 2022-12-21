import React from 'react'
import { useRouter } from 'next/router'
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
import { usePos } from './PosProvider'
import posConfig from './posConfig'

export interface PosPaymentSuccessProps {}

const PosPaymentSuccess: React.FC<PosPaymentSuccessProps> = (props) => {
  const { cart, resetCart } = usePos()
  const router = useRouter()

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
      title: renderTitle(cart.paymentMethod),
      href: posConfig.routes.PAYMENT,
      right: (
        <Typography variant="h5" gutterBottom>
          {printAmount(cart.total)}
        </Typography>
      ),
    },
  ]

  const commonSectionTitleProps = {
    variant: 'overline',
    color: 'text.secondary',
    sx: { mb: 1 },
  } as TypographyProps

  const receiptOptionItems = [
    { key: 'print-receipt', title: 'Print Receipt' },
    { key: 'email-receipt', title: 'Email Receipt' },
    { key: 'sms-receipt', title: 'SMS Receipt' },
  ]

  return (
    <Stack spacing={2}>
      <Box sx={{ textAlign: 'center', p: 2 }}>
        <Typography variant="h1">
          Change Due: {printAmount(cart.paid - cart.total)}
        </Typography>
      </Box>

      <Box>
        <Container>
          <Stack spacing={4}>
            {/* Customer */}
            <Typography {...commonSectionTitleProps}>Customer</Typography>

            {/* Receipt Option */}
            <div>
              <Typography {...commonSectionTitleProps}>
                Receipt Option
              </Typography>
              <Grid container spacing={2}>
                {receiptOptionItems.map((receiptOptionItem) => {
                  return (
                    <Grid item xs={12} md={4} key={receiptOptionItem.key}>
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
    </Stack>
  )
}

export default PosPaymentSuccess
