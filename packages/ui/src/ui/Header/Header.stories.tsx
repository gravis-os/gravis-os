import React from 'react'
import { Badge, Box, Button, ButtonProps } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import Header, { NAV_ITEM_SEARCH_PRESET } from './Header'
import SubHeader from './SubHeader'
import {
  MOCK_HEADER_PROPS,
  MOCK_HEADER_NAV_ITEMS,
  MOCK_SUB_HEADER_PROPS,
  MOCK_DASHBOARD_HEADER_PROPS,
  MOCK_LOGO_JSX,
} from '../../mocks'

export default {
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
    <Box height="50vh" py={10} bgcolor="secondary.main" />
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
              key: 'Search',
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
              key: 'login/signup',
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
            key: 'on-click',
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
            key: 'on-hover',
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
            key: 'account',
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
          {
            key: 'mail',
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
              key: 'logo',
              title: 'Logo',
              children: MOCK_LOGO_JSX,
              hideInMobileDrawer: true,
              showInMobileBar: true,
            },
          ],
          right: [
            {
              key: 'login/signup',
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
        navItems={MOCK_HEADER_NAV_ITEMS}
        {...props}
      />
      <SubHeader {...MOCK_SUB_HEADER_PROPS} />
    </>
  )
}

export const DashboardHeader = (props) => {
  return (
    <>
      <Header {...MOCK_DASHBOARD_HEADER_PROPS} {...props} />
      <SubHeader
        {...MOCK_SUB_HEADER_PROPS}
        containerProps={{ maxWidth: false }}
      />
      <div style={{ height: '200vh' }} />
    </>
  )
}
