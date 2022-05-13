import React from 'react'
import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from '@mui/material'

export interface TypographyProps extends MuiTypographyProps {}

const Typography: React.FC<TypographyProps> = props => {
  return <MuiTypography {...props} />
}

export default Typography
