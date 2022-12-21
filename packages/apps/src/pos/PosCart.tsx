import React from 'react'
import {
  Stack,
  Button,
  Box,
  Divider,
  DescriptionList,
  Typography,
} from '@gravis-os/ui'
import { printAmount } from '@gravis-os/utils'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import posConfig from './posConfig'
import { usePos } from './PosProvider'
import PosProductList from './PosProductList'

export interface PosCartProps {}

const PosCart: React.FC<PosCartProps> = () => {
  const { cart, resetCart, removeFromCart, hasCartItems } = usePos()

  if (!hasCartItems)
    return (
      <Box center height="100%">
        <ShoppingCartOutlinedIcon
          sx={{ color: 'divider', fontSize: 'h1.fontSize' }}
        />
        <Typography variant="h5" sx={{ color: 'divider', mt: 1 }}>
          Add products to your cart to get started.
        </Typography>
      </Box>
    )

  return (
    <Stack sx={{ height: `calc(100% - ${posConfig.appBarHeight}px)` }}>
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ p: posConfig.cartPadding }}
      >
        <Button fullWidth onClick={resetCart}>
          Clear Cart
        </Button>
        <Button fullWidth>More Actions</Button>
      </Stack>

      {/* Products */}
      <Box
        sx={{
          maxHeight: '50vh',
          py: posConfig.cartPadding,
          overflowX: 'hidden',
        }}
      >
        <Box sx={{ px: posConfig.cartPadding }}>
          <Typography variant="overline" color="text.secondary" gutterBottom>
            Products
          </Typography>
        </Box>
        <PosProductList
          disableEndIcon
          disableImage
          items={cart.items}
          onClick={(e, cartItem, i) => removeFromCart(i)}
        />
      </Box>

      {/* Breakdown */}
      <Box
        sx={{ p: posConfig.cartPadding, backgroundColor: 'background.default' }}
      >
        <DescriptionList
          items={[
            { key: 'Subtotal', value: printAmount(cart.subtotal) },
            {
              key: 'Tax',
              label: `Tax (${(posConfig.tax_rate * 100).toFixed(0)}%)`,
              value: printAmount(cart.tax),
            },
          ]}
          justifyContent="space-between"
          labelProps={{ variant: 'h4' }}
          valueProps={{ variant: 'h4' }}
        />
      </Box>

      <Box sx={{ flexGrow: 1, backgroundColor: 'background.default' }} />

      {/* Total */}
      <Divider />
      <Box sx={{ p: posConfig.cartPadding }}>
        <DescriptionList
          items={[{ key: 'Total', value: printAmount(cart.total) }]}
          justifyContent="space-between"
          labelProps={{ variant: 'h2' }}
          valueProps={{ variant: 'h2' }}
        />

        <Button
          fullWidth
          color="primary"
          sx={{ mt: 1 }}
          href={posConfig.routes.PAYMENT}
        >
          Checkout
        </Button>
      </Box>
    </Stack>
  )
}

export default PosCart
