import React from 'react'
import Typography from '../Typography'
import Grid, { GridProps } from '../Grid'
import Box, { BoxProps } from '../Box'

export enum BlockItemTypeEnum {
  OVERLINE = 'overline',
  TITLE = 'title',
  SUBTITLE = 'subtitle',
  BODY = 'body',
}

export interface BlockItemProps extends BoxProps {
  gridItems?: BlockItemProps[]
  gridProps?: GridProps
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
    default:
      return null
  }
}

const renderBlockItem = (props) => {
  const { sx, type, title, gridItems, ...rest } = props
  return (
    <Box sx={sx} {...rest}>
      {renderChildren({ type, title, gridItems })}
    </Box>
  )
}

const BlockItem: React.FC<BlockItemProps> = (props) => {
  const { sx, gridItems, gridProps } = props

  if (gridItems) {
    return (
      <Box sx={sx}>
        <Grid container spacing={{ xs: 5, md: 10 }} {...gridProps}>
          {gridItems.map((gridItem) => {
            const { items, ...rest } = gridItem
            return (
              <Grid item xs={12} md>
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
