import { BlockItemTypeEnum, BlocksProps } from '@gravis-os/web'
import { ButtonProps } from '@gravis-os/ui'

const homeBlocks = [
  {
    key: 'hero',
    maxWidth: 'md' as const,
    center: true,
    sx: { backgroundColor: 'background.paper' },
    items: [
      {
        type: BlockItemTypeEnum.OVERLINE,
        title: 'Gravis - operating system for modern enterprises',
        titleProps: { color: 'text.primary' },
      },
      {
        type: BlockItemTypeEnum.H1,
        title: `Gravis OS`,
        titleProps: { gutterBottom: true },
      },
      {
        type: BlockItemTypeEnum.SUBTITLE1,
        title:
          'Power next-generation business operations with all the modules you need in one place.',
        titleProps: {
          color: 'text.secondary',
          maxWidth: '60%',
        },
      },
      {
        type: BlockItemTypeEnum.STACK,
        sx: { mt: 3 },
        stackProps: {
          center: true,
          direction: 'row',
          reverseDirectionOnMobile: true,
        },
        stackItems: [
          {
            items: [
              {
                type: BlockItemTypeEnum.BUTTON,
                title: 'Request Support',
                titleProps: {
                  variant: 'outlined',
                  size: 'large',
                  fullWidthOnMobile: true,
                },
              },
            ],
          },
          {
            items: [
              {
                type: BlockItemTypeEnum.BUTTON,
                title: 'Get Started',
                titleProps: {
                  variant: 'contained',
                  size: 'large',
                  fullWidthOnMobile: true,
                } as ButtonProps,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    sx: { backgroundColor: 'background.paper' },
    spacing: { xs: 5, md: 20 },
    items: [
      {
        type: BlockItemTypeEnum.GRID,
        gridProps: { alignItems: 'center' },
        gridItems: [
          {
            md: 5,
            items: [
              {
                type: BlockItemTypeEnum.IMAGE,
                title: 'https://source.unsplash.com/random/300x200',
                titleProps: {
                  alt: 'MOCK_IMAGE',
                  width: 300,
                  height: 200,
                  disableOptimzation: true,
                },
              },
            ],
          },
          {
            md: 7,
            items: [
              { type: BlockItemTypeEnum.OVERLINE, title: 'What we do' },
              {
                type: BlockItemTypeEnum.H3,
                title: 'Application Development',
                titleProps: { gutterBottom: true },
              },
              {
                type: BlockItemTypeEnum.SUBTITLE2,
                title:
                  'We build modern system architectures and scalable applications that radically transform business performance.',
              },
            ],
          },
        ],
      },
      {
        type: BlockItemTypeEnum.GRID,
        gridProps: {
          alignItems: 'center',
          reverse: { xs: true, md: false },
        },
        gridItems: [
          {
            md: 7,
            items: [
              { type: BlockItemTypeEnum.OVERLINE, title: 'What we do' },
              {
                type: BlockItemTypeEnum.H3,
                title: 'Application Development',
                titleProps: { gutterBottom: true },
              },
              {
                type: BlockItemTypeEnum.SUBTITLE2,
                title:
                  'We build modern system architectures and scalable applications that radically transform business performance.',
              },
            ],
          },
          {
            md: 5,
            items: [
              {
                type: BlockItemTypeEnum.IMAGE,
                title: 'https://source.unsplash.com/random/300x200',
                titleProps: {
                  alt: 'MOCK_IMAGE',
                  width: 300,
                  height: 200,
                  disableOptimzation: true,
                },
              },
            ],
          },
        ],
      },
      {
        type: BlockItemTypeEnum.GRID,
        gridProps: { alignItems: 'center' },
        gridItems: [
          {
            md: 5,
            items: [
              {
                type: BlockItemTypeEnum.IMAGE,
                title: 'https://source.unsplash.com/random/300x200',
                titleProps: {
                  alt: 'MOCK_IMAGE',
                  width: 300,
                  height: 200,
                  disableOptimzation: true,
                },
              },
            ],
          },
          {
            md: 7,
            items: [
              { type: BlockItemTypeEnum.OVERLINE, title: 'What we do' },
              {
                type: BlockItemTypeEnum.H3,
                title: 'Application Development',
                titleProps: { gutterBottom: true },
              },
              {
                type: BlockItemTypeEnum.SUBTITLE2,
                title:
                  'We build modern system architectures and scalable applications that radically transform business performance.',
              },
            ],
          },
        ],
      },
    ],
  },
] as BlocksProps['items']

export default homeBlocks
