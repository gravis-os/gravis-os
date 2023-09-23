import React from 'react'

import { MOCK_HEADER_PROPS } from '@gravis-os/ui'
import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useDarkMode } from 'storybook-dark-mode'

import InterBold from '../../../public/fonts/Inter/Inter-Bold.ttf'
import InterRegular from '../../../public/fonts/Inter/Inter-Regular.ttf'
import PublicoHeadlineLight from '../../../public/fonts/Publico/PublicoHeadline-Light-Web.woff2'
import PublicoTextRoman from '../../../public/fonts/Publico/PublicoText-Roman-Web.woff2'
import PublicoTextSemibold from '../../../public/fonts/Publico/PublicoText-Semibold-Web.woff2'
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
import getStorybookTitle from '../../utils/getStorybookTitle'
import { BlockItemTypeEnum } from '../Block'
import Blocks from '../Block/Blocks'
import LandingLayout from './LandingLayout'

export default {
  title: getStorybookTitle(LandingLayout.name),
  args: {
    blocks: [MOCK_BLOCK_HERO, MOCK_BLOCK_ALTERNATE_WING_GRID],
    footerProps: MOCK_FOOTER_PROPS,
    headerProps: MOCK_HEADER_PROPS,
  },
  component: LandingLayout,
  parameters: { layout: 'fullscreen' },
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
    darkTheme,
    isDarkMode,
    lightTheme,
    theme: isDarkMode ? darkTheme : lightTheme,
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
  blocks: [
    {
      center: true,
      items: [
        {
          title: 'Gravis - operating system for modern enterprises',
          titleProps: { color: 'text.primary' },
          type: BlockItemTypeEnum.OVERLINE,
        },
        {
          title: 'Build powerful ERPs faster than ever with Gravis ',
          titleProps: { gutterBottom: true },
          type: BlockItemTypeEnum.H1,
        },
        {
          title:
            'Power next-generation business operations with all the modules you need in one place.',
          titleProps: {
            color: 'text.secondary',
            maxWidth: '60%',
          },
          type: BlockItemTypeEnum.SUBTITLE1,
        },

        {
          stackItems: [
            {
              items: [
                {
                  title: 'Get Started',
                  titleProps: {
                    color: 'secondary',
                    fullWidthOnMobile: true,
                    size: 'large',
                    variant: 'outlined',
                  },
                  type: BlockItemTypeEnum.BUTTON,
                },
              ],
            },
            {
              items: [
                {
                  title: 'Schedule a demo',
                  titleProps: {
                    fullWidthOnMobile: true,
                    size: 'large',
                    variant: 'contained',
                  },
                  type: BlockItemTypeEnum.BUTTON,
                },
              ],
            },
          ],
          stackProps: {
            center: true,
            direction: 'row',
            reverseDirectionOnMobile: true,
          },
          sx: { mt: 3 },
          type: BlockItemTypeEnum.STACK,
        },

        {
          title: home_hero,
          boxProps: {
            mt: 6,
          },
          maxWidth: 'lg',
          titleProps: {
            sx: {
              '& > span': { maxHeight: 691 },
              '& > span > img': { objectFit: 'contain' },
              '& > span > span': { maxHeight: 'inherit' },
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
            },
          },
          type: BlockItemTypeEnum.IMAGE,
        },

        {
          gridItems: [
            { maxHeight: 31, src: PartnerImdaIcon },
            { maxHeight: 36, src: PartnerDigitalIndustryIcon },
            { maxHeight: 31, src: PartnerEsgIcon },
            { maxHeight: 22, src: PartnerVisaIcon },
            { maxHeight: 36.72, src: PartnerMasterCardIcon },
            { maxHeight: 35, src: PartnerPaypalIcon },
          ].map(({ maxHeight, src }) => ({
            xs: 6,
            md: 4,
            lg: 2,
            items: [
              {
                title: src,
                titleProps: {
                  sx: {
                    '& > svg': { height: maxHeight },
                    alignItems: 'center',
                    display: 'flex',
                  },
                },
                type: BlockItemTypeEnum.SVG,
              },
            ],
            sx: {
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
            },
          })),
          gridProps: { alignItems: 'center' },
          maxWidth: 'lg',
          sx: { mt: { md: -13 } },
          type: BlockItemTypeEnum.GRID,
        },
      ],
      key: 'hero',
      maxWidth: 'md',
      pb: 10,
    },
    {
      center: true,
      dark: true,
      items: [
        {
          title: 'Features',
          titleProps: { color: 'text.primary' },
          type: BlockItemTypeEnum.OVERLINE,
        },
        {
          title: 'A Powerful All-in-One Platform for Retailers & Distributors',
          titleProps: { gutterBottom: true },
          type: BlockItemTypeEnum.H2,
        },
        {
          title:
            'Answer a few short questions and we’ll help you find the right services for your business.',
          titleProps: {
            color: 'text.secondary',
            maxWidth: true,
          },
          type: BlockItemTypeEnum.SUBTITLE2,
        },
        {
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
          ].map(({ title, body, src }) => ({
            md: 6,
            gridItems: [
              {
                sm: 4,
                items: [
                  {
                    title: src,
                    titleProps: { gutterBottom: true },
                    type: BlockItemTypeEnum.IMAGE,
                  },
                ],
              },
              {
                sm: 8,
                items: [
                  {
                    title,
                    titleProps: { gutterBottom: true },
                    type: BlockItemTypeEnum.H5,
                  },
                  {
                    title: body,
                    titleProps: { color: 'text.secondary' },
                    type: BlockItemTypeEnum.BODY1,
                  },
                ],
              },
            ],
            gridProps: { spacing: { xs: 3 } },
            key: body,
            sx: { textAlign: { xs: 'center', md: 'left' } },
            type: BlockItemTypeEnum.GRID,
          })),
          gridProps: { spacing: { xs: 5, md: 9 } },
          maxWidth: 'lg',
          sx: { mt: { xs: 5, md: 9 } },
          type: BlockItemTypeEnum.GRID,
        },
      ],
      key: 'features-with-two-columns',
      maxWidth: 'md',
      sx: { backgroundColor: GRAVIS_DEFAULT_BACKGROUND_DARK_MODE },
    },
    {
      items: [
        {
          gridItems: [
            {
              gridItems: [
                {
                  xs: 0,
                  sm: 6,
                  md: 5,
                  items: [
                    {
                      title: integrated_workflows_hero,
                      titleProps: {
                        sx: {
                          '& > span': { maxHeight: 365 },
                          '& > span > img': { objectFit: 'cover' },
                          '& > span > span': { maxHeight: 'inherit' },
                          alignItems: 'center',
                          display: 'flex',
                          justifyContent: 'center',
                        },
                      },
                      type: BlockItemTypeEnum.IMAGE,
                    },
                  ],
                  sx: {
                    alignItems: 'flex-end',
                    display: { xs: 'none', sm: 'flex' },
                    pt: { md: 4.75 },
                  },
                },
                {
                  xs: 12,
                  sm: 6,
                  md: 7,
                  items: [
                    {
                      title: 'Integrated Workflows',
                      type: BlockItemTypeEnum.OVERLINE,
                    },
                    {
                      title: 'Build your custom ERP platform today',
                      titleProps: { color: 'common.white', gutterBottom: true },
                      type: BlockItemTypeEnum.H3,
                    },
                    {
                      title:
                        'No hefty development fees and long lead times. Get your system up and running in a matter of  weeks.',
                      titleProps: { color: 'text.secondary' },
                      type: BlockItemTypeEnum.BODY1,
                    },
                    {
                      title: 'Schedule a demo',
                      titleProps: {
                        color: 'secondary',
                        size: 'large',
                        sx: { mt: 2 },
                        variant: 'contained',
                      },
                      type: BlockItemTypeEnum.BUTTON,
                    },
                  ],
                  sx: {
                    alignItems: 'flex-start',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    px: { xs: 4, sm: 0 },
                    py: { xs: 3, sm: 4, md: 0 },
                    textAlign: 'left',
                  },
                },
              ],
              gridProps: { spacing: 0 },
              maxWidth: 'md',
            },
          ],
          gridProps: {
            spacing: 0,
            sx: {
              backgroundImage: `url("${integrated_workflows_background?.src}")`,
              backgroundSize: 'cover',
              borderRadius: 4,
            },
          },
          type: BlockItemTypeEnum.GRID,
        },
      ],
      key: 'integrated-workflows',
      maxWidth: 'lg',
    },
    {
      center: true,
      items: [
        {
          title: 'Industries',
          titleProps: { color: 'text.primary' },
          type: BlockItemTypeEnum.OVERLINE,
        },
        {
          title:
            'The all-in-one platform builder for Products, Sales, Finance and more',
          titleProps: { gutterBottom: true },
          type: BlockItemTypeEnum.H2,
        },
        {
          title: 'We handle the admin while you focus on growth.',
          titleProps: {
            color: 'text.secondary',
            maxWidth: true,
          },
          type: BlockItemTypeEnum.SUBTITLE2,
        },
        {
          gridItems: [
            {
              title: 'Simplify scheduling',
              button: 'See top features',
              imageBoxProps: { mb: -0.875 },
              src: industry_thumbnail_1,
              subtitle:
                'Manage your availability from the app, let customers book online, and send reminders.',
            },
            {
              title: 'Manage Workflows',
              button: 'See top features',
              imageBoxProps: { mb: -0.875, mr: -8 },
              src: industry_thumbnail_2,
              subtitle:
                'Manage your availability from the app, let customers book online, and send reminders.',
            },
            {
              title: 'Simplify scheduling',
              button: 'See top features',
              imageBoxProps: { ml: -8 },
              src: industry_thumbnail_3,
              subtitle:
                'Manage your availability from the app, let customers book online, and send reminders.',
            },
            {
              title: 'Simplify scheduling',
              button: 'See top features',
              imageBoxProps: { mb: -0.875 },
              src: industry_thumbnail_1,
              subtitle:
                'Manage your availability from the app, let customers book online, and send reminders.',
            },
          ].map(({ title, button, imageBoxProps, src, subtitle }) => ({
            md: 6,
            boxProps: {
              border: '1px solid #EBEBEE',
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'column',
              height: { xs: 500, sm: 600 },
              overflow: 'hidden',
              pb: -2,
              pt: { xs: 3, sm: 6 },
              px: { xs: 3, sm: 6 },
              textAlign: 'center',
            },
            items: [
              {
                title,
                titleProps: { gutterBottom: true },
                type: BlockItemTypeEnum.H3,
              },
              {
                title: subtitle,
                type: BlockItemTypeEnum.BODY1,
              },
              {
                title: button,
                titleProps: { color: 'secondary', sx: { mt: 2.5 } },
                type: BlockItemTypeEnum.BUTTON,
              },
              {
                title: src,
                boxProps: {
                  ...imageBoxProps,
                  alignItems: 'flex-end',
                  display: 'flex',
                  flex: 1,
                },
                titleProps: {
                  sx: {
                    '& > span > img': { objectFit: 'contain' },
                  },
                  textAlign: { xs: 'center', md: 'left' },
                },
                type: BlockItemTypeEnum.IMAGE,
              },
            ],
          })),
          gridProps: { spacing: 3 },
          maxWidth: 'lg',
          sx: { mt: 8 },
          type: BlockItemTypeEnum.GRID,
        },
      ],
      key: 'industries',
      maxWidth: 'md',
      pt: 0,
    },
    {
      center: true,
      items: [
        {
          gridItems: [
            {
              gridItems: [
                {
                  xs: 0,
                  sm: 6,
                  md: 5,
                  items: [
                    {
                      title: integrated_workflows_hero,
                      titleProps: {
                        sx: {
                          '& > span': { maxHeight: 365 },
                          '& > span > img': { objectFit: 'cover' },
                          '& > span > span': { maxHeight: 'inherit' },
                          alignItems: 'center',
                          display: 'flex',
                          justifyContent: 'center',
                        },
                      },
                      type: BlockItemTypeEnum.IMAGE,
                    },
                  ],
                  sx: {
                    alignItems: 'flex-end',
                    display: { xs: 'none', sm: 'flex' },
                    pt: { md: 4.75 },
                  },
                },
                {
                  xs: 12,
                  sm: 6,
                  md: 7,
                  items: [
                    {
                      title: 'Integrated Workflows',
                      type: BlockItemTypeEnum.OVERLINE,
                    },
                    {
                      title: 'Build your custom ERP platform today',
                      titleProps: { color: 'common.white', gutterBottom: true },
                      type: BlockItemTypeEnum.H3,
                    },
                    {
                      title:
                        'No hefty development fees and long lead times. Get your system up and running in a matter of  weeks.',
                      titleProps: { color: 'text.secondary' },
                      type: BlockItemTypeEnum.BODY1,
                    },
                    {
                      title: 'Schedule a demo',
                      titleProps: {
                        color: 'secondary',
                        size: 'large',
                        sx: { mt: 2 },
                        variant: 'contained',
                      },
                      type: BlockItemTypeEnum.BUTTON,
                    },
                  ],
                  sx: {
                    alignItems: 'flex-start',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    px: { xs: 4, sm: 0 },
                    py: { xs: 3, sm: 4, md: 0 },
                    textAlign: 'left',
                  },
                },
              ],
              gridProps: { spacing: 0 },
              maxWidth: 'md',
            },
          ],
          gridProps: {
            spacing: 0,
            sx: {
              backgroundImage: `url("${integrated_workflows_background?.src}")`,
              backgroundSize: 'cover',
              borderRadius: 4,
            },
          },
          type: BlockItemTypeEnum.GRID,
        },
      ],
      key: 'integrated-workflows-alt',
      maxWidth: 'lg',
    },
    {
      center: true,
      items: [
        {
          title: 'Industries',
          titleProps: { color: 'text.primary' },
          type: BlockItemTypeEnum.OVERLINE,
        },
        {
          title: 'Building incredible platforms doesn’t need to be hard',
          titleProps: { gutterBottom: true },
          type: BlockItemTypeEnum.H2,
        },
        {
          title:
            'Our vision is to help enterprises meet the need for platforms across their business. Here’s what you get with Gravis:',
          titleProps: {
            color: 'text.secondary',
            maxWidth: true,
          },
          type: BlockItemTypeEnum.SUBTITLE2,
        },
        {
          gridItems: [
            {
              title: 'Continuous Delivery',
              icon: IndustryIconFirst,
              subtitle:
                'Ship faster and more often with mobile CI/CD products that make building and shipping mobile apps a breeze.',
            },
            {
              title: 'Better apps, faster',
              icon: IndustryIconSecond,
              subtitle:
                'Slash your development time and costs with a platform that lets you write once and deploy anywhere—iOS, Android, and Web.',
            },
            {
              title: 'Continuous Delivery',
              icon: IndustryIconThird,
              subtitle:
                'Ship faster and more often with mobile CI/CD products that make building and shipping mobile apps a breeze.',
            },
          ].map(({ title, icon, subtitle }) => ({
            md: 4,
            boxProps: {
              textAlign: { xs: 'center', md: 'left' },
            },
            items: [
              {
                title: icon,
                titleProps: {
                  height: 64,
                  sx: {
                    '& > svg': { objectFit: 'contain' },
                  },
                  textAlign: { xs: 'center', md: 'left' },
                },
                type: BlockItemTypeEnum.SVG,
              },
              {
                title,
                titleProps: { gutterBottom: true, sx: { mt: 4 } },
                type: BlockItemTypeEnum.H4,
              },
              {
                title: subtitle,
                titleProps: { color: 'text.secondary' },
                type: BlockItemTypeEnum.BODY1,
              },
            ],
          })),
          gridProps: { spacing: { xs: 10, md: 3 } },
          maxWidth: 'lg',
          sx: { mt: 8 },
          type: BlockItemTypeEnum.GRID,
        },
      ],
      key: 'industries-alt',
      maxWidth: 'md',
      pt: 0,
    },
    {
      center: true,
      containerProps: {
        disableGutters: true,
      },
      dark: true,
      items: [
        {
          gridItems: [
            {
              md: 7,
              lg: 8,
              xl: 7,
              items: [],
              sx: {
                '& > .MuiBox-root': { height: '100%' },
                '& > .MuiBox-root > .MuiContainer-root': { maxWidth: 680 },
                backgroundColor: GRAVIS_DEFAULT_BACKGROUND_DARK_MODE,
                height: { xs: BANNER_HEIGHT_XS, sm: BANNER_HEIGHT_SM },
              },
            },
            {
              md: 5,
              lg: 4,
              xl: 5,
              items: [
                {
                  title: automate_business_hero,
                  titleProps: {
                    sx: {
                      '& > span': { maxHeight: 172 },
                      '& > span > img': { objectFit: 'contain' },
                    },
                  },
                  type: BlockItemTypeEnum.IMAGE,
                },
              ],
              sx: {
                background: 'linear-gradient(#9FCCF7, #3E9AEF)',
                display: {
                  xs: 'none',
                  md: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                height: { xs: BANNER_HEIGHT_XS, sm: BANNER_HEIGHT_SM },
              },
            },
            {
              xs: 12,
              containerProps: {
                maxWidth: 'lg',
                sx: { height: '100%' },
              },
              gridItems: [
                {
                  md: 7,
                  lg: 8,
                  xl: 7,
                  items: [
                    {
                      title: 'Retail Beyond Borders',
                      titleProps: { gutterBottom: true },
                      type: BlockItemTypeEnum.OVERLINE,
                    },
                    {
                      title: 'Automate business processes across the world',
                      titleProps: { gutterBottom: true },
                      type: BlockItemTypeEnum.H2,
                    },
                    {
                      title:
                        'Multi-currency and country preferences developed for regional expansion. Go regional from Day 1.',
                      type: BlockItemTypeEnum.SUBTITLE2,
                    },
                    {
                      title: 'Schedule a demo',
                      titleProps: {
                        color: 'secondary',
                        size: 'large',
                        sx: { mt: 6 },
                        variant: 'contained',
                      },
                      type: BlockItemTypeEnum.BUTTON,
                    },
                  ],
                  sx: {
                    alignItems: 'center',
                    display: 'flex',
                    px: { xs: 5, lg: 0 },
                    py: { xs: 5, sm: 0 },
                    textAlign: { xs: 'center', md: 'left' },
                  },
                },
              ],
              gridProps: {
                spacing: 0,
                sx: { height: '100%' },
              },
              sx: {
                height: { xs: BANNER_HEIGHT_XS, sm: BANNER_HEIGHT_SM },
                left: 0,
                position: 'absolute',
                top: 0,
                width: '100%',
              },
            },
          ],
          gridProps: { spacing: 0 },
          type: BlockItemTypeEnum.GRID,
        },
      ],
      key: 'automate-business',
      maxWidth: false,
      pb: 0,
      pt: 10,
      sx: { backgroundColor: 'none' },
    },
  ],
  headerProps: {
    ...MOCK_HEADER_PROPS,
    dark: true,
    transparent: true,
  },
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
