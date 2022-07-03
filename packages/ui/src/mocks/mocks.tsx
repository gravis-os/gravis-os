import React from 'react'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'

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
  {
    key: 'invoices',
    title: '4 Invoices Pending',
    startIcon: <ReceiptOutlinedIcon color="primary" />,
  },
]

export const MOCK_NESTED_LIST_ITEMS = [
  {
    key: 'nested-quotations',
    title: 'Nested Quotations',
    startIcon: <ReceiptOutlinedIcon color="primary" />,
    items: [
      {
        ...MOCK_LIST_ITEMS[0],
        items: [MOCK_LIST_ITEMS[4]],
      },
      MOCK_LIST_ITEMS[1],
    ],
  },
  {
    key: 'nested-delivery-orders',
    title: 'Nested Delivery Orders',
    startIcon: <ReceiptOutlinedIcon color="primary" />,
    items: [MOCK_LIST_ITEMS[2], MOCK_LIST_ITEMS[3]],
  },
]
