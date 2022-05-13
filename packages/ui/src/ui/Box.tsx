import React from 'react'
import { Box as MuiBox, BoxProps as MuiBoxProps } from '@mui/material'

export interface BoxProps extends MuiBoxProps {
  center?: boolean
}

const Box: React.FC<BoxProps> = props => {
  const { center, sx, ...rest } = props

  return (
    <MuiBox
      sx={{
        ...(center && {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }),
        ...sx,
      }}
      {...rest}
    />
  )
}

export default Box
