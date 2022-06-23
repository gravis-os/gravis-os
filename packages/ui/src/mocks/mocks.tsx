import React from 'react'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import Typography from '../ui/Typography'
import Block from '../ui/Block/Block'
import { BlockItemTypeEnum } from '../ui/Block/BlockItem'

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

export const MOCK_BLOCK_ITEM_TYPES = {
  ICON: {
    type: BlockItemTypeEnum.ICON,
    title: AddCircleOutlineOutlinedIcon,
    titleProps: { sx: { fontSize: 'h2.fontSize' } },
  },
  OVERLINE: { type: BlockItemTypeEnum.OVERLINE, title: 'What we do' },
  TITLE: {
    type: BlockItemTypeEnum.TITLE,
    title: 'Custom Business Software Made for Market Leaders',
  },
  SUBTITLE: {
    type: BlockItemTypeEnum.SUBTITLE,
    title:
      'We build modern system architectures and scalable applications that radically transform business performance.',
  },
  BODY: {
    type: BlockItemTypeEnum.BODY,
    title:
      'At the core of One X Tech is a software engineering team specialising in ReactJS, GraphQL, NodeJS, and the extended JavaScript ecosystem',
  },
  H5: {
    type: BlockItemTypeEnum.H5,
    title: 'Application Development',
  },
}

const MOCK_BLOCK_ITEMS = [
  MOCK_BLOCK_ITEM_TYPES.OVERLINE,
  MOCK_BLOCK_ITEM_TYPES.TITLE,
  MOCK_BLOCK_ITEM_TYPES.SUBTITLE,
]

export const MOCK_BLOCK = {
  items: MOCK_BLOCK_ITEMS,
}

export const MOCK_BLOCKS = [
  { key: 'intro', ...MOCK_BLOCK, maxWidth: 'sm', center: true },
  { key: 'features', ...MOCK_BLOCK, maxWidth: 'sm', center: true },
  { key: 'contact', ...MOCK_BLOCK, maxWidth: 'sm', center: true },
]

const renderBlocks = (blocks) => {
  return (
    <>
      {blocks.map((block) => {
        return <Block key={block.key} {...block} />
      })}
    </>
  )
}

export const MOCK_BLOCKS_JSX = renderBlocks(MOCK_BLOCKS)
