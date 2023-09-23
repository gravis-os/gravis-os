import React, { useState } from 'react'

import {
  Breakpoint,
  ImageList as MuiImageList,
  ImageListItem as MuiImageListItem,
  ImageListItemProps as MuiImageListItemProps,
  ImageListProps as MuiImageListProps,
} from '@mui/material'

import Box from '../core/Box'
import { ResponsiveSxProp } from '../utils'
import ViewAllDialogButton from './Slider/ViewAllDialogButton'

export interface ImageListProps
  extends Omit<MuiImageListProps, 'children' | 'cols'> {
  cols?: MuiImageListProps['cols'] | ResponsiveSxProp
  itemProps?: MuiImageListItemProps[]
  items?: React.ReactNode[]
  previewItemCount?: number
  viewAll?: boolean
  viewAllOnClick?: boolean
}

const ImageList: React.FC<ImageListProps> = (props) => {
  const {
    itemProps,
    items,
    previewItemCount,
    sx,
    viewAll,
    viewAllOnClick,
    ...rest
  } = props
  const { cols = { xs: 1, md: 2 } } = rest

  // For `viewAllOnClick`
  const [isViewAllOpen, setIsViewAllOpen] = useState(false)

  if (!items?.length) return null

  const childrenJsx = (
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

          // View all onClick
          ...(viewAllOnClick && {
            '& .MuiImageListItem-root:hover': {
              cursor: 'pointer',
              opacity: 0.8,
            },
          }),

          ...sx,
        } as MuiImageListProps['sx']
      }
      {...(rest as MuiImageListProps)}
    >
      {(previewItemCount ? items.slice(0, previewItemCount) : items).map(
        (item, i) => {
          if (!item) return null
          return (
            <MuiImageListItem
              key={`mui-image-list-item-${i}`}
              {...(viewAllOnClick && {
                onClick: () => setIsViewAllOpen(!isViewAllOpen),
              })}
              {...(itemProps ? itemProps[i] : {})}
            >
              {item}
            </MuiImageListItem>
          )
        }
      )}
    </MuiImageList>
  )

  return viewAll ? (
    <Box sx={{ position: 'relative' }}>
      {childrenJsx}

      <ViewAllDialogButton
        items={items}
        {...(viewAllOnClick && {
          open: isViewAllOpen,
          setOpen: setIsViewAllOpen,
        })}
      />
    </Box>
  ) : (
    childrenJsx
  )
}

export default ImageList
