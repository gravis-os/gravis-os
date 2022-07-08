import React from 'react'
import {
  Typography,
  TypographyProps,
  Grid,
  GridProps,
  Box,
  BoxProps,
  Container,
  ContainerProps,
  Image,
  ImageProps,
  Button,
  ButtonProps,
  Stack,
  StackProps,
  Link,
  LinkProps,
  CardProps,
} from '@gravis-os/ui'

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
  CARD = 'card',

  // Card
  CARD_ABSOLUTE_BOTTOM_IMAGE = 'card_absolute_bottom_image',

  // Custom
  IMAGE = 'image',
  ICON = 'icon',
  BUTTON = 'button',
  LINK = 'link',
}

export interface BlockItemProps extends Omit<BoxProps, 'title' | 'maxWidth'> {
  // BoxProps - Wrapper of a BlockItem
  boxProps?: BoxProps

  // Container
  containerProps?: ContainerProps
  maxWidth?: ContainerProps['maxWidth']

  // Grid
  gridProps?: GridProps
  gridItems?: BlockItemProps[]
  gridItemProps?: GridProps

  // Stack
  stackProps?: StackProps
  stackItems?: BlockItemProps[]
  stackItemProps?: StackProps

  // Card
  cardItems?: BlockItemProps[]
  cardProps?: CardProps

  // Core
  title: React.ReactNode
  titleProps?: TypographyProps | ImageProps | ButtonProps | LinkProps
  type?: BlockItemTypeEnum
}

const renderBlockItem = (props) => {
  const { boxProps, type, title, titleProps } = props

  switch (type) {
    case BlockItemTypeEnum.OVERLINE:
      return (
        <Box {...boxProps}>
          <Typography
            variant="overline"
            color="text.secondary"
            gutterBottom
            {...titleProps}
          >
            {title}
          </Typography>
        </Box>
      )
    case BlockItemTypeEnum.ICON:
      const Icon = title
      return (
        <Box {...boxProps}>
          <Icon {...titleProps} />
        </Box>
      )
    case BlockItemTypeEnum.BUTTON:
      return (
        <Box {...boxProps}>
          <Button {...titleProps}>{title}</Button>
        </Box>
      )
    case BlockItemTypeEnum.LINK:
      return (
        <Box {...boxProps}>
          <Link displayBlock {...titleProps}>
            {title}
          </Link>
        </Box>
      )
    case BlockItemTypeEnum.IMAGE:
      return (
        <Box {...boxProps}>
          <Image src={title} layout="responsive" {...titleProps} />
        </Box>
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
      return (
        <Box {...boxProps}>
          <Typography variant={type} {...titleProps}>
            {title}
          </Typography>
        </Box>
      )
    // Card
    case BlockItemTypeEnum.CARD_ABSOLUTE_BOTTOM_IMAGE:
      return (
        <Box
          {...boxProps}
          sx={{
            width: '100%',
            position: { xs: 'static', md: 'absolute' },
            bottom: 0,
            ...boxProps?.sx,
          }}
        >
          <Image
            src={title}
            layout="responsive"
            {...titleProps}
            sx={{ mt: 5, ...titleProps?.sx }}
          />
        </Box>
      )
    default:
      return null
  }
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
            const { items, boxProps, ...rest } = gridItem

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

            // Render GridItem
            return (
              <Grid {...gridItemProps}>
                <Box {...boxProps}>
                  {items.map((item) => renderBlockItem(item))}
                </Box>
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

/**
 * Box(rest) > Container(containerProps) > Box(boxProps) > renderGrid/renderStack > renderBlockItem > renderChildren
 * @param props
 * @constructor
 */
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

    // Card
    cardItems,

    maxWidth,
    containerProps,
  } = props

  switch (true) {
    case Boolean(type === BlockItemTypeEnum.STACK && stackItems):
      return renderStack(props)
    case Boolean(type === BlockItemTypeEnum.GRID && gridItems):
      return renderGrid(props)
    // Extension of GridItem actually, just with presets. Apple-like cards
    case Boolean(type === BlockItemTypeEnum.CARD && cardItems):
      return renderGrid({
        ...props,
        gridProps: { spacing: { xs: 3 }, ...gridProps },
        gridItems: cardItems.map((cardItem) => ({
          boxProps: {
            stretch: true,
            ...cardItem.cardProps,
            sx: {
              position: 'relative',
              backgroundColor: 'background.paper',
              borderRadius: 5,
              pt: 6,
              pb: 4,
              overflow: 'hidden',
              ...cardItem.cardProps?.sx,
            },
          },
          ...cardItem,
        })),
      })
    default:
      return (
        <Container maxWidth={maxWidth} {...containerProps}>
          {renderBlockItem(props as BlockItemProps)}
        </Container>
      )
  }
}

export default BlockItem
