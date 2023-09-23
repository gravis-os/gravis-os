import React from 'react'

import { Stack as MuiStack, StackProps as MuiStackProps } from '@mui/material'

import Divider from './Divider'

const getColumnOrRow = (direction) =>
  direction === 'column' ? 'row' : 'column'

export interface StackProps extends MuiStackProps {
  center?: boolean
  component?: React.ElementType
  divider?: React.ReactNode
  horizontalDividers?: boolean
  reverseDirectionOnMobile?: boolean
  verticalDividers?: boolean
}

const Stack: React.FC<StackProps> = (props) => {
  const {
    center,
    horizontalDividers,
    reverseDirectionOnMobile,
    sx,
    verticalDividers,
    ...rest
  } = props
  const { direction = 'column', spacing } = rest

  const stackProps = {
    sx: {
      width: '100%',

      // Direction  Overwrite default direction to add the necessary spacing
      ...(reverseDirectionOnMobile && {
        '& > :not(style)+:not(style)': {
          marginLeft: {
            xs: direction === 'column' ? spacing : 0,
            md: direction === 'column' ? 0 : spacing,
          },
          marginTop: {
            xs: direction === 'column' ? 0 : spacing,
            md: direction === 'column' ? spacing : 0,
          },
        },
        flexDirection: { xs: getColumnOrRow(direction), md: direction },
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
      divider: <Divider flexItem orientation="vertical" />,
    }),

    // Horizontal Dividers
    ...(horizontalDividers && {
      divider: <Divider flexItem />,
    }),

    ...rest,
  }

  return <MuiStack {...stackProps} />
}

export default Stack
