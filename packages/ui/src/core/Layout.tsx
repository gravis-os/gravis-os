import React from 'react'

import Box, { BoxProps } from './Box'
import Grid from './Grid'

export interface LayoutProps {
  children?: React.ReactNode
  leftAside?: React.ReactElement
  leftAsideBoxProps?: BoxProps
  rightAside?: React.ReactElement
  rightAsideBoxProps?: BoxProps
  rightAsideSticky?: boolean
}

const Layout: React.FC<LayoutProps> = (props) => {
  const {
    children,
    leftAside,
    leftAsideBoxProps,
    rightAside,
    rightAsideBoxProps,
    rightAsideSticky,
  } = props

  const rightAsideProps = {
    ...rightAsideBoxProps,
    sx: {
      ...(rightAsideSticky && {
        position: 'sticky',
        top: `calc(64px + 16px)`,
      }),
      ...rightAsideBoxProps?.sx,
    },
  } as BoxProps

  return (
    <Grid container>
      {leftAside && (
        <Grid item md={3}>
          <Box {...leftAsideBoxProps}>{leftAside}</Box>
        </Grid>
      )}

      <Grid item md>
        {children}
      </Grid>

      {rightAside && (
        <Grid item md={3}>
          <Box {...rightAsideProps}>{rightAside}</Box>
        </Grid>
      )}
    </Grid>
  )
}

export default Layout
