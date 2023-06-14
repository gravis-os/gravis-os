import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import typography from './typography'
import lightPalette from './lightPalette'
import components from './components'
import breakpoints from './breakpoints'

const lightTheme = responsiveFontSizes(
  createTheme({
    palette: lightPalette,
    typography,
    components,
    breakpoints,
  })
)

export default lightTheme
