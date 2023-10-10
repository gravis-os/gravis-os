'use client'

import React, { useEffect } from 'react'

import { Box, Button, Container, Grid, Stack, Typography } from '@gravis-os/ui'
import { printAmount } from '@gravis-os/utils'
import isNumber from 'lodash/isNumber'
import { useRouter } from 'next/navigation'

import posConfig from './posConfig'
import { usePos } from './PosProvider'

export interface PosPaymentBankTransferProps {}

const PosPaymentBankTransfer: React.FC<PosPaymentBankTransferProps> = () => {
  const { cart, setPaymentMethodAndPaidAmount } = usePos()
  const router = useRouter()

  const cashOptionItems = Array.from({ length: 6 }).map((_, i) => {
    const value = Math.ceil(cart.total / 50) * 50 + 50 * i
    return {
      title: printAmount(value),
      key: `cash-option-${i}`,
      value,
    }
  })

  const handlePaidAmount = (value: number) => {
    setPaymentMethodAndPaidAmount('BANK_TRANSFER', value)
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
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h1">
              Total: {printAmount(cart.total)}
            </Typography>
          </Box>

          <div>
            <Grid container spacing={2}>
              {cashOptionItems.map((cashOptionItem) => {
                return (
                  <Grid item key={cashOptionItem.key} lg={3} md={6} xs={12}>
                    <Button
                      color="inherit"
                      fullWidth
                      onClick={() => handlePaidAmount(cashOptionItem.value)}
                      variant="outlined"
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

export default PosPaymentBankTransfer
