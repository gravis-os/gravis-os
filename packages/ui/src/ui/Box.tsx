import React from 'react'
import { Box as MuiBox, BoxProps as MuiBoxProps } from '@mui/material'
import Reveal from './Reveal'

export interface BoxProps extends MuiBoxProps {
  fullWidthOnMobile?: boolean
  center?: boolean
  stretch?: boolean
  reveal?: boolean | Record<string, unknown>
}

const Box: React.FC<BoxProps> = (props) => {
  const { stretch, fullWidthOnMobile, reveal, center, sx, children, ...rest } =
    props

  const boxProps = {
    sx: {
      // fullWidthOnMobile
      ...(fullWidthOnMobile && {
        width: { xs: '100%', md: 'initial' },
      }),

      // Center
      ...(center && {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }),

      // Stretch
      ...(stretch && {
        height: '100%',
      }),

      ...sx,
    } as BoxProps['sx'],
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
