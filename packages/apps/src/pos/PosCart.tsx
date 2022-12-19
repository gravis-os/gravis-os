import React from 'react'
import { Stack, Button, Box, Divider } from '@gravis-os/ui'
import posConfig from './posConfig'

export interface PosCartProps {}

const PosCart: React.FC<PosCartProps> = (props) => {
  return (
    <Stack sx={{ height: `calc(100% - ${posConfig.appBarHeight}px)` }}>
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ p: posConfig.cartPadding }}
      >
        <Button fullWidth>Clear Cart</Button>
        <Button fullWidth>More Actions</Button>
      </Stack>

      {/* Products */}
      <Box sx={{ p: posConfig.cartPadding }}>Product</Box>

      {/* Breakdown */}
      <Box sx={{ p: posConfig.cartPadding }}>Breakdown</Box>

      <Box sx={{ flexGrow: 1 }} />

      {/* Total */}
      <Divider />
      <Box sx={{ p: posConfig.cartPadding }}>
        <Button fullWidth color="primary">
          Checkout
        </Button>
      </Box>
    </Stack>
  )
}

export default PosCart
