import React from 'react'
import { Stack as MuiStack, StackProps as MuiStackProps } from '@mui/material'
import Divider from './Divider'

const getColumnOrRow = (direction) =>
  direction === 'column' ? 'row' : 'column'

export interface StackProps extends MuiStackProps {
  center?: boolean
  reverseDirectionOnMobile?: boolean
  verticalDividers?: boolean
  horizontalDividers?: boolean
  divider?: React.ReactNode
}

const Stack: React.FC<StackProps> = (props) => {
  const {
    sx,
    center,
    reverseDirectionOnMobile,
    divider,
    verticalDividers,
    horizontalDividers,
    ...rest
  } = props
  const { direction = 'column', spacing } = rest

  const stackProps = {
    sx: {
      width: '100%',

      // Direction  Overwrite default direction to add the necessary spacing
      ...(reverseDirectionOnMobile && {
        flexDirection: { xs: getColumnOrRow(direction), md: direction },
        '& > :not(style)+:not(style)': {
          marginTop: {
            xs: direction === 'column' ? 0 : spacing,
            md: direction === 'column' ? spacing : 0,
          },
          marginLeft: {
            xs: direction === 'column' ? spacing : 0,
            md: direction === 'column' ? 0 : spacing,
          },
        },
      }),

      // Center
      ...(center && {
        alignItems: 'center',
        justifyContent: 'center',
      }),

      ...sx,
    } as StackProps['sx'],

    // Vertical Dividers
    ...(verticalDividers && {
      divider: divider || <Divider orientation="vertical" flexItem />,
    }),

    // Horizontal Dividers
    ...(horizontalDividers && {
      divider: divider || <Divider flexItem />,
    }),

    ...rest,
  }

  return <MuiStack {...stackProps} />
}

export default Stack
