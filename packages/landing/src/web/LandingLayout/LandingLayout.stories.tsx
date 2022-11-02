import { MOCK_HEADER_PROPS } from '@gravis-os/ui'
import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import PublicoHeadlineLight from '../../../public/fonts/Publico/PublicoHeadline-Light-Web.woff2'
import PublicoTextRoman from '../../../public/fonts/Publico/PublicoText-Roman-Web.woff2'
import PublicoTextSemibold from '../../../public/fonts/Publico/PublicoText-Semibold-Web.woff2'
import {
  MOCK_BLOCK_ALTERNATE_WING_GRID,
  MOCK_BLOCK_HERO,
  MOCK_FOOTER_PROPS,
} from '../../mocks'
import {
  appleLandingTheme,
  gravisLandingTheme,
  publicoLandingTheme,
  vercelLandingTheme,
} from '../../themes'
import { BlockItemTypeEnum } from '../Block'
import Blocks from '../Block/Blocks'
import LandingLayout from './LandingLayout'

// Gravis Theme Images
import automate_business_hero from '../../../public/Landing/gravisLanding/automate_business_hero.png'
import feature_1_left_column from '../../../public/Landing/gravisLanding/feature_1_left_column.png'
import feature_1_right_column from '../../../public/Landing/gravisLanding/feature_1_right_column.png'
import feature_2_left_column from '../../../public/Landing/gravisLanding/feature_2_left_column.png'
import feature_2_right_column from '../../../public/Landing/gravisLanding/feature_2_right_column.png'
import feature_3_left_column from '../../../public/Landing/gravisLanding/feature_3_left_column.png'
import feature_3_right_column from '../../../public/Landing/gravisLanding/feature_3_right_column.png'
import home_hero from '../../../public/Landing/gravisLanding/home_hero.png'
import IndustryIconFirst from '../../../public/Landing/gravisLanding/industry_icon_1.svg'
import IndustryIconSecond from '../../../public/Landing/gravisLanding/industry_icon_2.svg'
import IndustryIconThird from '../../../public/Landing/gravisLanding/industry_icon_3.svg'
import industry_thumbnail_1 from '../../../public/Landing/gravisLanding/industry_thumbnail_1.png'
import industry_thumbnail_2 from '../../../public/Landing/gravisLanding/industry_thumbnail_2.png'
import industry_thumbnail_3 from '../../../public/Landing/gravisLanding/industry_thumbnail_3.png'
import integrated_workflows_background from '../../../public/Landing/gravisLanding/integrated_workflows_background.png'
import integrated_workflows_hero from '../../../public/Landing/gravisLanding/integrated_workflows_hero.png'
import PartnerDigitalIndustryIcon from '../../../public/Landing/gravisLanding/partner_digital_industry.svg'
import PartnerEsgIcon from '../../../public/Landing/gravisLanding/partner_esg.svg'
import PartnerImdaIcon from '../../../public/Landing/gravisLanding/partner_imda.svg'
import PartnerMasterCardIcon from '../../../public/Landing/gravisLanding/partner_mastercard.svg'
import PartnerPaypalIcon from '../../../public/Landing/gravisLanding/partner_paypal.svg'
import PartnerVisaIcon from '../../../public/Landing/gravisLanding/partner_visa.svg'

import InterBold from '../../../public/fonts/Inter/Inter-Bold.ttf'
import InterRegular from '../../../public/fonts/Inter/Inter-Regular.ttf'
import getStorybookTitle from '../../utils/getStorybookTitle'

