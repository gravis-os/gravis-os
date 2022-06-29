import React from 'react'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import MOCK_IMAGE_1 from '../../public/images/mock_app_card_image_1.png'
import MOCK_DEVICE_FLATLAY_IMAGE_1 from '../../public/images/mock_device_flatlay_image_1.jpg'
import MOCK_DEVICE_FLATLAY_IMAGE_2 from '../../public/images/mock_device_flatlay_image_2.jpeg'
import { BlockItemTypeEnum } from '../ui/Block/BlockItem'
import Typography from '../ui/Typography'

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
  disableBoxShadow: true,
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
  IMAGE: {
    type: BlockItemTypeEnum.IMAGE,
    title: MOCK_IMAGE_1,
    titleProps: { alt: 'MOCK_IMAGE' },
  },
  OVERLINE: { type: BlockItemTypeEnum.OVERLINE, title: 'What we do' },
  H1: {
    type: BlockItemTypeEnum.H1,
    title: 'Application Development',
    titleProps: { gutterBottom: true },
  },
  H3: {
    type: BlockItemTypeEnum.H3,
    title: 'Application Development',
    titleProps: { gutterBottom: true },
  },
  H4: {
    type: BlockItemTypeEnum.H4,
    title: 'Application Development',
    titleProps: { gutterBottom: true },
  },
  H5: { type: BlockItemTypeEnum.H5, title: 'Application Development' },
  SUBTITLE1: {
    type: BlockItemTypeEnum.SUBTITLE1,
    title:
      'We build modern system architectures and scalable applications that radically transform business performance.',
  },
  SUBTITLE2: {
    type: BlockItemTypeEnum.SUBTITLE2,
    title:
      'We build modern system architectures and scalable applications that radically transform business performance.',
  },
  BODY1: {
    type: BlockItemTypeEnum.BODY1,
    title:
      'At the core of One X Tech is a software engineering team specialising in ReactJS, GraphQL, NodeJS, and the extended JavaScript ecosystem',
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
  { key: 'intro', ...MOCK_BLOCK, maxWidth: 'sm', center: true },
  { key: 'features', ...MOCK_BLOCK, maxWidth: 'sm', center: true },
  { key: 'contact', ...MOCK_BLOCK, maxWidth: 'sm', center: true },
]

export const MOCK_CARD_ITEMS = [
  {
    type: BlockItemTypeEnum.CARD,
    cardItems: [
      {
        type: BlockItemTypeEnum.CARD,
        cardProps: { sx: { minHeight: { xs: 500, sm: 560, md: 660 } } },
        items: [
          { type: BlockItemTypeEnum.OVERLINE, title: 'Accessories' },
          {
            type: BlockItemTypeEnum.H3,
            title: 'Explore Mac accessories.',
            titleProps: { maxWidth: '80%' },
          },
          {
            type: BlockItemTypeEnum.BUTTON,
            title: 'Shop',
            titleProps: { variant: 'contained', sx: { mt: 2 } },
          },
          {
            type: BlockItemTypeEnum.CARD_ABSOLUTE_BOTTOM_IMAGE,
            title: MOCK_DEVICE_FLATLAY_IMAGE_1,
          },
        ],
      },
      {
        type: BlockItemTypeEnum.CARD,
        cardProps: { sx: { minHeight: { xs: 500, sm: 560, md: 660 } } },
        items: [
          { type: BlockItemTypeEnum.OVERLINE, title: 'Continuity' },
          {
            type: BlockItemTypeEnum.H3,
            title: 'All your devices. One seamless experience.',
            titleProps: { maxWidth: '80%' },
          },
          {
            type: BlockItemTypeEnum.BODY1,
            title:
              'Because Apple makes iPhone, iPad, Apple Watch and Mac, they work together like no other devices can.',
            titleProps: {
              sx: { mt: 1.5 },
              maxWidth: '60%',
            },
          },
          {
            type: BlockItemTypeEnum.LINK,
            title: 'Learn more',
            titleProps: {
              pointer: true,
              rightCaret: true,
              sx: { mt: 2 },
            },
          },
          {
            type: BlockItemTypeEnum.CARD_ABSOLUTE_BOTTOM_IMAGE,
            title: MOCK_DEVICE_FLATLAY_IMAGE_2,
          },
        ],
      },
    ],
  },
]

// ==============================
// Templates
// ==============================
export const MOCK_BLOCK_HERO = {
  maxWidth: 'md',
  center: true,
  pb: 5,
  sx: { backgroundColor: 'background.paper' },
  items: [
    MOCK_BLOCK_ITEM_TYPES.OVERLINE,
    MOCK_BLOCK_ITEM_TYPES.H1,
    MOCK_BLOCK_ITEM_TYPES.SUBTITLE1,
  ],
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
  sx: { backgroundColor: 'background.paper' },
  spacing: { xs: 5, md: 20 },
  items: [
    {
      type: BlockItemTypeEnum.GRID,
      gridProps: { alignItems: 'center' },
      gridItems: [
        { md: 5, items: [MOCK_BLOCK_ITEM_TYPES.IMAGE] },
        { md: 7, items: MOCK_BLOCK.items },
      ],
    },
    {
      type: BlockItemTypeEnum.GRID,
      gridProps: {
        alignItems: 'center',
        reverse: { xs: true, md: false },
      },
      gridItems: [
        { md: 7, items: MOCK_BLOCK.items },
        { md: 5, items: [MOCK_BLOCK_ITEM_TYPES.IMAGE] },
      ],
    },
    {
      type: BlockItemTypeEnum.GRID,
      gridProps: { alignItems: 'center' },
      gridItems: [
        { md: 5, items: [MOCK_BLOCK_ITEM_TYPES.IMAGE] },
        { md: 7, items: MOCK_BLOCK.items },
      ],
    },
  ],
}
