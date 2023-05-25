import React, { useState } from 'react'
import {
  Box,
  Button,
  DescriptionList,
  Divider,
  Stack,
  Typography,
} from '@gravis-os/ui'
import { printAmount } from '@gravis-os/utils'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { SxProps } from '@mui/material'
import PosCartEditCartItemDialog from './PosCartEditCartItemDialog'
import PosCartMoreActionsDialog from './PosCartMoreActionsDialog'
import PosProductList from './PosProductList'
import { usePos } from './PosProvider'
import posConfig from './posConfig'

export interface PosCartProps {
  // Default states
  defaultEditCartItemOpen?: boolean
  defaultMoreActionsOpen?: boolean

  // Edit cart item
  editCartItemDialog?: React.ReactNode
  editCartItemOpen?: boolean
  disableEditCartItem?: boolean
  setEditCartItemOpen?: React.Dispatch<React.SetStateAction<boolean>>
  editCartItemProps?: any

  // More actions
  moreActions?: React.ReactNode
  moreActionsOpen?: boolean
  disableMoreActions?: boolean
  setMoreActionsOpen?: React.Dispatch<React.SetStateAction<boolean>>
  moreActionsProps?: any

  sx?: SxProps
}

const PosCart: React.FC<PosCartProps> = (props) => {
  const {
    // Edit cart item
    editCartItemDialog: injectedEditCartItemDialog,
    disableEditCartItem,
    defaultEditCartItemOpen = false,
    editCartItemOpen: injectedEditCartItemOpen,
    setEditCartItemOpen: injectedSetEditCartItemOpen,
    editCartItemProps,

    // More actions
    moreActions: injectedMoreActions,
    disableMoreActions,
    defaultMoreActionsOpen = false,
    moreActionsOpen: injectedMoreActionsOpen,
    setMoreActionsOpen: injectedSetMoreActionsOpen,
    moreActionsProps,

    ...rest
  } = props

  // States
  // Edit cart item states
  const [selectedCartItemIndex, setSelectedCartItemIndex] = useState(0)
  const [localEditCartItemOpen, setLocalEditCartItemOpen] = useState(
    defaultEditCartItemOpen
  )
  const editCartItemOpen =
    typeof injectedEditCartItemOpen !== 'undefined'
      ? injectedEditCartItemOpen
      : localEditCartItemOpen
  const setEditCartItemOpen =
    typeof injectedSetEditCartItemOpen !== 'undefined'
      ? injectedSetEditCartItemOpen
      : setLocalEditCartItemOpen
  const handleOpenEditCartItem = (index: number) => {
    setSelectedCartItemIndex(index)
    setEditCartItemOpen(true)
  }

  // More actions states
  const [localMoreActionsOpen, setLocalMoreActionsOpen] = useState(
    defaultMoreActionsOpen
  )
  const moreActionsOpen =
    typeof injectedMoreActionsOpen !== 'undefined'
      ? injectedMoreActionsOpen
      : localMoreActionsOpen
  const setMoreActionsOpen =
    typeof injectedSetMoreActionsOpen !== 'undefined'
      ? injectedSetMoreActionsOpen
      : setLocalMoreActionsOpen

  // Dialog components
  const editCartItemJsx =
    typeof injectedEditCartItemDialog !== 'undefined' ? (
      injectedEditCartItemDialog
    ) : (
      <PosCartEditCartItemDialog
        open={editCartItemOpen}
        onClose={() => setEditCartItemOpen(false)}
        cartIndex={selectedCartItemIndex}
        {...editCartItemProps}
        {...rest}
      />
    )

  const moreActionsJsx =
    typeof injectedMoreActions !== 'undefined' ? (
      injectedMoreActions
    ) : (
      <PosCartMoreActionsDialog
        open={moreActionsOpen}
        onClose={() => setMoreActionsOpen(false)}
        {...moreActionsProps}
      />
    )

  const { cart, resetCart, hasCartItems } = usePos()
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
          <Typography color="red" variant="h4">
            Clear Cart
          </Typography>
        </Button>
        <Button fullWidth onClick={setMoreActionsOpen}>
          <Typography color="primary" variant="h4">
            More Actions
          </Typography>
        </Button>
      </Stack>

      {/* Customer */}
      {cart?.customer && (
        <Stack sx={{ p: posConfig.cartPadding }}>
          <Typography variant="h3">{cart.customer?.full_name}</Typography>
          <Typography variant="body1">{cart.customer?.email}</Typography>
        </Stack>
      )}

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
          items={cart.items}
          onClick={(e, cartItem, index) => {
            handleOpenEditCartItem(index)
          }}
          {...rest}
        />
      </Box>

      {/* Dialogs */}
      {!disableEditCartItem && editCartItemJsx}
      {!disableMoreActions && moreActionsJsx}

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
