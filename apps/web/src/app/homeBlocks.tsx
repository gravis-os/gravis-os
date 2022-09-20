import { BlockItemTypeEnum, BlocksProps } from '@gravis-os/web'
import { ButtonProps } from '@gravis-os/ui'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'

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
        titleProps: { color: 'text.secondary' },
      },
      {
        type: BlockItemTypeEnum.H1,
        title: `Build. Develop. Ship`,
        titleProps: {
          gutterBottom: true,
          gradient: {
            to: 'success.light',
            from: 'info.light',
          },
        },
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
    key: 'brands',
    center: true,
    sx: { backgroundColor: 'background.paper' },
    items: [
      {
        type: BlockItemTypeEnum.OVERLINE,
        title: 'Gravis - operating system for modern enterprises',
        titleProps: { color: 'text.primary' },
      },
      {
        type: BlockItemTypeEnum.GRID,
        sx: { mt: { xs: 5, md: 10 } },
        gridProps: { spacing: { xs: 5 } },
        gridItems: [
          {
            sx: { textAlign: { xs: 'center' } },
            items: [
              {
                type: BlockItemTypeEnum.ICON,
                title: AddCircleOutlineOutlinedIcon,
                titleProps: { sx: { fontSize: 'h2.fontSize' } },
              },
              {
                type: BlockItemTypeEnum.H5,
                title: 'Application Development',
                titleProps: { gutterBottom: true },
              },
            ],
          },
          {
            sx: { textAlign: { xs: 'center' } },
            items: [
              {
                type: BlockItemTypeEnum.ICON,
                title: AddCircleOutlineOutlinedIcon,
                titleProps: { sx: { fontSize: 'h2.fontSize' } },
              },
              {
                type: BlockItemTypeEnum.H5,
                title: 'Application Development',
                titleProps: { gutterBottom: true },
              },
            ],
          },
          {
            sx: { textAlign: { xs: 'center' } },
            items: [
              {
                type: BlockItemTypeEnum.ICON,
                title: AddCircleOutlineOutlinedIcon,
                titleProps: { sx: { fontSize: 'h2.fontSize' } },
              },
              {
                type: BlockItemTypeEnum.H5,
                title: 'Application Development',
                titleProps: { gutterBottom: true },
              },
            ],
          },
          {
            sx: { textAlign: { xs: 'center' } },
            items: [
              {
                type: BlockItemTypeEnum.ICON,
                title: AddCircleOutlineOutlinedIcon,
                titleProps: { sx: { fontSize: 'h2.fontSize' } },
              },
              {
                type: BlockItemTypeEnum.H5,
                title: 'Application Development',
                titleProps: { gutterBottom: true },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 'benefits',
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
  {
    key: 'callout',
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
        type: BlockItemTypeEnum.H2,
        title: `Start your dashboard in seconds`,
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
] as BlocksProps['items']

export default homeBlocks
