import { green, grey } from '@mui/material/colors'
import lightPalette from './lightPalette'

const darkPalette = {
  ...lightPalette,
  mode: 'dark' as const,
  primary: {
    main: grey.A100,
    contrastText: grey['900'],
  },
  secondary: {
    main: green.A400,
  },
  background: {
    paper: '#101013',
    default: '#000',
  },
  text: {
    secondary: 'rgba(255,255,255,0.5)',
  },
}

export default darkPalette
