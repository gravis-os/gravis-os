import React from 'react'
import { Badge, Box } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import Header from './Header'
import Button, { ButtonProps } from '../Button'
import SubHeader from './SubHeader'
import {
  MOCK_HEADER_PROPS,
  MOCK_SUB_HEADER_PROPS,
  MOCK_DASHBOARD_HEADER_PROPS,
  MOCK_LOGO_JSX,
} from '../../mocks'

export default {
  component: Header,
  parameters: { layout: 'fullscreen' },
  args: { ...MOCK_HEADER_PROPS },
}

const handleRecursiveNavItemClick = (e, item) =>
  window.alert(`You clicked on: ${item.title}`)

const defaultButtonProps = {
  size: 'small' as ButtonProps['size'],
  onClick: () => window.alert('Clicked'),
  variant: 'paper',
} as const

// Stories
export const Basic = (props) => <Header {...props} />

export const Transparent = (props) => <Header {...props} />
Transparent.args = { transparent: true, dark: true }

export const TransparentOnBackground = (props) => (
  <>
    <Header {...props} />
    <Box height="50vh" py={10} bgcolor="common.black" />
  </>
)
TransparentOnBackground.args = { transparent: true }

export const WithSubHeader = (props) => {
  return (
    <>
      <Header {...props} />
      <SubHeader {...MOCK_SUB_HEADER_PROPS} />
    </>
  )
}

export const WithSearch = (props) => <Header {...props} />
WithSearch.args = {
  navItems: {
    center: [
      {
        key: 'Search',
        title: 'Search',
        preset: {
          type: 'search',
          onSearch: (searchValue) => window.alert(`Searched: ${searchValue}`),
          fullWidth: true,
        },
      },
    ],
    right: [
      {
        key: 'login/signup',
        title: 'login/signup',
        children: <Button {...defaultButtonProps}>Get Started</Button>,
      },
    ],
  },
}

export const WithItems = (props) => <Header {...props} />
WithItems.args = {
  navItems: {
    left: [
      ...MOCK_HEADER_PROPS.navItems.left,
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
    ],
    right: [
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
    ],
  },
}

export const WithMegaComponent = (props) => <Header {...props} />
WithMegaComponent.args = {
  navItems: {
    left: [
      ...MOCK_HEADER_PROPS.navItems.left,
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
        key: 'mail',
        title: (
          <Badge badgeContent={4} color="error">
            <MailIcon />
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
    ],
  },
}

export const WithLogoCenter = (props) => <Header {...props} />
WithLogoCenter.args = {
  center: true,
  navItems: {
    left: [
      MOCK_HEADER_PROPS.navItems.left[1],
      MOCK_HEADER_PROPS.navItems.left[2],
    ],
    center: [
      {
        key: 'logo',
        title: 'Logo',
        children: MOCK_LOGO_JSX,
        hideInMobileDrawer: true,
        showOnMobileBar: true,
      },
    ],
    right: [
      {
        key: 'login/signup',
        title: 'login/signup',
        children: <Button {...defaultButtonProps}>Get Started</Button>,
      },
    ],
  },
}

export const WithDashboardHeader = (props) => {
  return (
    <>
      <Header {...props} />
      <SubHeader
        {...MOCK_SUB_HEADER_PROPS}
        containerProps={{ maxWidth: false }}
      />
      <div style={{ height: '200vh' }} />
    </>
  )
}
WithDashboardHeader.args = MOCK_DASHBOARD_HEADER_PROPS
