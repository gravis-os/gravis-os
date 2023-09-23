import React from 'react'

import { Grid } from '@gravis-os/ui'

import PosAppCard, { PosAppCardProps } from './PosAppCard'

export interface PosAppCardGridProps {
  items: PosAppCardProps[]
}

const PosAppCardGrid: React.FC<PosAppCardGridProps> = (props) => {
  const { items } = props

  return (
    <Grid container spacing={2}>
      {items.map((item) => {
        return (
          <Grid item key={item.key} sm={6} xs={12}>
            <PosAppCard {...item} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default PosAppCardGrid
