import React, { useEffect } from 'react'
import { Box, Button, Container, Grid, Stack, Typography } from '@gravis-os/ui'
import { printAmount } from '@gravis-os/utils'
import isNumber from 'lodash/isNumber'
import { useRouter } from 'next/router'
import { usePos } from './PosProvider'
import posConfig from './posConfig'

export interface PosPaymentCashProps {}

const PosPaymentCash: React.FC<PosPaymentCashProps> = () => {
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
    setPaymentMethodAndPaidAmount('CASH', value)
  }

  // Redirect to payment success page if receipt_id is available
  useEffect(() => {
    if (isNumber(cart.receipt_id)) {
      router.push(`${posConfig.routes.PAYMENT_SUCCESS}/${cart.receipt_id}`)
    }
  }, [cart.receipt_id, router])

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

export default PosPaymentCash
