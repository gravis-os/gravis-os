import React from 'react'

import { Box, Container, List, Stack, Typography } from '@gravis-os/ui'
import { printAmount } from '@gravis-os/utils'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import MoneyOutlinedIcon from '@mui/icons-material/MoneyOutlined'

import posConfig from './posConfig'
import { usePos } from './PosProvider'

export interface PosPaymentListProps {
  showMorePaymentMethods?: boolean
}

const PosPaymentList: React.FC<PosPaymentListProps> = (props) => {
  const { showMorePaymentMethods = false } = props

  const { cart } = usePos()

  const commonIconSx = { color: 'text.secondary' }
  const renderTitle = (title) => (
    <Typography gutterBottom variant="h5">
      {title}
    </Typography>
  )

  const listItems = [
    {
      title: renderTitle('Cash'),
      href: posConfig.routes.PAYMENT_CASH,
      key: 'cash',
      startIcon: <MoneyOutlinedIcon sx={commonIconSx} />,
    },
    ...(showMorePaymentMethods && [
      {
        title: renderTitle('Credit Card'),
        href: posConfig.routes.PAYMENT_CREDIT_CARD,
        key: 'credit_card',
        startIcon: <CreditCardOutlinedIcon sx={commonIconSx} />,
      },
      {
        title: renderTitle('Bank Transfer'),
        href: posConfig.routes.PAYMENT_BANK_TRANSFER,
        key: 'bank_transfer',
        startIcon: <AttachMoneyOutlinedIcon sx={commonIconSx} />,
      },
    ]),
  ].map((item) => ({
    ...item,
    endIcon: (
      <KeyboardArrowRightOutlinedIcon sx={{ color: 'text.secondary' }} />
    ),
  }))

  return (
    <Stack spacing={2}>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h1">Total {printAmount(cart.total)}</Typography>
      </Box>

      {/* List */}
      <Box>
        <Container maxWidth="md">
          <List divider items={listItems} />
        </Container>
      </Box>
    </Stack>
  )
}

export default PosPaymentList
