import React from 'react'
import { Badge, Box, Button, ButtonProps } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Header, { NAV_ITEM_SEARCH_PRESET } from './Header'
import SubHeader from '../SubHeader'
import {
  MOCK_HEADER_PROPS,
  MOCK_SUB_HEADER_PROPS,
  MOCK_LOGO_JSX,
} from '../../mocks'

export default {
  title: 'Components/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
}

const handleRecursiveNavItemClick = (e, item) =>
  window.alert(`You clicked on: ${item.title}`)
const defaultButtonProps = {
  size: 'small' as ButtonProps['size'],
  onClick: () => window.alert('Clicked'),
  variant: 'contained' as ButtonProps['variant'],
}

// Stories
export const Basic = (props) => <Header {...MOCK_HEADER_PROPS} {...props} />

export const Transparent = (props) => (
  <>
    <Header {...MOCK_HEADER_PROPS} {...props} transparent />
    <Box height={260} py={10} bgcolor="primary.main" />
  </>
)

export const withSubHeader = (props) => {
  return (
    <>
      <Header {...MOCK_HEADER_PROPS} {...props} />
      <SubHeader {...MOCK_SUB_HEADER_PROPS} />
    </>
  )
}

export const withSearch = (props) => {
  return (
    <>
      <Header
        {...MOCK_HEADER_PROPS}
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
            ...MOCK_HEADER_PROPS.navItems,
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
        {...MOCK_HEADER_PROPS}
        navItems={[
          ...MOCK_HEADER_PROPS.navItems,
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
        {...MOCK_HEADER_PROPS}
        navItems={[
          ...MOCK_HEADER_PROPS.navItems,
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
          left: [...MOCK_HEADER_PROPS.navItems],
          center: [
            {
              name: 'logo',
              title: 'Logo',
              children: MOCK_LOGO_JSX,
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
        {...MOCK_HEADER_PROPS}
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
            ...MOCK_HEADER_PROPS.navItems,
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
