import React from 'react'
import {
  ImageList as MuiImageList,
  ImageListProps as MuiImageListProps,
  ImageListItem as MuiImageListItem,
  ImageListItemProps as MuiImageListItemProps,
} from '@mui/material'

export interface ImageListProps extends Omit<MuiImageListProps, 'children'> {
  items?: React.ReactNode[]
}

const ImageList: React.FC<ImageListProps> = (props) => {
  const { items, sx, ...rest } = props

  if (!items?.length) return null

  return (
    <MuiImageList
      sx={{
        mt: 0,
        ...sx,
      }}
      {...rest}
    >
      {items.map((item) => {
        if (!item) return null
        return <MuiImageListItem>{item}</MuiImageListItem>
      })}
    </MuiImageList>
  )
}

export default ImageList
