import React from 'react'

import { WithPaletteModeProps, withPaletteMode } from '@gravis-os/theme'
import {
  AccordionProps,
  Box,
  BoxProps,
  ButtonProps,
  CardProps,
  Container,
  ContainerProps,
  DialogProps,
  Divider,
  DividerProps,
  Grid,
  GridProps,
  Image,
  ImageProps,
  Link,
  LinkProps,
  Stack,
  StackProps,
  Typography,
  TypographyProps,
  VideoProps,
} from '@gravis-os/ui'
import merge from 'lodash/merge'
import dynamic from 'next/dynamic'

import { BlockItemTypeEnum } from './constants'

const DynamicDialog = dynamic(() =>
  import('@gravis-os/ui').then((module) => module.Dialog)
)

export interface BlockItemProps extends Omit<BoxProps, 'maxWidth' | 'title'> {
  // Background Video
  backgroundVideoProps?: VideoProps

  // BoxProps - Wrapper of a BlockItem
  boxProps?: BoxProps

  // Card
  cardItems?: BlockItemProps[]
  cardProps?: CardProps
  containerProps?: ContainerProps
  // DialogProps (only applicable in gridItems)
  dialogProps?: DialogProps

  // Container
  disableContainer?: boolean
  disableContainerOnMobile?: boolean
  gridItemProps?: GridProps

  gridItems?: Array<
    GridProps & { boxProps?: BoxProps; items: BlockItemProps[] }
  >
  // Grid
  gridProps?: GridProps
  maxWidth?: boolean | string // ContainerProps['maxWidth']

  // Palette
  mode?: WithPaletteModeProps['mode']
  stackItemProps?: StackProps

  stackItems?: Array<
    StackProps & { boxProps?: BoxProps; items: BlockItemProps[] }
  >

  // Stack
  stackProps?: StackProps
  // Core
  title?: React.ReactElement | React.ReactNode | any // Fix issue with Icon type
  titleProps?:
    | AccordionProps
    | ButtonProps
    | DividerProps
    | LinkProps
    | Omit<Partial<ImageProps>, 'src'>
    | TypographyProps

  type?: BlockItemTypeEnum | string
}

