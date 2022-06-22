import React from 'react'
import { Badge, Box, Button, ButtonProps, Typography } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Header, { NAV_ITEM_SEARCH_PRESET } from './Header'
import SubHeader from '../SubHeader'
import { MOCK_SUB_HEADER_PROPS } from '../../mocks'

export default {
  title: 'Components/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
}

// Setup
const Logo = () => {
  return (
    <Typography fontWeight="bold" sx={{ lineHeight: 1, letterSpacing: 1 }}>
      LOGO
    </Typography>
  )
}
const defaultHeaderProps = {
  logo: Logo,
  navItems: [
    {
      name: 'foo',
      title: 'Foo',
      onClick: () => window.alert('You clicked on Foo'),
    },
    { name: 'bar', title: 'Bar', href: '#' },
  ],
}
const handleRecursiveNavItemClick = (e, item) =>
  window.alert(`You clicked on: ${item.title}`)
const defaultButtonProps = {
  size: 'small' as ButtonProps['size'],
  onClick: () => window.alert('Clicked'),
  variant: 'contained' as ButtonProps['variant'],
}

// Stories
export const Basic = (props) => <Header {...defaultHeaderProps} {...props} />

export const Transparent = (props) => (
  <>
    <Header {...defaultHeaderProps} {...props} transparent />
    <Box height={260} py={10} bgcolor="primary.main" />
  </>
)

export const withSubHeader = (props) => {
  return (
    <>
      <Header {...defaultHeaderProps} {...props} />
      <SubHeader {...MOCK_SUB_HEADER_PROPS} />
    </>
  )
}

export const withSearch = (props) => {
  return (
    <>
      <Header
        {...defaultHeaderProps}
        navItems={{
          center: [
            {
              name: 'Search',
              title: 'Search',
              preset: {
                type: NAV_ITEM_SEARCH_PRESET,
                onSearch: (searchValue) =>
                  window.alert(`Searched: ${searchValue}`),
                fullWidth: true,
              },
            },
          ],
          right: [
            ...defaultHeaderProps.navItems,
            {
              name: 'login/signup',
              title: 'login/signup',
              children: <Button {...defaultButtonProps}>Get Started</Button>,
            },
          ],
        }}
        {...props}
      />
    </>
  )
}

export const withItems = (props) => {
  return (
    <>
      <Header
        {...defaultHeaderProps}
        navItems={[
          ...defaultHeaderProps.navItems,
          {
            name: 'on-click',
            title: 'onClick',
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
            name: 'on-hover',
            title: 'onHover',
            isOpenOnHover: true,
            items: [
              {
                title: 'qux',
                onClick: handleRecursiveNavItemClick,
              },
              {
                title: 'zulu',
                href: '#',
              },
              {
                title: 'yankee',
                href: '#',
              },
            ],
          },
          {
            name: 'account',
            title: <AccountCircle />,
            items: [
              {
                title: 'Profile',
                onClick: handleRecursiveNavItemClick,
              },
              {
                title: 'Logout',
                onClick: handleRecursiveNavItemClick,
              },
            ],
          },
        ]}
        {...props}
      />
    </>
  )
}

export const withMegaComponent = (props) => {
  return (
    <>
      <Header
        {...defaultHeaderProps}
        navItems={[
          ...defaultHeaderProps.navItems,
          {
            name: 'onclick-mega-list',
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
            name: 'onclick-mega-menu',
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
          {
            name: 'mail',
            title: (
              <Badge badgeContent={4} color="primary">
                <MailIcon color="action" />
              </Badge>
            ),
            isOpenOnHover: true,
            onClick: () => window.alert('You clicked on mail'),
            renderItems: ({ popupState }) => {
              return (
                <Box sx={{ p: 5, textAlign: 'center' }}>
                  <Button onClick={() => popupState.close()}>Close</Button>
                </Box>
              )
            },
          },
        ]}
        {...props}
      />
    </>
  )
}

export const withLogoCenter = (props) => {
  return (
    <>
      <Header
        navItems={{
          left: [...defaultHeaderProps.navItems],
          center: [
            {
              name: 'logo',
              title: 'Logo',
              children: <Logo />,
              hideInMobileDrawer: true,
              showInMobileBar: true,
            },
          ],
          right: [
            {
              name: 'login/signup',
              title: 'login/signup',
              children: <Button {...defaultButtonProps}>Get Started</Button>,
            },
          ],
        }}
        {...props}
      />
    </>
  )
}

export const withKitchenSink = (props) => {
  return (
    <>
      <Header
        {...defaultHeaderProps}
        navItems={{
          left: [
            {
              name: 'search',
              title: 'Search',
              preset: {
                type: NAV_ITEM_SEARCH_PRESET,
                onSearch: (searchValue) =>
                  window.alert(`Searched: ${searchValue}`),
              },
            },
            {
              name: 'shop',
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
              name: 'disable-backdrop',
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
            ...defaultHeaderProps.navItems,
          ],
          right: [
            {
              name: 'notification',
              title: (
                <Badge badgeContent={4} color="primary">
                  <NotificationsNoneIcon color="action" />
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
              showInMobileBar: true,
            },
            {
              name: 'cart',
              title: (
                <Badge badgeContent={4} color="primary">
                  <ShoppingCartOutlinedIcon color="action" />
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
              showInMobileBar: true,
            },
            {
              name: 'login/signup',
              title: 'login/signup',
              children: <Button {...defaultButtonProps}>Get Started</Button>,
            },
          ],
        }}
        {...props}
      />
      <SubHeader {...MOCK_SUB_HEADER_PROPS} />
    </>
  )
}
