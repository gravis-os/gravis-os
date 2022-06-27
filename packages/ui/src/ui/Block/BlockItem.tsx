import React from 'react'
import Typography, { TypographyProps } from '../Typography'
import Grid, { GridProps } from '../Grid'
import Box, { BoxProps } from '../Box'
import Container, { ContainerProps } from '../Container'
import Image, { ImageProps } from '../Image'
import Button, { ButtonProps } from '../Button'

export enum BlockItemTypeEnum {
  // Default Typography
  OVERLINE = 'overline',
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

  // Custom
  IMAGE = 'image',
  ICON = 'icon',
  GRID = 'grid',
  BUTTON = 'button',
  LINK = 'link',
}

export interface BlockItemProps extends BoxProps {
  containerProps?: ContainerProps
  gridItems?: BlockItemProps[]
  gridProps?: GridProps
  gridItemProps?: GridProps
  title: React.ReactNode
  titleProps?: TypographyProps | ImageProps | ButtonProps
  type?: BlockItemTypeEnum
}

const renderChildren = ({ type, title, titleProps }) => {
  switch (type) {
    case BlockItemTypeEnum.OVERLINE:
      return (
        <Typography
          variant="overline"
          color="text.secondary"
          gutterBottom
          {...titleProps}
        >
          {title}
        </Typography>
      )
    case BlockItemTypeEnum.ICON:
      const Icon = title
      return <Icon {...titleProps} />
    case BlockItemTypeEnum.BUTTON:
      return <Button {...titleProps}>{title}</Button>
    case BlockItemTypeEnum.IMAGE:
      const src = title
      return <Image src={src} layout="responsive" {...titleProps} />
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
      return (
        <Typography variant={type} {...titleProps}>
          {title}
        </Typography>
      )
    default:
      return null
  }
}

const renderBlockItem = (props) => {
  const { sx, type, title, titleProps, ...rest } = props
  return (
    <Box sx={sx} {...rest}>
      {renderChildren({ type, title, titleProps })}
    </Box>
  )
}

const BlockItem: React.FC<BlockItemProps> = (props) => {
  const {
    type,
    sx,
    gridItems,
    gridItemProps,
    gridProps,
    maxWidth,
    containerProps,
  } = props

  if (type === BlockItemTypeEnum.GRID && gridItems) {
    return (
      <Box sx={sx}>
        <Container maxWidth={maxWidth} {...containerProps}>
          <Grid container spacing={{ xs: 5, md: 10 }} {...gridProps}>
            {gridItems.map((gridItem) => {
              const { items, ...rest } = gridItem
              return (
                <Grid
                  item
                  xs={12}
                  md
                  {...gridItemProps} // Spread to all grid items
                  {...rest}
                >
                  {items.map((item) => renderBlockItem(item))}
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </Box>
    )
  }

  return (
    <Container maxWidth={maxWidth} {...containerProps}>
      {renderBlockItem(props)}
    </Container>
  )
}

export default BlockItem
