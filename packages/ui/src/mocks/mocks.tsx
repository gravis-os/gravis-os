import React from 'react'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'

import { Badge, Box, Button, IconButton, Stack, Typography } from '../core'

export const MOCK_LIST_ITEMS = [
  {
    title: '3 Quotations Pending',
    key: 'quotations',
    startIcon: <ReceiptOutlinedIcon />,
  },
  {
    title: '3 Delivery Orders Pending',
    key: 'delivery-orders',
    startIcon: <ReceiptOutlinedIcon />,
  },
  {
    title: '3 Sales Orders Pending',
    key: 'sales-orders',
    startIcon: <ReceiptOutlinedIcon />,
  },
  {
    title: '3 Purchase Orders Pending',
    key: 'purchase-orders',
    startIcon: <ReceiptOutlinedIcon />,
  },
  {
    title: '4 Invoices Pending',
    key: 'invoices',
    startIcon: <ReceiptOutlinedIcon />,
  },
]

export const MOCK_NESTED_LIST_ITEMS = [
  {
    title: 'Nested Quotations',
    items: [
      {
        ...MOCK_LIST_ITEMS[0],
        items: [MOCK_LIST_ITEMS[4]],
      },
      MOCK_LIST_ITEMS[1],
    ],
    key: 'nested-quotations',
    startIcon: <ReceiptOutlinedIcon />,
  },
  {
    title: 'Nested Delivery Orders',
    items: [MOCK_LIST_ITEMS[2], MOCK_LIST_ITEMS[3]],
    key: 'nested-delivery-orders',
    startIcon: <ReceiptOutlinedIcon />,
  },
]

export const MOCK_LOGO_JSX = (
  <Typography
    fontWeight="bold"
    sx={{ color: 'inherit', letterSpacing: 1, lineHeight: 1 }}
  >
    LOGO
  </Typography>
)

export const MOCK_CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

export const MOCK_NAV_ACCORDION_ITEMS = [
  { title: 'Foo', href: '/', key: 'foo' },
  { title: 'Bar', href: '/', key: 'bar' },
  { title: 'Baz', href: '/', key: 'baz' },
]

export const MOCK_HEADER_PROPS = {
  disableBoxShadow: true,
  navItems: {
    left: [
      {
        title: 'Logo',
        children: MOCK_LOGO_JSX,
        key: 'logo',
        onClick: () => window.alert('You clicked on Foo'),
        showOnMobileBar: true,
        sx: { mr: 1 },
      },
      {
        title: 'Foo',
        key: 'foo',
        onClick: () => window.alert('You clicked on Foo'),
      },
      { title: 'Bar', href: '#', key: 'bar' },
    ],
  },
}

export const MOCK_SUB_HEADER_PROPS = {
  title: 'Product Design',
  button: {
    title: 'View Pricing',
    href: '/',
  },
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
}

const handleRecursiveNavItemClick = (e, item) =>
  window.alert(`You clicked on: ${item.title}`)

export const MOCK_HEADER_NAV_ITEMS = {
  left: [
    MOCK_HEADER_PROPS.navItems.left[0],
    {
      title: 'Search',
      key: 'search',
      preset: {
        onSearch: (searchValue) => window.alert(`Searched: ${searchValue}`),
        type: 'search',
      },
    },
    {
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
      key: 'shop',
    },
    {
      title: 'Disable Backdrop',
      disableBackdrop: true,
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
      key: 'disable-backdrop',
    },
    {
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
      key: 'onclick-mega-list',
    },
    {
      title: 'onClick Mega Menu',
      fullWidth: true,
      key: 'onclick-mega-menu',
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
      title: (
        <Badge badgeContent={4} color="error">
          <NotificationsNoneIcon />
        </Badge>
      ),
      hideInMobileDrawer: true,
      isOpenOnHover: true,
      key: 'notifications',
      onClick: () => window.alert('You clicked on notifications'),
      renderItems: ({ popupState }) => {
        return (
          <Box sx={{ p: 5, textAlign: 'center' }}>
            <Button onClick={() => popupState.close()}>Close</Button>
          </Box>
        )
      },
      showOnMobileBar: true,
    },
    {
      title: (
        <Badge badgeContent={4} color="error">
          <ShoppingCartOutlinedIcon />
        </Badge>
      ),
      hideInMobileDrawer: true,
      key: 'cart',
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
              fullWidth
              onClick={() => popupState.close()}
              variant="contained"
            >
              Close
            </Button>
          </Box>
        )
      },
      showOnMobileBar: true,
    },
    {
      title: (
        <Stack alignItems="center" direction="row" spacing={1}>
          <AccountCircleIcon />
          <Typography color="inherit" variant="button">
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
      key: 'profile',
      showOnMobileBar: true,
    },
    {
      title: 'login/signup',
      children: (
        <Button size="small" variant="paper">
          Get Started
        </Button>
      ),
      key: 'login/signup',
    },
    {
      key: 'right-aside-menu-toggle',
      render: (props) => {
        const { rightAsideOpen, setRightAsideOpen } = props
        return (
          <IconButton
            color="inherit"
            edge="end"
            onClick={() => setRightAsideOpen(!rightAsideOpen)}
          >
            <InfoOutlinedIcon />
          </IconButton>
        )
      },
    },
  ],
}

export const MOCK_DASHBOARD_HEADER_PROPS = {
  containerProps: { maxWidth: false },
  disableBoxShadow: true,
  navItems: MOCK_HEADER_NAV_ITEMS,
  toolbarProps: { variant: 'regular' },
}

export const MOCK_FOOTER_PROPS = {
  companyName: 'Acme Inc.',
  logo: MOCK_LOGO_JSX,
  navItems: [
    {
      title: 'What We Do',
      items: [
        { title: 'Product Design', href: '#' },
        { title: 'Pricing', href: '#' },
      ],
    },
    {
      title: 'Learn more',
      items: [
        { title: 'Work', href: '#' },
        { title: 'About', href: '#' },
      ],
    },
    {
      title: 'Support',
      items: [{ title: 'Contact', href: '#' }],
    },
  ],
}
