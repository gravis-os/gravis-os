import React from 'react'
import { Container, Box, List, Stack, Typography } from '@gravis-os/ui'
import { printAmount } from '@gravis-os/utils'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import MoneyOutlinedIcon from '@mui/icons-material/MoneyOutlined'
import { usePos } from './PosProvider'
import posConfig from './posConfig'

export interface PosPaymentListProps {}

const PosPaymentList: React.FC<PosPaymentListProps> = (props) => {
  const { cart } = usePos()

  const commonIconSx = { color: 'text.secondary' }
  const renderTitle = (title) => (
    <Typography variant="h5" gutterBottom>
      {title}
    </Typography>
  )

  const listItems = [
    {
      key: 'cash',
      startIcon: <MoneyOutlinedIcon sx={commonIconSx} />,
      title: renderTitle('Cash'),
      href: posConfig.routes.PAYMENT_CASH,
    },
  ].map((item) => ({
    ...item,
    endIcon: (
      <KeyboardArrowRightOutlinedIcon sx={{ color: 'text.secondary' }} />
    ),
  }))

  return (
    <Stack spacing={2}>
      <Box sx={{ textAlign: 'center', p: 2 }}>
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