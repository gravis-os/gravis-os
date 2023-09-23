import React from 'react'

import {
  useIncrementCount,
  useList,
  useUpdateIncrementCount,
} from '@gravis-os/query'
import { StorageImage } from '@gravis-os/storage'
import { CrudModule } from '@gravis-os/types'
import { Box } from '@gravis-os/ui'

const getSrcKeyByAr = (ar: string) => {
  switch (ar) {
    case '1:1': {
      return 'image_1_x_1_src'
    }
    case '1:2': {
      return 'image_1_x_2_src'
    }
    case '16:9':
    default: {
      return 'image_16_x_9_src'
    }
  }
}

export interface AdOrderProps {
  adModule: CrudModule
  adOrderModule: CrudModule
  ar?: string
  placement: string
}

const AdOrder: React.FC<AdOrderProps> = (props) => {
  const { adModule, adOrderModule, ar = '1:1', placement } = props

  // Fetch adOrders
  const { items: adOrders } = useList({
    match: { placement },
    module: adOrderModule,
    queryOptions: { enabled: Boolean(placement) },
  })
  const [adOrder] = adOrders || []
  const { ad }: any = adOrder || {}

  useIncrementCount({
    countColumnName: 'view_count',
    item: adOrder,
    module: adOrderModule,
  })

  useIncrementCount({
    item: ad,
    module: adModule as CrudModule,
  })

  if (!ad) return null

  const { updateIncrementCount: updateAdClickCount } = useUpdateIncrementCount({
    countColumnName: 'click_count',
    module: adModule as CrudModule,
  })

  const handleAdClick = async () => {
    await updateAdClickCount(ad)
    window.open(ad.url, '_blank', 'noopener, noreferrer')
  }

  return (
    <Box mb={2}>
      <Box onClick={handleAdClick} sx={{ ':hover': { cursor: 'pointer' } }}>
        <StorageImage
          alt={ad.image_alt || ad.title}
          ar={ar}
          rounded
          src={ad[getSrcKeyByAr(ar)]}
        />
      </Box>
    </Box>
  )
}

export default AdOrder
