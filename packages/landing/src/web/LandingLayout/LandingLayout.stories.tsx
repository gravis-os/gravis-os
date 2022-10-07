import React from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { MOCK_HEADER_PROPS } from '@gravis-os/ui'
import LandingLayout from './LandingLayout'
import {
  MOCK_BLOCK_ALTERNATE_WING_GRID,
  MOCK_BLOCK_HERO,
  MOCK_BLOCK_ITEM_TYPES,
  MOCK_CARD_ITEMS,
  MOCK_FOOTER_PROPS,
  MOCK_RIGHT_WING_GRID_ITEMS,
} from '../../mocks'
import Blocks from '../Block/Blocks'
import {
  appleLandingTheme,
  gravisLandingTheme,
  publicoLandingTheme,
  vercelLandingTheme,
} from '../../themes'
import { BlockItemTypeEnum } from '../Block'
import PublicoHeadlineLight from '../../../public/fonts/Publico/PublicoHeadline-Light-Web.woff2'
import PublicoTextSemibold from '../../../public/fonts/Publico/PublicoText-Semibold-Web.woff2'
import PublicoTextRoman from '../../../public/fonts/Publico/PublicoText-Roman-Web.woff2'

import InterRegular from '../../../public/fonts/Inter/Inter-Regular.ttf'
import InterBold from '../../../public/fonts/Inter/Inter-Bold.ttf'

export default {
  component: LandingLayout,
  parameters: { layout: 'fullscreen' },
  args: {
    headerProps: MOCK_HEADER_PROPS,
    footerProps: MOCK_FOOTER_PROPS,
    blocks: [MOCK_BLOCK_HERO, MOCK_BLOCK_ALTERNATE_WING_GRID],
  },
}

export const Basic = ({ blocks, ...rest }) => (
  <LandingLayout {...rest}>
    <Blocks items={blocks} />
  </LandingLayout>
)

const useTheme = (theme) => {
  const isDarkMode = useDarkMode()

  const selectedTheme = theme
  const lightTheme = createTheme(selectedTheme.light)
  const darkTheme = createTheme(selectedTheme.dark)

  return {
    theme: isDarkMode ? darkTheme : lightTheme,
    isDarkMode,
    lightTheme,
    darkTheme,
  }
}

export const GravisTheme = (args) => {
  const { theme } = useTheme(gravisLandingTheme)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Basic {...args} />
    </ThemeProvider>
  )
}
GravisTheme.args = {
  headerProps: {
    ...MOCK_HEADER_PROPS,
    transparent: true,
    dark: true,
  },
  blocks: [
    {
      key: 'hero',
      maxWidth: 'md',
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
          title: 'Build powerful ERPs faster than ever with Gravis ',
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
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 'features',
      maxWidth: 'md',
      center: true,
      dark: true,
      items: [
        {
          type: BlockItemTypeEnum.OVERLINE,
          titleProps: { color: 'text.primary' },
          title: 'Features',
        },
        {
          type: BlockItemTypeEnum.H2,
          title: 'A Powerful All-in-One Platform for Retailers & Distributors',
          titleProps: { gutterBottom: true },
        },
        {
          type: BlockItemTypeEnum.SUBTITLE2,
          title:
            'Answer a few short questions and we’ll help you find the right services for your business.',
          titleProps: {
            color: 'text.secondary',
            maxWidth: true,
          },
        },
        {
          type: BlockItemTypeEnum.GRID,
          maxWidth: 'lg',
          sx: { mt: { xs: 5, md: 7.5 } },
          gridProps: { spacing: { xs: 5 } },
          gridItems: [
            {
              sx: { textAlign: { xs: 'center', md: 'left' } },
              items: [
                MOCK_BLOCK_ITEM_TYPES.IMAGE,
                {
                  ...MOCK_BLOCK_ITEM_TYPES.H5,
                  titleProps: { gutterBottom: true },
                },
                MOCK_BLOCK_ITEM_TYPES.BODY1,
              ],
            },
            {
              sx: { textAlign: { xs: 'center', md: 'left' } },
              items: [
                MOCK_BLOCK_ITEM_TYPES.IMAGE,
                {
                  ...MOCK_BLOCK_ITEM_TYPES.H5,
                  titleProps: { gutterBottom: true },
                },
                MOCK_BLOCK_ITEM_TYPES.BODY1,
              ],
            },
            {
              sx: { textAlign: { xs: 'center', md: 'left' } },
              items: [
                MOCK_BLOCK_ITEM_TYPES.IMAGE,
                {
                  ...MOCK_BLOCK_ITEM_TYPES.H5,
                  titleProps: { gutterBottom: true },
                },
                MOCK_BLOCK_ITEM_TYPES.BODY1,
              ],
            },
          ],
        },
      ],
    },
    {
      key: 'explore',
      center: true,
      dark: true,
      maxWidth: 'xl',
      items: MOCK_CARD_ITEMS,
    },
    {
      key: 'features-with-two-columns',
      maxWidth: 'md',
      center: true,
      dark: true,
      items: [
        {
          type: BlockItemTypeEnum.OVERLINE,
          titleProps: { color: 'text.primary' },
          title: 'Features',
        },
        {
          type: BlockItemTypeEnum.H2,
          title: 'A Powerful All-in-One Platform for Retailers & Distributors',
          titleProps: { gutterBottom: true },
        },
        {
          type: BlockItemTypeEnum.SUBTITLE2,
          title:
            'Answer a few short questions and we’ll help you find the right services for your business.',
          titleProps: {
            color: 'text.secondary',
            maxWidth: true,
          },
        },
        {
          type: BlockItemTypeEnum.GRID,
          maxWidth: 'lg',
          sx: { mt: { xs: 5, md: 9 } },
          gridProps: { spacing: { xs: 5, md: 9 } },
          gridItems: [
            {
              type: BlockItemTypeEnum.GRID,
              md: 6,
              sx: { textAlign: { xs: 'center', md: 'left' } },
              gridProps: { spacing: { xs: 3 } },
              gridItems: MOCK_RIGHT_WING_GRID_ITEMS,
            },
            {
              type: BlockItemTypeEnum.GRID,
              md: 6,
              sx: { textAlign: { xs: 'center', md: 'left' } },
              gridProps: { spacing: { xs: 3 } },
              gridItems: MOCK_RIGHT_WING_GRID_ITEMS,
            },
            {
              type: BlockItemTypeEnum.GRID,
              md: 6,
              sx: { textAlign: { xs: 'center', md: 'left' } },
              gridProps: { spacing: { xs: 3 } },
              gridItems: MOCK_RIGHT_WING_GRID_ITEMS,
            },
            {
              type: BlockItemTypeEnum.GRID,
              md: 6,
              sx: { textAlign: { xs: 'center', md: 'left' } },
              gridProps: { spacing: { xs: 3 } },
              gridItems: MOCK_RIGHT_WING_GRID_ITEMS,
            },
            {
              type: BlockItemTypeEnum.GRID,
              md: 6,
              sx: { textAlign: { xs: 'center', md: 'left' } },
              gridProps: { spacing: { xs: 3 } },
              gridItems: MOCK_RIGHT_WING_GRID_ITEMS,
            },
            {
              type: BlockItemTypeEnum.GRID,
              md: 6,
              sx: { textAlign: { xs: 'center', md: 'left' } },
              gridProps: { spacing: { xs: 3 } },
              gridItems: MOCK_RIGHT_WING_GRID_ITEMS,
            },
          ],
        },
      ],
    },
    {
      key: 'features-with-background-image',
      maxWidth: 'md',
      center: true,
      dark: true,
      backgroundImageProps: {
        src: 'https://source.unsplash.com/random/?username=gradienta&orientation=landscape',
        alt: 'MOCK_IMAGE',
      },
      items: [
        {
          type: BlockItemTypeEnum.OVERLINE,
          titleProps: { color: 'text.primary' },
          title: 'Features',
        },
        {
          type: BlockItemTypeEnum.H2,
          title: 'A Powerful All-in-One Platform for Retailers & Distributors',
          titleProps: { gutterBottom: true },
        },
        {
          type: BlockItemTypeEnum.SUBTITLE2,
          title:
            'Answer a few short questions and we’ll help you find the right services for your business.',
          titleProps: {
            color: 'text.secondary',
            maxWidth: true,
          },
        },
      ],
    },
    MOCK_BLOCK_ALTERNATE_WING_GRID,
  ],
}

