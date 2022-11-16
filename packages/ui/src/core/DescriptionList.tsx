import React from 'react'
import Stack from './Stack'
import Grid from './Grid'
import Typography from './Typography'

export interface DescriptionListItem {
  key: string
  label: React.ReactNode
  value: React.ReactNode
}

export interface DescriptionListProps {
  items: DescriptionListItem[]
}

const DescriptionList: React.FC<DescriptionListProps> = (props) => {
  const { items } = props

  if (!items?.length) return null

  return (
    <Stack component="dl" horizontalDividers>
      {items.map((item) => {
        const { key, value, label } = item

        return (
          <Grid key={key} container spacing={{ xs: 0, md: 1 }} sx={{ py: 1 }}>
            <Grid item md={4} lg={5} component="dt">
              <Typography variant="body1" color="text.secondary">
                {label}
              </Typography>
            </Grid>
            <Grid item md={8} lg={7} component="dd">
              <Typography variant="body1">{value}</Typography>
            </Grid>
          </Grid>
        )
      })}
    </Stack>
  )
}

export default DescriptionList
