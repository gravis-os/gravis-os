import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import darkPalette from './darkPalette'
import components from './components'
import breakpoints from './breakpoints'

const theme = responsiveFontSizes(
  createTheme({
    palette: darkPalette,
    components,
    breakpoints,
  })
)

export default theme
