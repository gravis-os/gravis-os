import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import lightPalette from './lightPalette'
import components from './components'
import breakpoints from './breakpoints'

const lightTheme = responsiveFontSizes(
  createTheme({
    palette: lightPalette,
    components,
    breakpoints,
  })
)

export default lightTheme
