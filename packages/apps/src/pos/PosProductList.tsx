import React from 'react'
import { UseListReturn } from '@gravis-os/query'
import { CrudModule } from '@gravis-os/types'
import { Box, CircularProgress, Stack } from '@gravis-os/ui'
import PosProductListItem from './PosProductListItem'

export interface PosProductListProps {
  queryResult?: UseListReturn
  items?: any[]
  onClick?: (e: React.SyntheticEvent, item: any, i: number) => void
  disableEndIcon?: boolean
  disableRight?: boolean
  disableImage?: boolean
  productSpecImagesQueryResult?: UseListReturn
  productSpecImageModule?: CrudModule
}

const PosProductList: React.FC<PosProductListProps> = (props) => {
  const {
    disableImage,
    disableEndIcon,
    disableRight,
    onClick,
    items: injectedItems,
    queryResult,
    productSpecImagesQueryResult,
    ...rest
  } = props

  const { isLoading } = queryResult || {}
  const items = injectedItems || queryResult?.items || []

  return (
    <>
      {isLoading ? (
        <Box
          minHeight="50vh"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          display="flex"
        >
          <CircularProgress />
        </Box>
      ) : (
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
