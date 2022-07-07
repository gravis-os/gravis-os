import React from 'react'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'
import Typography from '../ui/Typography'

export const MOCK_LIST_ITEMS = [
  {
    key: 'quotations',
    title: '3 Quotations Pending',
    startIcon: <ReceiptOutlinedIcon />,
  },
  {
    key: 'delivery-orders',
    title: '3 Delivery Orders Pending',
    startIcon: <ReceiptOutlinedIcon />,
  },
  {
    key: 'sales-orders',
    title: '3 Sales Orders Pending',
    startIcon: <ReceiptOutlinedIcon />,
  },
  {
    key: 'purchase-orders',
    title: '3 Purchase Orders Pending',
    startIcon: <ReceiptOutlinedIcon />,
  },
  {
    key: 'invoices',
    title: '4 Invoices Pending',
    startIcon: <ReceiptOutlinedIcon />,
  },
]

export const MOCK_NESTED_LIST_ITEMS = [
  {
    key: 'nested-quotations',
    title: 'Nested Quotations',
    startIcon: <ReceiptOutlinedIcon />,
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
    startIcon: <ReceiptOutlinedIcon />,
    items: [MOCK_LIST_ITEMS[2], MOCK_LIST_ITEMS[3]],
  },
]

export const MOCK_LOGO_JSX = (
  <Typography fontWeight="bold" sx={{ lineHeight: 1, letterSpacing: 1 }}>
    LOGO
  </Typography>
)

export const MOCK_CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

export const MOCK_NAV_ACCORDION_ITEMS = [
  { key: 'foo', title: 'Foo', href: '/' },
  { key: 'bar', title: 'Bar', href: '/' },
  { key: 'baz', title: 'Baz', href: '/' },
]

export const MOCK_HEADER_PROPS = {
  logo: () => MOCK_LOGO_JSX,
  disableBoxShadow: true,
  navItems: [
    {
      name: 'foo',
      title: 'Foo',
      onClick: () => window.alert('You clicked on Foo'),
    },
    { name: 'bar', title: 'Bar', href: '#' },
  ],
}

export const MOCK_SUB_HEADER_PROPS = {
  title: 'Product Design',
  links: [
    {
      title: 'Overview',
      href: '#overview',
    },
    {
      title: 'Framework',
      href: '#framework',
    },
    {
      title: 'Process',
      href: '#process',
    },
  ],
  button: {
    title: 'View Pricing',
    href: '/',
  },
}
