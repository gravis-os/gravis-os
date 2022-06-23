import React from 'react'
import { Box as MuiBox, BoxProps as MuiBoxProps } from '@mui/material'
import Reveal from './Reveal'

export interface BoxProps extends MuiBoxProps {
  center?: boolean
  reveal?: boolean | Record<string, unknown>
}

const Box: React.FC<BoxProps> = (props) => {
  const { reveal, center, sx, children, ...rest } = props

  const boxProps = {
    sx: {
      ...(center && {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }),
      ...sx,
    },
    ...rest,
  }

  return reveal ? (
    <MuiBox {...boxProps}>
      <Reveal {...(typeof reveal === 'object' ? reveal : {})}>
        {children}
      </Reveal>
    </MuiBox>
  ) : (
    <MuiBox {...boxProps}>{children}</MuiBox>
  )
}

export default Box
