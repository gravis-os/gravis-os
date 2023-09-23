import React from 'react'

import { Typography } from '@gravis-os/ui'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'

import { BlockItemTypeEnum } from '../web/Block/constants'

export const MOCK_LOGO_JSX = (
  <Typography
    color="inherit"
    fontWeight="bold"
    sx={{ letterSpacing: 1, lineHeight: 1 }}
  >
    LOGO
  </Typography>
)

export const MOCK_CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

export const MOCK_FAQ_ACCORDION_ITEMS = [
  { title: 'Foo', content: MOCK_CONTENT, key: 'foo' },
  { title: 'Bar', content: MOCK_CONTENT, key: 'bar' },
  { title: 'Baz', content: MOCK_CONTENT, key: 'baz' },
]

export const MOCK_NAV_ACCORDION_ITEMS = [
  { title: 'Foo', href: '/', key: 'foo' },
  { title: 'Bar', href: '/', key: 'bar' },
  { title: 'Baz', href: '/', key: 'baz' },
]

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

export const MOCK_BLOCK_ITEM_TYPES = {
  BODY1: {
    title:
      'At the core of One X Tech is a software engineering team specialising in ReactJS, GraphQL, NodeJS, and the extended JavaScript ecosystem',
    type: BlockItemTypeEnum.BODY1,
  },
  H1: {
    title: 'Application Development',
    titleProps: { gutterBottom: true },
    type: BlockItemTypeEnum.H1,
  },
  H3: {
    title: 'Application Development',
    titleProps: { gutterBottom: true },
    type: BlockItemTypeEnum.H3,
  },
  H4: {
    title: 'Application Development',
    titleProps: { gutterBottom: true },
    type: BlockItemTypeEnum.H4,
  },
  H5: { title: 'Application Development', type: BlockItemTypeEnum.H5 },
  ICON: {
    title: AddCircleOutlineOutlinedIcon,
    titleProps: { sx: { fontSize: 'h2.fontSize' } },
    type: BlockItemTypeEnum.ICON,
  },
  IMAGE: {
    title: 'https://via.placeholder.com/300x200',
    titleProps: { alt: 'MOCK_IMAGE', height: 200, width: 300 },
    type: BlockItemTypeEnum.IMAGE,
  },
  OVERLINE: { title: 'What we do', type: BlockItemTypeEnum.OVERLINE },
  SUBTITLE1: {
    title:
      'We build modern system architectures and scalable applications that radically transform business performance.',
    type: BlockItemTypeEnum.SUBTITLE1,
  },
  SUBTITLE2: {
    title:
      'We build modern system architectures and scalable applications that radically transform business performance.',
    type: BlockItemTypeEnum.SUBTITLE2,
  },
}

const MOCK_BLOCK_ITEMS = [
  MOCK_BLOCK_ITEM_TYPES.OVERLINE,
  MOCK_BLOCK_ITEM_TYPES.H3,
  MOCK_BLOCK_ITEM_TYPES.SUBTITLE2,
]

export const MOCK_BLOCK = {
  items: MOCK_BLOCK_ITEMS,
}

export const MOCK_BLOCKS = [
  { key: 'intro', ...MOCK_BLOCK, center: true, maxWidth: 'sm' },
  { key: 'features', ...MOCK_BLOCK, center: true, maxWidth: 'sm' },
  { key: 'contact', ...MOCK_BLOCK, center: true, maxWidth: 'sm' },
]

export const MOCK_CARD_ITEMS = [
  {
    cardItems: [
      {
        cardProps: { sx: { minHeight: { xs: 500, sm: 560, md: 660 } } },
        items: [
          { title: 'Accessories', type: BlockItemTypeEnum.OVERLINE },
          {
            title: 'Explore Mac accessories.',
            titleProps: { maxWidth: '80%' },
            type: BlockItemTypeEnum.H3,
          },
          {
            title: 'Shop',
            titleProps: { sx: { mt: 2 }, variant: 'contained' },
            type: BlockItemTypeEnum.BUTTON,
          },
        ],
        type: BlockItemTypeEnum.CARD,
      },
      {
        cardProps: { sx: { minHeight: { xs: 500, sm: 560, md: 660 } } },
        items: [
          { title: 'Continuity', type: BlockItemTypeEnum.OVERLINE },
          {
            title: 'All your devices. One seamless experience.',
            titleProps: { maxWidth: '80%' },
            type: BlockItemTypeEnum.H3,
          },
          {
            title:
              'Because Apple makes iPhone, iPad, Apple Watch and Mac, they work together like no other devices can.',
            titleProps: {
              maxWidth: '60%',
              sx: { mt: 1.5 },
            },
            type: BlockItemTypeEnum.BODY1,
          },
          {
            title: 'Learn more',
            titleProps: {
              pointer: true,
              rightCaret: true,
              sx: { mt: 2 },
            },
            type: BlockItemTypeEnum.LINK,
          },
        ],
        type: BlockItemTypeEnum.CARD,
      },
    ],
    type: BlockItemTypeEnum.CARD,
  },
]

// ==============================
// Templates
// ==============================
export const MOCK_BLOCK_HERO = {
  center: true,
  items: [
    MOCK_BLOCK_ITEM_TYPES.OVERLINE,
    MOCK_BLOCK_ITEM_TYPES.H1,
    MOCK_BLOCK_ITEM_TYPES.SUBTITLE1,
  ],
  maxWidth: 'md',
  pb: 5,
  sx: { backgroundColor: 'background.paper' },
}

export const MOCK_RIGHT_WING_GRID_ITEMS = [
  {
    md: 4,
    items: [MOCK_BLOCK_ITEM_TYPES.IMAGE],
  },
  {
    md: 8,
    items: [
      {
        ...MOCK_BLOCK_ITEM_TYPES.H5,
        titleProps: { gutterBottom: true },
      },
      {
        ...MOCK_BLOCK_ITEM_TYPES.BODY1,
        titleProps: { color: 'text.secondary' },
      },
    ],
  },
]

export const MOCK_BLOCK_ALTERNATE_WING_GRID = {
  items: [
    {
      gridItems: [
        { md: 5, items: [MOCK_BLOCK_ITEM_TYPES.IMAGE] },
        { md: 7, items: MOCK_BLOCK.items },
      ],
      gridProps: { alignItems: 'center' },
      type: BlockItemTypeEnum.GRID,
    },
    {
      gridItems: [
        { md: 7, items: MOCK_BLOCK.items },
        { md: 5, items: [MOCK_BLOCK_ITEM_TYPES.IMAGE] },
      ],
      gridProps: {
        alignItems: 'center',
        reverse: { xs: true, md: false },
      },
      type: BlockItemTypeEnum.GRID,
    },
    {
      gridItems: [
        { md: 5, items: [MOCK_BLOCK_ITEM_TYPES.IMAGE] },
        { md: 7, items: MOCK_BLOCK.items },
      ],
      gridProps: { alignItems: 'center' },
      type: BlockItemTypeEnum.GRID,
    },
  ],
  spacing: { xs: 5, md: 20 },
  sx: { backgroundColor: 'background.paper' },
}
