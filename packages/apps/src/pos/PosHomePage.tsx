import React from 'react'
import { Grid } from '@gravis-os/ui'
import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined'
import PosLayoutV2 from './PosLayoutV2'
import PosAppCard from './PosAppCard'

const posAppCards = [
  {
    key: 'add-customer',
    title: 'Add Customer',
    color: 'primary',
    iconElement: HeartBrokenOutlinedIcon,
  },
  {
    key: 'view-all-products',
    title: 'View All Products',
    color: 'success',
    iconElement: HeartBrokenOutlinedIcon,
  },
  {
    key: 'add-note',
    title: 'Add Note',
    iconElement: HeartBrokenOutlinedIcon,
  },
  {
    key: 'apply-discount',
    title: 'Apply Discount',
    iconElement: HeartBrokenOutlinedIcon,
  },
]

export interface PosHomePageProps {}

const PosHomePage: React.FC<PosHomePageProps> = (props) => {
  return (
    <PosLayoutV2>
      <Grid container spacing={2}>
        {posAppCards.map((posAppCard) => {
          return (
            <Grid item xs={12} sm={6} key={posAppCard.key}>
              <PosAppCard {...posAppCard} />
            </Grid>
          )
        })}
      </Grid>
    </PosLayoutV2>
  )
}

export default PosHomePage
