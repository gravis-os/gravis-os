import { createTheme } from '@mui/material/styles'
import { gravisOsLandingTheme } from '@gravis-os/web'
import themeConfig from './themeConfig'

const getWebTheme = (mode: 'light' | 'dark') => {
  return createTheme(gravisOsLandingTheme[mode], themeConfig)
}

export default getWebTheme
