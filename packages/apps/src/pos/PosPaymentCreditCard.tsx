import React from 'react'
import { useRouter } from 'next/router'
import { Box, Button, Container, Grid, Stack, Typography } from '@gravis-os/ui'
import { printAmount } from '@gravis-os/utils'
import { usePos } from './PosProvider'
import posConfig from './posConfig'

export interface PosPaymentCreditCardProps {}

const PosPaymentCreditCard: React.FC<PosPaymentCreditCardProps> = () => {
  const { cart, setPaymentMethodAndPaidAmount } = usePos()
  const router = useRouter()

  const cashOptionItems = [...new Array(6)].map((_, i) => {
    const value = Math.ceil(cart.total / 50) * 50 + 50 * i
    return {
      key: `cash-option-${i}`,
      value,
      title: printAmount(value),
    }
  })

  const handlePaidAmount = (value: number) => {
    setPaymentMethodAndPaidAmount('CREDIT_CARD', value)
    router.push(posConfig.routes.PAYMENT_SUCCESS)
  }

  return (
    <div>
      <Container>
        <Stack spacing={2}>
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h1">
              Total: {printAmount(cart.total)}
            </Typography>
          </Box>

          <div>
            <Grid container spacing={2}>
              {cashOptionItems.map((cashOptionItem) => {
                return (
                  <Grid item xs={12} md={6} lg={3} key={cashOptionItem.key}>
                    <Button
                      fullWidth
                      color="inherit"
                      variant="outlined"
                      onClick={() => handlePaidAmount(cashOptionItem.value)}
                    >
                      {cashOptionItem.title}
                    </Button>
                  </Grid>
                )
              })}
            </Grid>
          </div>
        </Stack>
      </Container>
    </div>
  )
}

export default PosPaymentCreditCard
