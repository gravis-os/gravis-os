import React from 'react'
import Typography, { TypographyProps } from '../Typography'
import Grid, { GridProps } from '../Grid'
import Box, { BoxProps } from '../Box'
import Container, { ContainerProps } from '../Container'
import Image, { ImageProps } from '../Image'
import Button, { ButtonProps } from '../Button'
import Stack, { StackProps } from '../Stack'

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

  // Layout
  GRID = 'grid',
  STACK = 'stack',

  // Custom
  IMAGE = 'image',
  ICON = 'icon',
  BUTTON = 'button',
  LINK = 'link',
}

export interface BlockItemProps extends BoxProps {
  containerProps?: ContainerProps

  // Grid
  gridProps?: GridProps
  gridItems?: BlockItemProps[]
  gridItemProps?: GridProps

  // Stack
  stackProps?: StackProps
  stackItems?: BlockItemProps[]
  stackItemProps?: StackProps

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

const renderGrid = (props) => {
  const {
    type,
    sx,
    gridItems,
    gridItemProps: injectedGridItemProps,
    gridProps,
    maxWidth,
    containerProps,
  } = props
  return (
    <Box sx={sx}>
      <Container maxWidth={maxWidth} {...containerProps}>
        <Grid container spacing={{ xs: 5, md: 10 }} {...gridProps}>
          {gridItems.map((gridItem, i) => {
            const { items, ...rest } = gridItem

            // Wrapper gridItem props abstracted for common use
            const gridItemProps = {
              item: true,
              xs: 12,
              md: true,
              ...injectedGridItemProps, // Spread to all grid items
              ...rest,
            }

            // Manage recursive grids
            const hasNestedGridItems = Boolean(rest?.gridItems)
            if (hasNestedGridItems) {
              return (
                <Grid key={`nested-grid-item-${i}`} {...gridItemProps}>
                  {renderGrid({
                    ...gridItem,

                    // Disable container for nested grids to avoid extra padding
                    containerProps: {
                      ...gridItem.containerProps,
                      disableGutters: true,
                    },
                  })}
                </Grid>
              )
            }

            // Inform dev to provide Griditem.items as it is required.
            if (!Array.isArray(items)) {
              throw new Error(
                `GridItem.items need to be defined as an array for title: "${gridItem.title}".`
              )
            }

            return (
              <Grid {...gridItemProps}>
                {items.map((item) => renderBlockItem(item))}
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}

const renderStack = (props) => {
  const {
    type,
    sx,

    stackItems,
    stackItemProps: injectedStackItemProps,
    stackProps,

    // Container
    maxWidth,
    containerProps,
  } = props

  return (
    <Box sx={sx}>
      <Container maxWidth={maxWidth} {...containerProps}>
        <Stack spacing={1} {...stackProps}>
          {stackItems.map((stackItem, i) => {
            const { items, ...rest } = stackItem

            // StackItem is a Box
            // Wrapper stackItemProps abstracted for common use
            const stackItemProps = {
              fullWidthOnMobile: true,
              ...injectedStackItemProps, // Spread to all stack items
              ...rest,
            }

            // Manage recursive stacks
            const hasNestedStackItems = Boolean(rest?.stackItems)
            if (hasNestedStackItems) {
              return (
                <Box key={`nested-stack-item-${i}`} {...stackItemProps}>
                  {renderStack(stackItem)}
                </Box>
              )
            }

            // Inform dev to provide Stackitem.items as it is required.
            if (!Array.isArray(items)) {
              throw new Error(
                `StackItem.items need to be defined as an array for title: "${stackItem.title}".`
              )
            }

            return (
              <Box key={`stack-item-${i}`} {...stackItemProps}>
                {items.map((item) => renderBlockItem(item))}
              </Box>
            )
          })}
        </Stack>
      </Container>
    </Box>
  )
}

const BlockItem: React.FC<BlockItemProps> = (props) => {
  const {
    type,
    sx,

    // Grid
    gridProps,
    gridItems,
    gridItemProps,

    // Stack
    stackProps,
    stackItems,
    stackItemProps,

    maxWidth,
    containerProps,
  } = props

  if (type === BlockItemTypeEnum.GRID && gridItems) return renderGrid(props)
  if (type === BlockItemTypeEnum.STACK && stackItems) return renderStack(props)

  return (
    <Container maxWidth={maxWidth} {...containerProps}>
      {renderBlockItem(props)}
    </Container>
  )
}

export default BlockItem
