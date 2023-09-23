import { createTheme, responsiveFontSizes } from '@mui/material/styles'

import breakpoints from './breakpoints'
import components from './components'
import lightPalette from './lightPalette'
import typography from './typography'

const lightTheme = responsiveFontSizes(
  createTheme({
    breakpoints,
    components,
    palette: lightPalette,
    typography,
  })
)

export default lightTheme