const renderBlockItem = (props) => {
  const { title, boxProps, titleProps, type } = props

  const renderChildrenJsx = () => {
    if (!title) return null

    switch (type) {
      case BlockItemTypeEnum.OVERLINE:
      case BlockItemTypeEnum.OVERLINE2: {
        return (
          <Box {...boxProps}>
            <Typography
              color="text.secondary"
              gutterBottom
              variant={type}
              {...titleProps}
            >
              {title}
            </Typography>
          </Box>
        )
      }
      case BlockItemTypeEnum.ICON: {
        const Icon = title
        return (
          <Box {...boxProps}>
            <Icon {...titleProps} />
          </Box>
        )
      }
      case BlockItemTypeEnum.FA_ICON: {
        return (
          <Box {...boxProps}>
            <Box className={title} component="i" {...titleProps} />
          </Box>
        )
      }
      case BlockItemTypeEnum.DIVIDER: {
        return (
          <Box {...boxProps}>
            <Divider {...titleProps} />
          </Box>
        )
      }
      case BlockItemTypeEnum.BUTTON: {
        const DynamicButton = dynamic(() =>
          import('@gravis-os/ui').then((module) => module.Button)
        )
        return (
          <Box {...boxProps}>
            <DynamicButton {...titleProps}>{title}</DynamicButton>
          </Box>
        )
      }
      case BlockItemTypeEnum.LINK: {
        return (
          <Box {...boxProps}>
            <Link displayBlock {...titleProps}>
              {title}
            </Link>
          </Box>
        )
      }
      case BlockItemTypeEnum.IMAGE: {
        // If it's absolute path, this is a local src, so don't fetch from network.
        const isBucketPath =
          typeof title === 'string' && title.startsWith('public')
        if (!isBucketPath) {
          return (
            <Box {...boxProps}>
              <Image src={title} {...titleProps} />
            </Box>
          )
        }
        const DynamicStorageImage = dynamic(() =>
          import('@gravis-os/storage').then((module) => module.StorageImage)
        )
        return (
          <Box {...boxProps}>
            <DynamicStorageImage src={title} {...titleProps} />
          </Box>
        )
      }
      case BlockItemTypeEnum.SVG: {
        const InlineSvgComponent = title
        return (
          <Box {...boxProps}>
            <Box {...titleProps}>
              <InlineSvgComponent />
            </Box>
          </Box>
        )
      }
      case BlockItemTypeEnum.H1:
      case BlockItemTypeEnum.H2:
      case BlockItemTypeEnum.H3:
      case BlockItemTypeEnum.H4:
      case BlockItemTypeEnum.H5:
      case BlockItemTypeEnum.H6:
      case BlockItemTypeEnum.H7:
      case BlockItemTypeEnum.SUBTITLE1:
      case BlockItemTypeEnum.SUBTITLE2:
      case BlockItemTypeEnum.SUBTITLE3:
      case BlockItemTypeEnum.BODY1:
      case BlockItemTypeEnum.BODY2:
      case BlockItemTypeEnum.CAPTION: {
        return (
          <Box {...boxProps}>
            <Typography variant={type} {...titleProps}>
              {title}
            </Typography>
          </Box>
        )
      }
      case BlockItemTypeEnum.HTML: {
        const DynamicHtml = dynamic(() =>
          import('@gravis-os/ui').then((module) => module.Html)
        )
        return (
          <Box {...boxProps}>
            {title && <DynamicHtml html={title} {...titleProps} />}
          </Box>
        )
      }
      // Accordion
      case BlockItemTypeEnum.ACCORDION: {
        const DynamicAccordion = dynamic(() =>
          import('@gravis-os/ui').then((module) => module.Accordion)
        )
        return <DynamicAccordion items={title} transparent {...titleProps} />
      }
      // List
      case BlockItemTypeEnum.LIST: {
        const DynamicList = dynamic(() =>
          import('@gravis-os/ui').then((module) => module.List)
        )
        return <DynamicList items={title} {...titleProps} />
      }
      case BlockItemTypeEnum.JSX: {
        return <Box {...boxProps}>{title}</Box>
      }
      default: {
        return null
      }
    }
  }

  const childrenJsx = renderChildrenJsx()

  return childrenJsx
}

