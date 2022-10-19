import React from 'react'
import {
  CardContent as MuiCardContent,
  CardContentProps as MuiCardContentProps,
} from '@mui/material'
import { ResponsiveSxProp } from '../../utils'

export interface CardContentProps extends MuiCardContentProps {
  disableGutterBottom?: boolean
  padding?: ResponsiveSxProp
}

const CardContent: React.FC<CardContentProps> = (props) => {
  const { sx, padding, disableGutterBottom, ...rest } = props
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
                  : 2,
            },
          }),
          padding,
          ...sx,
        } as CardContentProps['sx']
      }
      {...rest}
    />
  )
}

export default CardContent
