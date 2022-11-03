import React from 'react'
import { Box } from '@gravis-os/ui'
import { StorageImage } from '@gravis-os/storage'
import {
  useList,
  useIncrementCount,
  useUpdateIncrementCount,
} from '@gravis-os/query'
import { CrudModule } from '@gravis-os/types'

export interface AdOrderProps {
  placement: string
  ar?: string
  adModule: CrudModule
  adOrderModule: CrudModule
}

const AdOrder: React.FC<AdOrderProps> = (props) => {
  const { adModule, adOrderModule, placement, ar = '1:1' } = props

  // Fetch adOrders
  const { items: adOrders } = useList({
    module: adOrderModule,
    match: { placement },
    queryOptions: { enabled: Boolean(placement) },
  })
  const [adOrder] = adOrders || []
  const { ad }: any = adOrder || {}

  useIncrementCount({
    item: adOrder,
    module: adOrderModule,
    countColumnName: 'view_count',
  })

  useIncrementCount({
    item: ad,
    module: adModule as CrudModule,
  })

  if (!ad) return null

  const getSrcKeyByAr = (ar: string) => {
    switch (ar) {
      case '1:1':
        return 'image_1_x_1_src'
      case '1:2':
        return 'image_1_x_2_src'
      case '16:9':
      default:
        return 'image_16_x_9_src'
    }
  }

  const { updateIncrementCount: updateAdClickCount } = useUpdateIncrementCount({
    module: adModule as CrudModule,
    countColumnName: 'click_count',
  })

  const handleAdClick = async () => {
    await updateAdClickCount(ad)
    window.open(ad.url, '_blank', 'noopener, noreferrer')
  }

  return (
    <Box mb={2}>
      <Box onClick={handleAdClick} sx={{ ':hover': { cursor: 'pointer' } }}>
        <StorageImage
          src={ad[getSrcKeyByAr(ar)]}
          alt={ad.image_alt || ad.title}
          ar={ar}
          rounded
        />
      </Box>
    </Box>
  )
}

export default AdOrder