const renderGrid = (props) => {
  const {
    boxProps,
    containerProps,
    disableContainer,
    disableContainerOnMobile,
    gridItemProps: injectedGridItemProps,
    gridItems,
    gridProps,
    maxWidth,
    sx,
    titleProps, // Common title props
  } = props
  return (
    <Box sx={sx}>
      <Container
        disableContainer={disableContainer}
        disableContainerOnMobile={disableContainerOnMobile}
        maxWidth={maxWidth}
        {...containerProps}
      >
        <Box {...boxProps}>
          <Grid container spacing={{ xs: 2, md: 4 }} {...gridProps}>
            {gridItems.map((gridItem, i) => {
              const { boxProps, dialogProps, items, ...rest } = gridItem

              // Wrapper gridItem props abstracted for common use
              const gridItemProps = {
                xs: 12,
                md: true,
                item: true,
                key: `grid-item-${i}`,
                ...injectedGridItemProps, // Spread to all grid items
                ...rest,
                sx: {
                  ...injectedGridItemProps?.sx,
                  ...rest?.sx,
                },
              }

              // Inform dev to provide Griditem.items as it is required.
              if (!Array.isArray(items)) {
                throw new TypeError(
                  `GridItem.items need to be defined as an array for title: "${gridItem.title}".`
                )
              }

              // Render GridItem
              const childrenJsx = (
                <Grid {...gridItemProps}>
                  <Box {...boxProps}>
                    {items.map((item, j) => {
                      // Generate unique keys
                      const gridItemKey = `grid-${item?.type || ''}-${i}-${j}`

                      // Manage recursive grids
                      const hasNestedGridItems = Boolean(item?.gridItems)
                      if (hasNestedGridItems) {
                        return (
                          <React.Fragment key={`nested-${gridItemKey}`}>
                            {renderGrid({
                              ...item,
                              // Disable container for nested grids to avoid extra padding
                              containerProps: {
                                ...item.containerProps,
                                disableGutters: true,
                              },
                            })}
                          </React.Fragment>
                        )
                      }

                      return (
                        <React.Fragment key={gridItemKey}>
                          {renderBlockItem({
                            ...item,
                            titleProps: merge({}, titleProps, item?.titleProps),
                          })}
                        </React.Fragment>
                      )
                    })}
                  </Box>
                </Grid>
              )

              return (
                <React.Fragment key={`grid-item-wrapper-${i}`}>
                  {childrenJsx}
                  {dialogProps && <DynamicDialog {...dialogProps} />}
                </React.Fragment>
              )
            })}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

const renderStack = (props) => {
  const {
    containerProps,
    // Container
    maxWidth,

    stackItemProps: injectedStackItemProps,
    stackItems: injectedStackItems,
    stackProps,

    sx,
    titleProps,

    type,
  } = props

  const stackItems = injectedStackItems.filter(Boolean) || []

  return (
    <Box sx={sx}>
      <Container maxWidth={maxWidth} {...containerProps}>
        <Stack direction="row" spacing={1} {...stackProps}>
          {stackItems.map((stackItem, i) => {
            const { items, ...rest } = stackItem

            // StackItem is a Box
            // Wrapper stackItemProps abstracted for common use
            const stackItemProps = {
              fullWidthOnMobile: true,
              ...injectedStackItemProps, // Spread to all stack items
              ...rest,
            }

            // Inform dev to provide Stackitem.items as it is required.
            if (!Array.isArray(items)) {
              throw new TypeError(
                `StackItem.items need to be defined as an array for title: "${stackItem.title}".`
              )
            }

            return (
              <Box key={`stack-item-${i}`} {...stackItemProps}>
                {items.map((item, j) => {
                  // Generate unique keys
                  const stackItemKey = `stack-item-${
                    item?.type || ''
                  }-${i}-${j}`

                  // Manage recursive stacks
                  const hasNestedStackItems = Boolean(item?.stackItems)
                  if (hasNestedStackItems) {
                    return (
                      <Box key={`nested-${stackItemKey}`} {...stackItemProps}>
                        {renderStack(item)}
                      </Box>
                    )
                  }

                  return (
                    <React.Fragment key={stackItemKey}>
                      {renderBlockItem({
                        ...item,
                        titleProps: merge({}, titleProps, item?.titleProps),
                      })}
                    </React.Fragment>
                  )
                })}
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
    // Card
    cardItems,
    containerProps,

    disableContainer,

    disableContainerOnMobile,
    gridItemProps,
    gridItems,

    // Grid
    gridProps,
    maxWidth,
    // Palette
    mode,

    stackItemProps,

    stackItems,
    // Stack
    stackProps,
    sx,
    type,
  } = props

  const renderChildren = () => {
    switch (true) {
      case Boolean(type === BlockItemTypeEnum.STACK && stackItems): {
        return renderStack(props)
      }
      case Boolean(type === BlockItemTypeEnum.GRID && gridItems): {
        return renderGrid(props)
      }
      // Extension of GridItem actually, just with presets. Apple-like cards
      case Boolean(type === BlockItemTypeEnum.CARD && cardItems): {
        return renderGrid({
          ...props,
          gridItems: cardItems.map((cardItem) => ({
            boxProps: {
              stretch: true,
              ...cardItem.cardProps,
              sx: {
                backgroundColor: 'background.paper',
                borderRadius: 5,
                overflow: 'hidden',
                pb: 4,
                position: 'relative',
                pt: 6,
                ...cardItem.cardProps?.sx,
              },
            },
            ...cardItem,
          })),
          gridProps: { spacing: { xs: 3 }, ...gridProps },
        })
      }
      default: {
        const childrenJsx = renderBlockItem(props as BlockItemProps)
        return (
          <Container
            disableContainer={disableContainer}
            disableContainerOnMobile={disableContainerOnMobile}
            maxWidth={maxWidth as ContainerProps['maxWidth']}
            {...containerProps}
          >
            {childrenJsx}
          </Container>
        )
      }
    }
  }

  const childrenJsx = renderChildren()

  return withPaletteMode({
    mode,
  })(childrenJsx)
}

export default BlockItem
