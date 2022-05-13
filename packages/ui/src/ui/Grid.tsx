import React from 'react'
import { Grid as MuiGrid, GridProps as MuiGridProps } from '@mui/material'

export interface GridProps extends MuiGridProps {}

const Grid: React.FC<GridProps> = props => {
  const { ...rest } = props
  const { item, container, spacing } = rest

  const gridProps = {
    xs: item && 12,
    ...rest,
  }

  if (container) gridProps.spacing = spacing || 2

  return <MuiGrid {...gridProps} />
}

export default Grid
