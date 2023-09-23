import React, { useState } from 'react'

import { UseListReturn } from '@gravis-os/query'
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
import posConfig from './posConfig'
import PosProductList from './PosProductList'
import { usePos } from './PosProvider'

export interface PosCartProps {
  // Default states
  defaultEditCartItemOpen?: boolean
  defaultMoreActionsOpen?: boolean

  disableEditCartItem?: boolean
  disableMoreActions?: boolean
  // Edit cart item
  editCartItemDialog?: React.ReactNode
  editCartItemOpen?: boolean
  editCartItemProps?: Record<string, any>

  // More actions
  moreActions?: React.ReactNode
  moreActionsOpen?: boolean
  moreActionsProps?: Record<string, any>
  productSpecImagesQueryResult?: UseListReturn
  setEditCartItemOpen?: React.Dispatch<React.SetStateAction<boolean>>

  setMoreActionsOpen?: React.Dispatch<React.SetStateAction<boolean>>
  sx?: SxProps
}

const PosCart: React.FC<PosCartProps> = (props) => {
  const {
    defaultEditCartItemOpen = false,
    defaultMoreActionsOpen = false,
    disableEditCartItem,
    disableMoreActions,
    // Edit cart item
    editCartItemDialog: injectedEditCartItemDialog,
    editCartItemOpen: injectedEditCartItemOpen,

    editCartItemProps,
    // More actions
    moreActions: injectedMoreActions,
    moreActionsOpen: injectedMoreActionsOpen,
    moreActionsProps,
    setEditCartItemOpen: injectedSetEditCartItemOpen,
    setMoreActionsOpen: injectedSetMoreActionsOpen,

    ...rest
  } = props

  // States
  // Edit cart item states
  const [selectedCartItemIndex, setSelectedCartItemIndex] = useState(0)
  const [localEditCartItemOpen, setLocalEditCartItemOpen] = useState(
    defaultEditCartItemOpen
  )
  const editCartItemOpen =
    injectedEditCartItemOpen === undefined
      ? localEditCartItemOpen
      : injectedEditCartItemOpen
  const setEditCartItemOpen =
    injectedSetEditCartItemOpen === undefined
      ? setLocalEditCartItemOpen
      : injectedSetEditCartItemOpen
  const handleOpenEditCartItem = (index: number) => {
    setSelectedCartItemIndex(index)
    setEditCartItemOpen(true)
  }

  // More actions states
  const [localMoreActionsOpen, setLocalMoreActionsOpen] = useState(
    defaultMoreActionsOpen
  )
  const moreActionsOpen =
    injectedMoreActionsOpen === undefined
      ? localMoreActionsOpen
      : injectedMoreActionsOpen
  const setMoreActionsOpen =
    injectedSetMoreActionsOpen === undefined
      ? setLocalMoreActionsOpen
      : injectedSetMoreActionsOpen

  // Dialog components
  const editCartItemJsx =
    injectedEditCartItemDialog === undefined ? (
      <PosCartEditCartItemDialog
        cartIndex={selectedCartItemIndex}
        onClose={() => setEditCartItemOpen(false)}
        open={editCartItemOpen}
        {...editCartItemProps}
        {...rest}
      />
    ) : (
      injectedEditCartItemDialog
    )

  const moreActionsJsx =
    injectedMoreActions === undefined ? (
      <PosCartMoreActionsDialog
        onClose={() => setMoreActionsOpen(false)}
        open={moreActionsOpen}
        {...moreActionsProps}
      />
    ) : (
      injectedMoreActions
    )

  const { cart, hasCartItems, resetCart } = usePos()
  if (!hasCartItems)
    return (
      <Box center height="100%">
        <ShoppingCartOutlinedIcon
          sx={{ color: 'divider', fontSize: 'h1.fontSize' }}
        />
        <Typography sx={{ color: 'divider', mt: 1 }} variant="h5">
          Add products to your cart to get started.
        </Typography>
      </Box>
    )

  return (
    <Stack sx={{ height: `calc(100% - ${posConfig.appBarHeight}px)` }}>
      {/* Header */}
      <Stack
        alignItems="center"
        direction="row"
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
          overflowX: 'hidden',
          py: posConfig.cartPadding,
        }}
      >
        <Box sx={{ px: posConfig.cartPadding }}>
          <Typography color="text.secondary" gutterBottom variant="overline">
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
        sx={{ backgroundColor: 'background.default', p: posConfig.cartPadding }}
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

      <Box sx={{ backgroundColor: 'background.default', flexGrow: 1 }} />

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
          color="primary"
          fullWidth
          href={posConfig.routes.PAYMENT}
          sx={{ mt: 1 }}
        >
          Checkout
        </Button>
      </Box>
    </Stack>
  )
}

export default PosCart
