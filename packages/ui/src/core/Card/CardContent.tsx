import React from 'react'
import {
  CardContent as MuiCardContent,
  CardContentProps as MuiCardContentProps,
} from '@mui/material'

export interface CardContentProps extends MuiCardContentProps {}

const CardContent: React.FC<CardContentProps> = (props) => {
  const { sx, ...rest } = props
  return <MuiCardContent sx={sx} {...rest} />
}

export default CardContent
