import React from 'react'
import Paper from '@mui/material/Paper'
import posConfig from './posConfig'

export interface PosLayoutProps {
  children?: React.ReactNode
}

const PosLayout: React.FC<PosLayoutProps> = (props) => {
  const { children } = props

  return (
    <div>
      {/* Children */}
      <Paper
        square
        sx={{ height: `calc(100vh - ${posConfig.appBarHeight}px)` }}
      >
        {children}
      </Paper>
    </div>
  )
}

export default PosLayout