export const PublicoTheme = (args) => {
  const { theme } = useTheme(publicoLandingTheme)
  return (
    <ThemeProvider
      theme={createTheme(theme, {
        components: {
          // Self-hosted font: https://mui.com/material-ui/customization/typography/#self-hosted-fonts
          MuiCssBaseline: {
            styleOverrides: `
        @font-face {
            font-family: 'Publico Headline';
            src: url(${PublicoHeadlineLight});
            font-weight: 300;
            font-style: normal;
            font-stretch: normal;
            font-display: swap;
        }
        @font-face {
            font-family: 'Publico Headline';
            src: url(${PublicoHeadlineLight});
            font-weight: 400;
            font-style: normal;
            font-stretch: normal;
            font-display: swap;
        }
        @font-face {
            font-family: 'Publico Headline';
            src: url(${PublicoHeadlineLight});
            font-weight: 500;
            font-style: normal;
            font-stretch: normal;
            font-display: swap;
        }
        @font-face {
            font-family: 'Publico Text';
            src: url(${PublicoTextSemibold});
            font-weight: 600;
            font-style: normal;
            font-stretch: normal;
            font-display: swap;
        }
        @font-face {
            font-family: 'Publico Text';
            src: url(${PublicoTextRoman});
            font-weight: 400;
            font-style: normal;
            font-stretch: normal;
            font-display: swap;
        }
      `,
          },
        },
      })}
    >
      <CssBaseline />
      <Basic {...args} />
    </ThemeProvider>
  )
}

export const VercelTheme = (args) => {
  const { theme } = useTheme(vercelLandingTheme)
  return (
    <ThemeProvider
      theme={createTheme(theme, {
        components: {
          // Self-hosted font: https://mui.com/material-ui/customization/typography/#self-hosted-fonts
          MuiCssBaseline: {
            styleOverrides: `
        @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            src: url(${InterRegular});
        }
        
        @font-face {
            font-family: 'Inter';
            font-style: bold;
            font-weight: 700;
            src: url(${InterBold});
        }
      `,
          },
        },
      })}
    >
      <CssBaseline />
      <Basic {...args} />
    </ThemeProvider>
  )
}

export const AppleTheme = (args) => {
  const { theme } = useTheme(appleLandingTheme)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Basic {...args} />
    </ThemeProvider>
  )
}