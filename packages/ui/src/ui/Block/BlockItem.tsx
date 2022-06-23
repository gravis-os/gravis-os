import React from 'react'
import Typography from '../Typography'
import Grid, { GridProps } from '../Grid'
import Box, { BoxProps } from '../Box'

export enum BlockItemTypeEnum {
  OVERLINE = 'overline',
  TITLE = 'title',
  SUBTITLE = 'subtitle',
  BODY = 'body',

  // Typography
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  BODY1 = 'body1',
  BODY2 = 'body2',
  SUBTITLE1 = 'subtitle1',
  SUBTITLE2 = 'subtitle2',
  CAPTION = 'caption',
}

export interface BlockItemProps extends BoxProps {
  gridItems?: BlockItemProps[]
  gridProps?: GridProps
  gridItemProps?: GridProps
  title: React.ReactNode
  type?: BlockItemTypeEnum
}

const renderChildren = ({ type, title }) => {
  switch (type) {
    case BlockItemTypeEnum.OVERLINE:
      return (
        <Typography variant="overline" color="text.secondary" gutterBottom>
          {title}
        </Typography>
      )
    case BlockItemTypeEnum.TITLE:
      return (
        <Typography variant="h3" gutterBottom>
          {title}
        </Typography>
      )
    case BlockItemTypeEnum.SUBTITLE:
      return (
        <Typography variant="h5" color="text.secondary">
          {title}
        </Typography>
      )
    case BlockItemTypeEnum.BODY:
      return (
        <Typography variant="body1" color="text.secondary">
          {title}
        </Typography>
      )
    case BlockItemTypeEnum.H1:
    case BlockItemTypeEnum.H2:
    case BlockItemTypeEnum.H3:
    case BlockItemTypeEnum.H4:
    case BlockItemTypeEnum.H5:
    case BlockItemTypeEnum.H6:
    case BlockItemTypeEnum.SUBTITLE1:
    case BlockItemTypeEnum.SUBTITLE2:
    case BlockItemTypeEnum.BODY1:
    case BlockItemTypeEnum.BODY2:
    case BlockItemTypeEnum.CAPTION:
      return <Typography variant={type}>{title}</Typography>
    default:
      return null
  }
}

const renderBlockItem = (props) => {
  const { sx, type, title, ...rest } = props
  return (
    <Box sx={sx} {...rest}>
      {renderChildren({ type, title })}
    </Box>
  )
}

const BlockItem: React.FC<BlockItemProps> = (props) => {
  const { sx, gridItems, gridItemProps, gridProps } = props

  if (gridItems) {
    return (
      <Box sx={sx}>
        <Grid container spacing={{ xs: 5, md: 10 }} {...gridProps}>
          {gridItems.map((gridItem) => {
            const {
              items,
              sx,
              gridItemProps: injectedGridItemProps,
              ...rest
            } = gridItem
            return (
              <Grid
                item
                xs={12}
                md
                sx={sx}
                {...gridItemProps} // Spread to all grid items
                {...injectedGridItemProps} // Specific to a grid item
              >
                {items.map((item) => renderBlockItem({ ...item, ...rest }))}
              </Grid>
            )
          })}
        </Grid>
      </Box>
    )
  }

  return renderBlockItem(props)
}

export default BlockItem
