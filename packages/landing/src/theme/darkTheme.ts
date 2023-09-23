import { createTheme, responsiveFontSizes } from '@mui/material/styles'

import breakpoints from './breakpoints'
import components from './components'
import darkPalette from './darkPalette'
import typography from './typography'

const theme = responsiveFontSizes(
  createTheme({
    breakpoints,
    components,
    palette: darkPalette,
    typography,
  })
)

export default theme
