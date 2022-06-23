import React from 'react'
import Typography from '../ui/Typography'
import Box from '../ui/Box'
import Container from '../ui/Container'

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

export const MOCK_FAQ_ACCORDION_ITEMS = [
  { key: 'foo', title: 'Foo', content: MOCK_CONTENT },
  { key: 'bar', title: 'Bar', content: MOCK_CONTENT },
  { key: 'baz', title: 'Baz', content: MOCK_CONTENT },
]

export const MOCK_HEADER_PROPS = {
  logo: () => MOCK_LOGO_JSX,
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

export const MOCK_FOOTER_PROPS = {
  logo: MOCK_LOGO_JSX,
  companyName: 'Acme Inc.',
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

export const MOCK_BLOCK_PROPS = {
  py: 15,
  sx: { backgroundColor: 'background.paper' },
  center: true,
  reveal: true,
  textAlign: 'center',
}

export const MOCK_BLOCK_JSX = (
  <Box {...MOCK_BLOCK_PROPS}>
    <Container maxWidth="sm">
      <Typography variant="overline" color="text.secondary" gutterBottom>
        What we do
      </Typography>
      <Typography variant="h3" gutterBottom>
        Custom Business Software Made for Market Leaders
      </Typography>
      <Typography variant="h5" color="text.secondary">
        We build modern system architectures and scalable applications that
        radically transform business performance.
      </Typography>
    </Container>
  </Box>
)
