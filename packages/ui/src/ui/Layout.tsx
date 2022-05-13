import React from 'react'
import Grid from './Grid'
import Box from './Box'

export interface LayoutProps {
  rightAside?: React.ReactElement
  rightAsideSticky?: boolean
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = props => {
  const { rightAside, rightAsideSticky, children } = props

  const rightAsideProps = {
    sx: {
      ...(rightAsideSticky && {
        position: 'sticky',
        top: `calc(64px + 16px)`,
      }),
    },
  }

  return (
    <Grid container>
      <Grid item md={9}>
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
