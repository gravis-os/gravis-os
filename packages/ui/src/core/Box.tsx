import React, { forwardRef } from 'react'
import { Box as MuiBox, BoxProps as MuiBoxProps } from '@mui/material'
import { RevealProps } from './Reveal'
import withReveal from './withReveal'

export interface BoxProps extends MuiBoxProps {
  fullWidthOnMobile?: boolean
  center?: boolean
  stretch?: boolean
  reveal?: boolean | RevealProps
}

const Box: React.FC<BoxProps> = forwardRef((props, ref) => {
  const { stretch, fullWidthOnMobile, reveal, center, sx, children, ...rest } =
    props

  const boxProps = {
    ref,
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

  const enhancedChildren = withReveal({
    reveal,
  })(children)

  return <MuiBox {...boxProps}>{enhancedChildren}</MuiBox>
})

export default Box
