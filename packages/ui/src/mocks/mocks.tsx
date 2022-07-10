import React from 'react'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Badge, Box, Button, Stack, Typography } from '../ui'

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
  <Typography
    fontWeight="bold"
    sx={{ lineHeight: 1, letterSpacing: 1, color: 'inherit' }}
  >
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
  disableBoxShadow: true,
  navItems: {
    left: [
      {
        key: 'logo',
        title: 'Logo',
        children: MOCK_LOGO_JSX,
        onClick: () => window.alert('You clicked on Foo'),
        sx: { mr: 1 },
        showOnMobileBar: true,
      },
      {
        key: 'foo',
        title: 'Foo',
        onClick: () => window.alert('You clicked on Foo'),
      },
      { key: 'bar', title: 'Bar', href: '#' },
    ],
  },
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

const handleRecursiveNavItemClick = (e, item) =>
  window.alert(`You clicked on: ${item.title}`)

export const MOCK_HEADER_NAV_ITEMS = {
  left: [
    MOCK_HEADER_PROPS.navItems.left[0],
    {
      key: 'search',
      title: 'Search',
      preset: {
        type: 'search',
        onSearch: (searchValue) => window.alert(`Searched: ${searchValue}`),
      },
    },
    {
      key: 'shop',
      title: 'Shop',
      items: [
        {
          title: 'foo',
          onClick: handleRecursiveNavItemClick,
        },
        {
          title: 'bar',
          href: '#',
        },
        {
          title: 'baz',
          href: '#',
        },
      ],
    },
    {
      key: 'disable-backdrop',
      title: 'Disable Backdrop',
      items: [
        {
          title: 'foo',
          onClick: handleRecursiveNavItemClick,
        },
        {
          title: 'bar',
          href: '#',
        },
        {
          title: 'baz',
          href: '#',
        },
      ],
      disableBackdrop: true,
    },
    {
      key: 'onclick-mega-list',
      title: 'onClick Mega List',
      fullWidth: true,
      items: [
        {
          title: 'alpha',
          onClick: handleRecursiveNavItemClick,
        },
        {
          title: 'bravo',
          href: '#',
        },
        {
          title: 'charlie',
          href: '#',
        },
      ],
    },
    {
      key: 'onclick-mega-menu',
      title: 'onClick Mega Menu',
      fullWidth: true,
      renderItems: ({ popupState }) => {
        return (
          <Box sx={{ p: 5, textAlign: 'center' }}>
            <Button onClick={() => popupState.close()}>Close</Button>
          </Box>
        )
      },
    },
  ],
  right: [
    {
      key: 'notifications',
      title: (
        <Badge badgeContent={4} color="error">
          <NotificationsNoneIcon />
        </Badge>
      ),
      isOpenOnHover: true,
      onClick: () => window.alert('You clicked on notifications'),
      renderItems: ({ popupState }) => {
        return (
          <Box sx={{ p: 5, textAlign: 'center' }}>
            <Button onClick={() => popupState.close()}>Close</Button>
          </Box>
        )
      },
      hideInMobileDrawer: true,
      showOnMobileBar: true,
    },
    {
      key: 'cart',
      title: (
        <Badge badgeContent={4} color="error">
          <ShoppingCartOutlinedIcon />
        </Badge>
      ),
      renderItems: ({ popupState }) => {
        return (
          <Box sx={{ minWidth: 200, p: 1 }}>
            <div>
              <h3>Shopping Cart</h3>
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </ul>
            </div>
            <Button
              variant="contained"
              fullWidth
              onClick={() => popupState.close()}
            >
              Close
            </Button>
          </Box>
        )
      },
      hideInMobileDrawer: true,
      showOnMobileBar: true,
    },
    {
      key: 'profile',
      title: (
        <Stack direction="row" alignItems="center" spacing={1}>
          <AccountCircleIcon />
          <Typography variant="button" color="inherit">
            Sally Gullerimo
          </Typography>
        </Stack>
      ),
      items: [
        {
          title: 'foo',
          onClick: handleRecursiveNavItemClick,
        },
        {
          title: 'bar',
          href: '#',
        },
        {
          title: 'baz',
          href: '#',
        },
      ],
      showOnMobileBar: true,
    },
    {
      key: 'login/signup',
      title: 'login/signup',
      children: (
        <Button size="small" variant="paper">
          Get Started
        </Button>
      ),
    },
  ],
}

export const MOCK_DASHBOARD_HEADER_PROPS = {
  containerProps: { maxWidth: false },
  disableBoxShadow: true,
  navItems: MOCK_HEADER_NAV_ITEMS,
  toolbarProps: { variant: 'regular' },
}
