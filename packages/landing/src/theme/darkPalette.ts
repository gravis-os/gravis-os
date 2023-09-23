import { green, grey } from '@mui/material/colors'

import lightPalette from './lightPalette'

const darkPalette = {
  ...lightPalette,
  background: {
    default: '#000',
    paper: '#101013',
  },
  mode: 'dark' as const,
  primary: {
    contrastText: grey['900'],
    main: grey.A100,
  },
  secondary: {
    main: green.A400,
  },
  text: {
    secondary: 'rgba(255,255,255,0.5)',
  },
}

export default darkPalette
