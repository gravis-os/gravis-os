import React from 'react'
import {
  ImageList as MuiImageList,
  ImageListProps as MuiImageListProps,
  ImageListItem as MuiImageListItem,
  Breakpoint,
} from '@mui/material'
import { ResponsiveSxProp } from '../utils'

export interface ImageListProps
  extends Omit<MuiImageListProps, 'children' | 'cols'> {
  items?: React.ReactNode[]
  cols?: ResponsiveSxProp
}

const ImageList: React.FC<ImageListProps> = (props) => {
  const { items, cols = { xs: 1, md: 2 }, sx, ...rest } = props

  if (!items?.length) return null

  return (
    <MuiImageList
      sx={
        {
          mt: 0,

          // Responsive cols
          ...(typeof cols === 'object' && {
            gridTemplateColumns: (theme) => {
              return {
                ...Object.entries(cols).reduce((acc, [key, value]) => {
                  return {
                    ...acc,
                    [theme.breakpoints.up(key as Breakpoint)]: {
                      gridTemplateColumns: `repeat(${value}, 1fr) !important`,
                    },
                  }
                }, {}),
              }
            },
          }),

          ...sx,
        } as MuiImageListProps['sx']
      }
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
