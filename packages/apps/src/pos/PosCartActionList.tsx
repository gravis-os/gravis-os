import React from 'react'

import { Box, Container, List, Stack, Typography } from '@gravis-os/ui'
import { printAmount } from '@gravis-os/utils'
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined'
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import MoneyOutlinedIcon from '@mui/icons-material/MoneyOutlined'

import posConfig from './posConfig'
import { usePos } from './PosProvider'

export interface PosCartActionListProps {}

const PosCartActionList: React.FC<PosCartActionListProps> = (props) => {
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
    {
      title: renderTitle('Credit Card'),
      href: posConfig.routes.PAYMENT_CREDIT_CARD,
      key: 'credit-card',
      startIcon: <CreditCardOutlinedIcon sx={commonIconSx} />,
    },
    {
      title: renderTitle('Bank Transfer'),
      href: posConfig.routes.PAYMENT_BANK_TRANSFER,
      key: 'bank-transfer',
      startIcon: <AccountBalanceOutlinedIcon sx={commonIconSx} />,
    },
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
        <Container>
          <List divider items={listItems} />
        </Container>
      </Box>
    </Stack>
  )
}

export default PosCartActionList
