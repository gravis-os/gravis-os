import { createTheme } from '@mui/material/styles'
import { landingTheme } from '@gravis-os/web'
import themeConfig from './themeConfig'

const getWebTheme = (mode: 'light' | 'dark') => {
  return createTheme(landingTheme[mode], themeConfig)
}

export default getWebTheme
