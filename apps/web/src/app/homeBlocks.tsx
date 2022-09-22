import { BlockItemTypeEnum, BlocksProps } from '@gravis-os/web'
import { ButtonProps } from '@gravis-os/ui'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import auth0_svg from '../../public/endorsements/auth0.svg'
import tripadvisor_svg from '../../public/endorsements/tripadvisor-horizontal.svg'
import washingtonpost_svg from '../../public/endorsements/washingtonpost.svg'
import uber_svg from '../../public/endorsements/uber.svg'
import meta_svg from '../../public/endorsements/meta.svg'
import hashicorp_svg from '../../public/endorsements/hashicorp.svg'

const homeBlocks = [
  {
    key: 'hero',
    maxWidth: 'md' as const,
    center: true,
    py: { xs: 10, md: 20 },
    items: [
      {
        overline: {
          title: 'Gravis OS - operating system for modern enterprises',
          titleProps: { color: 'text.secondary' },
        },
      },
      {
        h1: {
          title: `Build. Develop. Ship`,
          titleProps: {
            gutterBottom: true,
            gradient: {
              to: 'success.light',
              from: 'info.light',
            },
          },
        },
      },
      {
        subtitle1: {
          title:
            'Power next-generation business operations with all the modules you need in one place.',
          titleProps: {
            color: 'text.secondary',
            maxWidth: '60%',
          },
        },
      },
      {
        stack: {
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
      },
    ],
  },
  {
    key: 'endorsements-stack',
    center: true,
    maxWidth: 'md' as const,
    py: 4,
    items: [
      {
        overline: {
          title: 'Trusted by the best frontend teams',
          titleProps: { color: 'text.primary' },
        },
      },
      {
        stack: {
          sx: { mt: { xs: 2, md: 4 } },
          stackProps: {
            width: '100%',
            justifyContent: 'space-evenly',
          },
          stackItemProps: {
            fullWidthOnMobile: false,
          },
          titleProps: {
            sx: {
              display: 'inline-flex',
              verticalAlign: 'middle',
              maxHeight: 30,
              userSelect: 'none',
              pointerEvents: 'none',
              outline: 'none',
              cursor: 'default',
            },
          },
          stackItems: [
            {
              items: [
                {
                  image: {
                    title: auth0_svg,
                  },
                },
              ],
            },
            {
              items: [
                {
                  image: {
                    title: tripadvisor_svg,
                  },
                },
              ],
            },
            {
              items: [
                {
                  image: {
                    title: uber_svg,
                    titleProps: {
                      sx: {
                        maxHeight: 25,
                      },
                    },
                  },
                },
              ],
            },
            {
              items: [
                {
                  type: BlockItemTypeEnum.IMAGE,
                  title: hashicorp_svg,
                },
              ],
            },
          ],
        },
      },
    ],
  },
  {
    key: 'features',
    center: true,
    items: [
      {
        overline: {
          title: 'Gravis - operating system for modern enterprises',
          titleProps: { color: 'text.primary' },
        },
      },
      {
        type: BlockItemTypeEnum.GRID,
        sx: { mt: { xs: 5, md: 10 } },
        gridProps: { spacing: { xs: 5 } },
        gridItems: [
          {
            md: 3,
            sx: { textAlign: { xs: 'center' } },
            items: [
              {
                type: BlockItemTypeEnum.ICON,
                title: AddCircleOutlineOutlinedIcon,
                titleProps: { sx: { fontSize: 'h4.fontSize' } },
              },
              {
                type: BlockItemTypeEnum.H6,
                title: 'Application Development',
                titleProps: { gutterBottom: true },
              },
            ],
          },
          {
            md: 3,
            sx: { textAlign: { xs: 'center' } },
            items: [
              {
                type: BlockItemTypeEnum.ICON,
                title: AddCircleOutlineOutlinedIcon,
                titleProps: { sx: { fontSize: 'h4.fontSize' } },
              },
              {
                type: BlockItemTypeEnum.H6,
                title: 'Application Development',
                titleProps: { gutterBottom: true },
              },
            ],
          },
          {
            md: 3,
            sx: { textAlign: { xs: 'center' } },
            items: [
              {
                type: BlockItemTypeEnum.ICON,
                title: AddCircleOutlineOutlinedIcon,
                titleProps: { sx: { fontSize: 'h4.fontSize' } },
              },
              {
                type: BlockItemTypeEnum.H6,
                title: 'Application Development',
                titleProps: { gutterBottom: true },
              },
            ],
          },
          {
            md: 3,
            sx: { textAlign: { xs: 'center' } },
            items: [
              {
                type: BlockItemTypeEnum.ICON,
                title: AddCircleOutlineOutlinedIcon,
                titleProps: { sx: { fontSize: 'h4.fontSize' } },
              },
              {
                type: BlockItemTypeEnum.H6,
                title: 'Application Development',
                titleProps: { gutterBottom: true },
              },
            ],
          },
          {
            md: 3,
            sx: { textAlign: { xs: 'center' } },
            items: [
              {
                type: BlockItemTypeEnum.ICON,
                title: AddCircleOutlineOutlinedIcon,
                titleProps: { sx: { fontSize: 'h4.fontSize' } },
              },
              {
                type: BlockItemTypeEnum.H6,
                title: 'Application Development',
                titleProps: { gutterBottom: true },
              },
            ],
          },
          {
            md: 3,
            sx: { textAlign: { xs: 'center' } },
            items: [
              {
                type: BlockItemTypeEnum.ICON,
                title: AddCircleOutlineOutlinedIcon,
                titleProps: { sx: { fontSize: 'h4.fontSize' } },
              },
              {
                type: BlockItemTypeEnum.H6,
                title: 'Application Development',
                titleProps: { gutterBottom: true },
              },
            ],
          },
          {
            md: 3,
            sx: { textAlign: { xs: 'center' } },
            items: [
              {
                type: BlockItemTypeEnum.ICON,
                title: AddCircleOutlineOutlinedIcon,
                titleProps: { sx: { fontSize: 'h4.fontSize' } },
              },
              {
                type: BlockItemTypeEnum.H6,
                title: 'Application Development',
                titleProps: { gutterBottom: true },
              },
            ],
          },
          {
            md: 3,
            sx: { textAlign: { xs: 'center' } },
            items: [
              {
                type: BlockItemTypeEnum.ICON,
                title: AddCircleOutlineOutlinedIcon,
                titleProps: { sx: { fontSize: 'h4.fontSize' } },
              },
              {
                type: BlockItemTypeEnum.H6,
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
    spacing: { xs: 5, md: 20 },
    items: [
      {
        type: BlockItemTypeEnum.GRID,
        gridProps: { alignItems: 'center', spacing: { xs: 3, md: 6 } },
        gridItems: [
          {
            md: 5,
            items: [
              {
                type: BlockItemTypeEnum.IMAGE,
                title: 'https://source.unsplash.com/random/600x400',
                titleProps: {
                  alt: 'MOCK_IMAGE',
                  width: 600,
                  height: 400,
                  layout: 'responsive',
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
    items: [
      {
        overline: {
          title: 'Gravis - operating system for modern enterprises',
          titleProps: { color: 'text.primary' },
        },
      },
      {
        h2: {
          title: `Start your dashboard in seconds`,
          titleProps: { gutterBottom: true },
        },
      },
      {
        subtitle1: {
          title:
            'Power next-generation business operations with all the modules you need in one place.',
          titleProps: {
            color: 'text.secondary',
            maxWidth: '60%',
          },
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
                button: {
                  title: 'Request Support',
                  titleProps: {
                    variant: 'outlined',
                    size: 'large',
                    fullWidthOnMobile: true,
                  },
                },
              },
            ],
          },
          {
            items: [
              {
                button: {
                  title: 'Get Started',
                  titleProps: {
                    variant: 'contained',
                    size: 'large',
                    fullWidthOnMobile: true,
                  } as ButtonProps,
                },
              },
            ],
          },
        ],
      },
    ],
  },
] as unknown as BlocksProps['items']

export default homeBlocks
