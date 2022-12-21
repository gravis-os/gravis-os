import React from 'react'
import { Stack } from '@gravis-os/ui'
import PosProductListItem from './PosProductListItem'

export interface PosProductListProps {
  queryResult?: any
  items?: any[]
  onClick?: (e: React.SyntheticEvent, item: any, i: number) => void
  disableEndIcon?: boolean
  disableImage?: boolean
}

const PosProductList: React.FC<PosProductListProps> = (props) => {
  const {
    disableImage,
    disableEndIcon,
    onClick,
    items: injectedItems,
    queryResult,
  } = props

  const items = injectedItems || queryResult?.items || []

  return (
    <Stack horizontalDividers>
      {items?.map((item, i) => (
        <PosProductListItem
          key={item?.id}
          item={item}
          {...queryResult}
          {...(onClick && { onClick: (e) => onClick(e, item, i) })}
          itemProps={{
            ...(disableEndIcon && { endIcon: null }),
            ...(disableImage && { avatar: null }),
          }}
        />
      ))}
    </Stack>
  )
}

export default PosProductList
