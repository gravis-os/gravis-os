import React from 'react'
import { Typography } from '@gravis-os/ui'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'

export const MOCK_LOGO_JSX = (
  <Typography fontWeight="bold" sx={{ lineHeight: 1, letterSpacing: 1 }}>
    LOGO
  </Typography>
)

export const MOCK_LIST_ITEMS = [
  {
    key: 'quotations',
    title: '3 Quotations Pending',
    startIcon: <ReceiptOutlinedIcon color="primary" />,
  },
  {
    key: 'delivery-orders',
    title: '3 Delivery Orders Pending',
    startIcon: <ReceiptOutlinedIcon color="primary" />,
  },
  {
    key: 'sales-orders',
    title: '3 Sales Orders Pending',
    startIcon: <ReceiptOutlinedIcon color="primary" />,
  },
  {
    key: 'purchase-orders',
    title: '3 Purchase Orders Pending',
    startIcon: <ReceiptOutlinedIcon color="primary" />,
  },
  { key: 'divider', divider: true },
  {
    key: 'view-all-orders',
    title: 'View All Orders',
    startIcon: <ReceiptOutlinedIcon color="primary" />,
    endIcon: <ChevronRightOutlinedIcon color="primary" />,
  },
]

export const MOCK_CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
