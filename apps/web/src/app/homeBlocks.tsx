import { BlockItemTypeEnum, BlocksProps } from '@gravis-os/web'
import { ButtonProps } from '@gravis-os/ui'
import { Theme } from '@mui/material'
import auth0_svg from '../../public/endorsements/auth0.svg'
import tripadvisor_svg from '../../public/endorsements/tripadvisor-horizontal.svg'
import uber_svg from '../../public/endorsements/uber.svg'
import washingtonpost_svg from '../../public/endorsements/washingtonpost.svg'
import meta_svg from '../../public/endorsements/meta.svg'

const homeBlocks = [
  {
    key: 'hero',
    maxWidth: 'md' as const,
    center: true,
    pt: { xs: 10, md: 20 },
    pb: { xs: 8, md: 15 },
    items: [
      {
        overline: {
          title: 'Gravis OS - operating system for modern enterprises',
          titleProps: { gutterBottom: true, color: 'text.primary' },
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
            maxWidth: { xs: '90%', md: '70%' },
          },
        },
      },
      {
        stack: {
          sx: { mt: 5 },
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
                  title: 'Read Docs',
                  titleProps: {
                    variant: 'outlined',
                    size: 'large',
                    fullWidthOnMobile: true,
                    href: 'https://docs.gravis-os.com/docs/getting-started/introduction',
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
                    href: 'https://docs.gravis-os.com/docs/getting-started/installation',
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
    maxWidth: 'lg' as const,
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
          sx: { mt: { xs: 3, md: 4 } },
          stackProps: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            reverseDirectionOnMobile: true,
            spacing: 3,
          },
          stackItemProps: {
            fullWidthOnMobile: true,
          },
          titleProps: {
            sx: {
              display: 'flex',
              alignItems: 'center',
              userSelect: 'none',
              pointerEvents: 'none',
              outline: 'none',
              cursor: 'default',
              '& svg': {
                width: '100%',
                maxHeight: 30,
              },
              fill: ({ palette }: Theme) => palette.text.primary,
            },
          },
          stackItems: [
            {
              items: [
                {
                  svg: {
                    title: auth0_svg,
                  },
                },
              ],
            },
            {
              items: [
                {
                  svg: {
                    title: tripadvisor_svg,
                    titleProps: {
                      sx: {
                        '& svg': {
                          width: {
                            xs: 'initial',
                            md: '100%',
                          },
                          margin: { xs: '0 auto', md: '0' },
                        },
                      },
                    },
                  },
                },
              ],
            },
            { items: [{ svg: { title: washingtonpost_svg } }] },
            {
              items: [
                {
                  svg: {
                    title: meta_svg,
                    titleProps: {
                      sx: {
                        '& svg': { maxHeight: 20 },
                      },
                    },
                  },
                },
              ],
            },
            {
              items: [
                {
                  svg: {
                    title: uber_svg,
                    titleProps: {
                      sx: {
                        '& svg': { maxHeight: 24 },
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
      },
    ],
  },
  {
    key: 'benefits',
    pt: 15,
    spacing: { xs: 10, md: 30 },
    maxWidth: 'lg',
    items: [
      {
        type: BlockItemTypeEnum.GRID,
        gridProps: {
          alignItems: 'center',
          reverse: { xs: true, md: false },
          spacing: { xs: 3, md: 6 },
        },
        gridItems: [
          {
            md: 5,
            items: [
              { type: BlockItemTypeEnum.OVERLINE, title: 'What we do' },
              {
                type: BlockItemTypeEnum.H3,
                title: 'Application Development',
                titleProps: { gutterBottom: true },
              },
              {
                type: BlockItemTypeEnum.BODY1,
                title:
                  'We build modern system architectures and scalable applications that radically transform business performance.',
                titleProps: {
                  color: 'text.secondary',
                },
              },
            ],
          },
          {
            md: 7,
            items: [
              {
                type: BlockItemTypeEnum.IMAGE,
                title: 'https://source.unsplash.com/random/700x400',
                titleProps: {
                  alt: 'MOCK_IMAGE',
                  width: 700,
                  height: 400,
                  layout: 'responsive',
                  imageSx: { borderRadius: 3 },
                },
              },
            ],
          },
        ],
      },
      {
        type: BlockItemTypeEnum.GRID,
        gridProps: {
          alignItems: 'center',
          spacing: { xs: 3, md: 6 },
        },
        gridItems: [
          {
            md: 7,
            items: [
              {
                type: BlockItemTypeEnum.IMAGE,
                title: 'https://source.unsplash.com/random/700x400',
                titleProps: {
                  alt: 'MOCK_IMAGE',
                  width: 700,
                  height: 400,
                  layout: 'responsive',
                  imageSx: { borderRadius: 3 },
                },
              },
            ],
          },
          {
            md: 5,
            items: [
              { type: BlockItemTypeEnum.OVERLINE, title: 'What we do' },
              {
                type: BlockItemTypeEnum.H3,
                title: 'Application Development',
                titleProps: { gutterBottom: true },
              },
              {
                type: BlockItemTypeEnum.BODY1,
                title:
                  'We build modern system architectures and scalable applications that radically transform business performance.',
                titleProps: {
                  color: 'text.secondary',
                },
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
          spacing: { xs: 3, md: 6 },
        },
        gridItems: [
          {
            md: 5,
            items: [
              { type: BlockItemTypeEnum.OVERLINE, title: 'What we do' },
              {
                type: BlockItemTypeEnum.H3,
                title: 'Application Development',
                titleProps: { gutterBottom: true },
              },
              {
                type: BlockItemTypeEnum.BODY1,
                title:
                  'We build modern system architectures and scalable applications that radically transform business performance.',
                titleProps: {
                  color: 'text.secondary',
                },
              },
            ],
          },
          {
            md: 7,
            items: [
              {
                type: BlockItemTypeEnum.IMAGE,
                title: 'https://source.unsplash.com/random/700x400',
                titleProps: {
                  alt: 'MOCK_IMAGE',
                  width: 700,
                  height: 400,
                  layout: 'responsive',
                  imageSx: { borderRadius: 3 },
                },
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
    pt: { xs: 5, md: 10 },
    pb: { xs: 10, md: 20 },
    items: [
      {
        overline: {
          title: 'Gravis OS - operating system for modern enterprises',
          titleProps: { color: 'text.secondary' },
        },
      },
      {
        h2: {
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
            maxWidth: { xs: '90%', md: '70%' },
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
                  title: 'Read Docs',
                  titleProps: {
                    variant: 'outlined',
                    size: 'large',
                    fullWidthOnMobile: true,
                    href: 'https://docs.gravis-os.com/docs/getting-started/introduction',
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
                    href: 'https://docs.gravis-os.com/docs/getting-started/installation',
                  } as ButtonProps,
                },
              ],
            },
          ],
        },
      },
    ],
  },
] as unknown as BlocksProps['items']

export default homeBlocks
