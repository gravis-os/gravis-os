import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import typography from './typography'
import darkPalette from './darkPalette'
import components from './components'
import breakpoints from './breakpoints'

const theme = responsiveFontSizes(
  createTheme({
    palette: darkPalette,
    typography,
    components,
    breakpoints,
  })
)

export default theme