export default {
  title: getStorybookTitle(LandingLayout.name),
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

const GRAVIS_DEFAULT_BACKGROUND_DARK_MODE = '#1A1D25'
const BANNER_HEIGHT_XS = 680
const BANNER_HEIGHT_SM = 556
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
      pb: 10,
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
                  title: 'Get Started',
                  titleProps: {
                    variant: 'outlined',
                    size: 'large',
                    color: 'secondary',
                    fullWidthOnMobile: true,
                  },
                },
              ],
            },
            {
              items: [
                {
                  type: BlockItemTypeEnum.BUTTON,
                  title: 'Schedule a demo',
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

        {
          maxWidth: 'lg',
          type: BlockItemTypeEnum.IMAGE,
          title: home_hero,
          titleProps: {
            sx: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& > span': { maxHeight: 691 },
              '& > span > span': { maxHeight: 'inherit' },
              '& > span > img': { objectFit: 'contain' },
            },
          },
          boxProps: {
            mt: 6,
          },
        },

        {
          type: BlockItemTypeEnum.GRID,
          maxWidth: 'lg',
          sx: { mt: { md: -13 } },
          gridProps: { alignItems: 'center' },
          gridItems: [
            { src: PartnerImdaIcon, maxHeight: 31 },
            { src: PartnerDigitalIndustryIcon, maxHeight: 36 },
            { src: PartnerEsgIcon, maxHeight: 31 },
            { src: PartnerVisaIcon, maxHeight: 22 },
            { src: PartnerMasterCardIcon, maxHeight: 36.72 },
            { src: PartnerPaypalIcon, maxHeight: 35 },
          ].map(({ src, maxHeight }) => ({
            xs: 6,
            md: 4,
            lg: 2,
            sx: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
            items: [
              {
                type: BlockItemTypeEnum.SVG,
                title: src,
                titleProps: {
                  sx: {
                    display: 'flex',
                    alignItems: 'center',
                    '& > svg': { height: maxHeight },
                  },
                },
              },
            ],
          })),
        },
      ],
    },
    {
      key: 'features-with-two-columns',
      maxWidth: 'md',
      center: true,
      dark: true,
      sx: { backgroundColor: GRAVIS_DEFAULT_BACKGROUND_DARK_MODE },
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
              title: 'Omnichannel Retail Management',
              body: 'Sync orders from multiple sales channels with inventory and accounting to boost business efficiency.',
              src: feature_1_left_column,
            },
            {
              title: 'E-Commerce & Payments',
              body: 'Sync orders from multiple sales channels with inventory and accounting to boost business efficiency.',
              src: feature_1_right_column,
            },
            {
              title: 'Product & Inventory Management',
              body: 'Sync orders from multiple sales channels with inventory and accounting to boost business efficiency.',
              src: feature_2_left_column,
            },
            {
              title: 'Customer Relationship Management',
              body: 'Sync orders from multiple sales channels with inventory and accounting to boost business efficiency.',
              src: feature_2_right_column,
            },
            {
              title: 'Quotation & B2B Sales Management',
              body: 'Sync orders from multiple sales channels with inventory and accounting to boost business efficiency.',
              src: feature_3_left_column,
            },
            {
              title: 'Reporting & Business Analytics',
              body: 'Sync orders from multiple sales channels with inventory and accounting to boost business efficiency.',
              src: feature_3_right_column,
            },
          ].map(({ src, title, body }) => ({
            key: body,
            type: BlockItemTypeEnum.GRID,
            md: 6,
            sx: { textAlign: { xs: 'center', md: 'left' } },
            gridProps: { spacing: { xs: 3 } },
            gridItems: [
              {
                sm: 4,
                items: [
                  {
                    type: BlockItemTypeEnum.IMAGE,
                    title: src,
                    titleProps: { gutterBottom: true },
                  },
                ],
              },
              {
                sm: 8,
                items: [
                  {
                    type: BlockItemTypeEnum.H5,
                    title,
                    titleProps: { gutterBottom: true },
                  },
                  {
                    type: BlockItemTypeEnum.BODY1,
                    title: body,
                    titleProps: { color: 'text.secondary' },
                  },
                ],
              },
            ],
          })),
        },
      ],
    },
    {
      key: 'integrated-workflows',
      maxWidth: 'lg',
      items: [
        {
          type: BlockItemTypeEnum.GRID,
          gridProps: {
            spacing: 0,
            sx: {
              borderRadius: 4,
              backgroundImage: `url("${integrated_workflows_background?.src}")`,
              backgroundSize: 'cover',
            },
          },
          gridItems: [
            {
              maxWidth: 'md',
              gridProps: { spacing: 0 },
              gridItems: [
                {
                  xs: 0,
                  sm: 6,
                  md: 5,
                  sx: {
                    pt: { md: 4.75 },
                    display: { xs: 'none', sm: 'flex' },
                    alignItems: 'flex-end',
                  },
                  items: [
                    {
                      type: BlockItemTypeEnum.IMAGE,
                      title: integrated_workflows_hero,
                      titleProps: {
                        sx: {
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '& > span': { maxHeight: 365 },
                          '& > span > span': { maxHeight: 'inherit' },
                          '& > span > img': { objectFit: 'cover' },
                        },
                      },
                    },
                  ],
                },
                {
                  xs: 12,
                  sm: 6,
                  md: 7,
                  sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    textAlign: 'left',
                    py: { xs: 3, sm: 4, md: 0 },
                    px: { xs: 4, sm: 0 },
                  },
                  items: [
                    {
                      type: BlockItemTypeEnum.OVERLINE,
                      title: 'Integrated Workflows',
                    },
                    {
                      type: BlockItemTypeEnum.H3,
                      title: 'Build your custom ERP platform today',
                      titleProps: { gutterBottom: true, color: 'common.white' },
                    },
                    {
                      type: BlockItemTypeEnum.BODY1,
                      title:
                        'No hefty development fees and long lead times. Get your system up and running in a matter of  weeks.',
                      titleProps: { color: 'text.secondary' },
                    },
                    {
                      type: BlockItemTypeEnum.BUTTON,
                      title: 'Schedule a demo',
                      titleProps: {
                        variant: 'contained',
                        color: 'secondary',
                        size: 'large',
                        sx: { mt: 2 },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 'industries',
      maxWidth: 'md',
      pt: 0,
      center: true,
      items: [
        {
          type: BlockItemTypeEnum.OVERLINE,
          titleProps: { color: 'text.primary' },
          title: 'Industries',
        },
        {
          type: BlockItemTypeEnum.H2,
          title:
            'The all-in-one platform builder for Products, Sales, Finance and more',
          titleProps: { gutterBottom: true },
        },
        {
          type: BlockItemTypeEnum.SUBTITLE2,
          title: 'We handle the admin while you focus on growth.',
          titleProps: {
            color: 'text.secondary',
            maxWidth: true,
          },
        },
        {
          maxWidth: 'lg',
          sx: { mt: 8 },
          gridProps: { spacing: 3 },
          type: BlockItemTypeEnum.GRID,
          gridItems: [
            {
              title: 'Simplify scheduling',
              subtitle:
                'Manage your availability from the app, let customers book online, and send reminders.',
              button: 'See top features',
              src: industry_thumbnail_1,
              imageBoxProps: { mb: -0.875 },
            },
            {
              title: 'Manage Workflows',
              subtitle:
                'Manage your availability from the app, let customers book online, and send reminders.',
              button: 'See top features',
              src: industry_thumbnail_2,
              imageBoxProps: { mr: -8, mb: -0.875 },
            },
            {
              title: 'Simplify scheduling',
              subtitle:
                'Manage your availability from the app, let customers book online, and send reminders.',
              button: 'See top features',
              src: industry_thumbnail_3,
              imageBoxProps: { ml: -8 },
            },
            {
              title: 'Simplify scheduling',
              subtitle:
                'Manage your availability from the app, let customers book online, and send reminders.',
              button: 'See top features',
              src: industry_thumbnail_1,
              imageBoxProps: { mb: -0.875 },
            },
          ].map(({ src, title, subtitle, button, imageBoxProps }) => ({
            md: 6,
            boxProps: {
              height: { xs: 500, sm: 600 },
              textAlign: 'center',
              border: '1px solid #EBEBEE',
              borderRadius: 4,
              pt: { xs: 3, sm: 6 },
              px: { xs: 3, sm: 6 },
              pb: -2,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            },
            items: [
              {
                type: BlockItemTypeEnum.H3,
                title,
                titleProps: { gutterBottom: true },
              },
              {
                type: BlockItemTypeEnum.BODY1,
                title: subtitle,
              },
              {
                type: BlockItemTypeEnum.BUTTON,
                title: button,
                titleProps: { color: 'secondary', sx: { mt: 2.5 } },
              },
              {
                type: BlockItemTypeEnum.IMAGE,
                title: src,
                boxProps: {
                  ...imageBoxProps,
                  flex: 1,
                  display: 'flex',
                  alignItems: 'flex-end',
                },
                titleProps: {
                  textAlign: { xs: 'center', md: 'left' },
                  sx: {
                    '& > span > img': { objectFit: 'contain' },
                  },
                },
              },
            ],
          })),
        },
      ],
    },
    {
      key: 'integrated-workflows-alt',
      maxWidth: 'lg',
      center: true,
      items: [
        {
          type: BlockItemTypeEnum.GRID,
          gridProps: {
            spacing: 0,
            sx: {
              borderRadius: 4,
              backgroundImage: `url("${integrated_workflows_background?.src}")`,
              backgroundSize: 'cover',
            },
          },
          gridItems: [
            {
              maxWidth: 'md',
              gridProps: { spacing: 0 },
              gridItems: [
                {
                  xs: 0,
                  sm: 6,
                  md: 5,
                  sx: {
                    pt: { md: 4.75 },
                    display: { xs: 'none', sm: 'flex' },
                    alignItems: 'flex-end',
                  },
                  items: [
                    {
                      type: BlockItemTypeEnum.IMAGE,
                      title: integrated_workflows_hero,
                      titleProps: {
                        sx: {
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '& > span': { maxHeight: 365 },
                          '& > span > span': { maxHeight: 'inherit' },
                          '& > span > img': { objectFit: 'cover' },
                        },
                      },
                    },
                  ],
                },
                {
                  xs: 12,
                  sm: 6,
                  md: 7,
                  sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    textAlign: 'left',
                    py: { xs: 3, sm: 4, md: 0 },
                    px: { xs: 4, sm: 0 },
                  },
                  items: [
                    {
                      type: BlockItemTypeEnum.OVERLINE,
                      title: 'Integrated Workflows',
                    },
                    {
                      type: BlockItemTypeEnum.H3,
                      title: 'Build your custom ERP platform today',
                      titleProps: { gutterBottom: true, color: 'common.white' },
                    },
                    {
                      type: BlockItemTypeEnum.BODY1,
                      title:
                        'No hefty development fees and long lead times. Get your system up and running in a matter of  weeks.',
                      titleProps: { color: 'text.secondary' },
                    },
                    {
                      type: BlockItemTypeEnum.BUTTON,
                      title: 'Schedule a demo',
                      titleProps: {
                        variant: 'contained',
                        color: 'secondary',
                        size: 'large',
                        sx: { mt: 2 },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 'industries-alt',
      maxWidth: 'md',
      pt: 0,
      center: true,
      items: [
        {
          type: BlockItemTypeEnum.OVERLINE,
          titleProps: { color: 'text.primary' },
          title: 'Industries',
        },
        {
          type: BlockItemTypeEnum.H2,
          title: 'Building incredible platforms doesn’t need to be hard',
          titleProps: { gutterBottom: true },
        },
        {
          type: BlockItemTypeEnum.SUBTITLE2,
          title:
            'Our vision is to help enterprises meet the need for platforms across their business. Here’s what you get with Gravis:',
          titleProps: {
            color: 'text.secondary',
            maxWidth: true,
          },
        },
        {
          maxWidth: 'lg',
          sx: { mt: 8 },
          gridProps: { spacing: { xs: 10, md: 3 } },
          type: BlockItemTypeEnum.GRID,
          gridItems: [
            {
              icon: IndustryIconFirst,
              title: 'Continuous Delivery',
              subtitle:
                'Ship faster and more often with mobile CI/CD products that make building and shipping mobile apps a breeze.',
            },
            {
              icon: IndustryIconSecond,
              title: 'Better apps, faster',
              subtitle:
                'Slash your development time and costs with a platform that lets you write once and deploy anywhere—iOS, Android, and Web.',
            },
            {
              icon: IndustryIconThird,
              title: 'Continuous Delivery',
              subtitle:
                'Ship faster and more often with mobile CI/CD products that make building and shipping mobile apps a breeze.',
            },
          ].map(({ icon, title, subtitle }) => ({
            md: 4,
            boxProps: {
              textAlign: { xs: 'center', md: 'left' },
            },
            items: [
              {
                type: BlockItemTypeEnum.SVG,
                title: icon,
                titleProps: {
                  textAlign: { xs: 'center', md: 'left' },
                  height: 64,
                  sx: {
                    '& > svg': { objectFit: 'contain' },
                  },
                },
              },
              {
                type: BlockItemTypeEnum.H4,
                title,
                titleProps: { gutterBottom: true, sx: { mt: 4 } },
              },
              {
                type: BlockItemTypeEnum.BODY1,
                title: subtitle,
                titleProps: { color: 'text.secondary' },
              },
            ],
          })),
        },
      ],
    },
    {
      key: 'automate-business',
      dark: true,
      center: true,
      pt: 10,
      pb: 0,
      sx: { backgroundColor: 'none' },
      maxWidth: false,
      containerProps: {
        disableGutters: true,
      },
      items: [
        {
          type: BlockItemTypeEnum.GRID,
          gridProps: { spacing: 0 },
          gridItems: [
            {
              md: 7,
              lg: 8,
              xl: 7,
              sx: {
                height: { xs: BANNER_HEIGHT_XS, sm: BANNER_HEIGHT_SM },
                backgroundColor: GRAVIS_DEFAULT_BACKGROUND_DARK_MODE,
                '& > .MuiBox-root': { height: '100%' },
                '& > .MuiBox-root > .MuiContainer-root': { maxWidth: 680 },
              },
              items: [],
            },
            {
              md: 5,
              lg: 4,
              xl: 5,
              sx: {
                height: { xs: BANNER_HEIGHT_XS, sm: BANNER_HEIGHT_SM },
                background: 'linear-gradient(#9FCCF7, #3E9AEF)',
                display: {
                  xs: 'none',
                  md: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              },
              items: [
                {
                  type: BlockItemTypeEnum.IMAGE,
                  title: automate_business_hero,
                  titleProps: {
                    sx: {
                      '& > span': { maxHeight: 172 },
                      '& > span > img': { objectFit: 'contain' },
                    },
                  },
                },
              ],
            },
            {
              xs: 12,
              sx: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: { xs: BANNER_HEIGHT_XS, sm: BANNER_HEIGHT_SM },
              },
              containerProps: {
                maxWidth: 'lg',
                sx: { height: '100%' },
              },
              gridProps: {
                spacing: 0,
                sx: { height: '100%' },
              },
              gridItems: [
                {
                  md: 7,
                  lg: 8,
                  xl: 7,
                  sx: {
                    textAlign: { xs: 'center', md: 'left' },
                    display: 'flex',
                    alignItems: 'center',
                    px: { xs: 5, lg: 0 },
                    py: { xs: 5, sm: 0 },
                  },
                  items: [
                    {
                      type: BlockItemTypeEnum.OVERLINE,
                      title: 'Retail Beyond Borders',
                      titleProps: { gutterBottom: true },
                    },
                    {
                      type: BlockItemTypeEnum.H2,
                      title: 'Automate business processes across the world',
                      titleProps: { gutterBottom: true },
                    },
                    {
                      type: BlockItemTypeEnum.SUBTITLE2,
                      title:
                        'Multi-currency and country preferences developed for regional expansion. Go regional from Day 1.',
                    },
                    {
                      type: BlockItemTypeEnum.BUTTON,
                      title: 'Schedule a demo',
                      titleProps: {
                        variant: 'contained',
                        color: 'secondary',
                        size: 'large',
                        sx: { mt: 6 },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
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
