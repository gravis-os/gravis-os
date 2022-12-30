import { darken } from '@mui/material/styles'

const createGradientFromMainColor = (mainColor: string): string => {
  const from = darken(mainColor, 0.5)
  const to = darken(mainColor, 0)
  return `linear-gradient(90deg, ${from}, ${to})`
}

export default createGradientFromMainColor
