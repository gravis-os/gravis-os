import React from 'react'

import { UseListReturn } from '@gravis-os/query'
import { CrudModule } from '@gravis-os/types'
import { Box, CircularProgress, Stack } from '@gravis-os/ui'

import PosProductListItem from './PosProductListItem'

export interface PosProductListProps {
  disableEndIcon?: boolean
  disableImage?: boolean
  disableRight?: boolean
  items?: any[]
  onClick?: (e: React.SyntheticEvent, item: any, i: number) => void
  productSpecImageModule?: CrudModule
  productSpecImagesQueryResult?: UseListReturn
  queryResult?: UseListReturn
}

const PosProductList: React.FC<PosProductListProps> = (props) => {
  const {
    disableEndIcon,
    disableImage,
    disableRight,
    items: injectedItems,
    onClick,
    productSpecImagesQueryResult,
    queryResult,
    ...rest
  } = props

  const { isLoading } = queryResult || {}
  const items = injectedItems || queryResult?.items || []

  return (
    <>
      {isLoading ? (
        <Box
          alignItems="center"
          display="flex"
          justifyContent="center"
          minHeight="50vh"
          textAlign="center"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Stack horizontalDividers>
          {items?.map((item, i) => (
            <PosProductListItem
              item={item}
              key={item?.id}
              {...queryResult}
              {...(onClick && { onClick: (e) => onClick(e, item, i) })}
              itemProps={{
                ...(disableEndIcon && { endIcon: null }),
                ...(disableImage && { avatar: null }),
                ...(disableRight && { right: null }),
              }}
              productSpecImagesQueryResult={productSpecImagesQueryResult}
              {...rest}
            />
          ))}
        </Stack>
      )}
    </>
  )
}

export default PosProductList
