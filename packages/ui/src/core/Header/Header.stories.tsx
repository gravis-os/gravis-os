import React from 'react'

import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import { Badge, Box } from '@mui/material'

import {
  MOCK_DASHBOARD_HEADER_PROPS,
  MOCK_HEADER_PROPS,
  MOCK_LOGO_JSX,
  MOCK_SUB_HEADER_PROPS,
} from '../../mocks'
import { getCoreStorybookTitle } from '../../utils/getStorybookTitle'
import Button, { ButtonProps } from '../Button'
import Header from './Header'
import SubHeader from './SubHeader'

export default {
  title: getCoreStorybookTitle(Header.name),
  args: { ...MOCK_HEADER_PROPS },
  component: Header,
  parameters: { layout: 'fullscreen' },
}

const handleRecursiveNavItemClick = (e, item) =>
  window.alert(`You clicked on: ${item.title}`)

const defaultButtonProps = {
  onClick: () => window.alert('Clicked'),
  size: 'small' as ButtonProps['size'],
  variant: 'paper',
} as const

// Stories
export const Basic = (props) => <Header {...props} />

export const Transparent = (props) => <Header {...props} />
Transparent.args = { dark: true, transparent: true }

export const TransparentOnBackground = (props) => (
  <>
    <Header {...props} />
    <Box bgcolor="common.black" height="50vh" py={10} />
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
        title: 'Search',
        key: 'Search',
        preset: {
          fullWidth: true,
          onSearch: (searchValue) => window.alert(`Searched: ${searchValue}`),
          type: 'search',
        },
      },
    ],
    right: [
      {
        title: 'login/signup',
        children: <Button {...defaultButtonProps}>Get Started</Button>,
        key: 'login/signup',
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
        key: 'on-click',
      },
      {
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
        key: 'on-hover',
      },
    ],
    right: [
      {
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
        key: 'account',
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
            <MailIcon />
          </Badge>
        ),
        isOpenOnHover: true,
        key: 'mail',
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
    center: [
      {
        title: 'Logo',
        children: MOCK_LOGO_JSX,
        hideInMobileDrawer: true,
        key: 'logo',
        showOnMobileBar: true,
      },
    ],
    left: [
      MOCK_HEADER_PROPS.navItems.left[1],
      MOCK_HEADER_PROPS.navItems.left[2],
    ],
    right: [
      {
        title: 'login/signup',
        children: <Button {...defaultButtonProps}>Get Started</Button>,
        key: 'login/signup',
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
