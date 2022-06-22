import React from 'react'
import { Box as MuiBox, BoxProps as MuiBoxProps } from '@mui/material'
import Reveal from './Reveal'

export interface BoxProps extends MuiBoxProps {
  center?: boolean
  reveal?: boolean | Record<string, unknown>
}

const Box: React.FC<BoxProps> = (props) => {
  const { reveal, center, sx, ...rest } = props

  const childrenJsx = (
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

  return reveal ? (
    <Reveal {...(typeof reveal === 'object' ? reveal : {})}>
      {childrenJsx}
    </Reveal>
  ) : (
    childrenJsx
  )
}

export default Box
