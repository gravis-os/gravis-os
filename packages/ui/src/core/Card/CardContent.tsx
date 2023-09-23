import React from 'react'

import {
  CardContent as MuiCardContent,
  CardContentProps as MuiCardContentProps,
} from '@mui/material'

import { ResponsiveSxProp } from '../../utils'

export interface CardContentProps extends MuiCardContentProps {
  disableGutterBottom?: boolean
  padding?: ResponsiveSxProp
  stretch?: boolean
}

const CardContent: React.FC<CardContentProps> = (props) => {
  const { disableGutterBottom, padding, stretch, sx, ...rest } = props

  return (
    <MuiCardContent
      sx={
        {
          // Overwrite the padding bottom that MUI ships with by default
          ...((disableGutterBottom || typeof padding === 'number') && {
            '&&.MuiCardContent-root': {
              pb:
                typeof padding === 'number' || typeof padding === 'object'
                  ? padding
                  : 2, // Default to 16px because MUI default card padding is 2
            },
          }),
          padding,

          // Stretch
          ...(stretch && {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }),

          ...sx,
        } as CardContentProps['sx']
      }
      {...rest}
    />
  )
}

export default CardContent
