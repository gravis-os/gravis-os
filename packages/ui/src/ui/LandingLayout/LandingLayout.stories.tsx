import React from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import LandingLayout from './LandingLayout'
import {
  MOCK_HEADER_PROPS,
  MOCK_FOOTER_PROPS,
  MOCK_BLOCK_HERO,
  MOCK_BLOCK_ALTERNATE_WING_GRID,
} from '../../mocks'
import Blocks from '../Blocks'
import {
  appleLandingTheme,
  gravisLandingTheme,
  publicoLandingTheme,
} from '../../themes'
import { BlockItemTypeEnum } from '../Block/BlockItem'

export default {
  title: 'Components/LandingLayout',
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
  blocks: [
    {
      maxWidth: 'md',
      center: true,
      pb: 5,
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
            gutterBottom: true,
            color: 'text.secondary',
            sx: { maxWidth: { xs: '100%', md: '80%' }, mx: 'auto' },
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
    <ThemeProvider theme={theme}>
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
