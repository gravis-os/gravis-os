import React from 'react'
import dynamic from 'next/dynamic'
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
import { withPaletteMode, WithPaletteModeProps } from '@gravis-os/theme'
import { BlockItemTypeEnum } from './constants'

const DynamicDialog = dynamic(() =>
  import('@gravis-os/ui').then((module) => module.Dialog)
)

export interface BlockItemProps extends Omit<BoxProps, 'title' | 'maxWidth'> {
  // BoxProps - Wrapper of a BlockItem
  boxProps?: BoxProps

  // DialogProps (only applicable in gridItems)
  dialogProps?: DialogProps

  // Container
  disableContainer?: boolean
  disableContainerOnMobile?: boolean
  containerProps?: ContainerProps
  maxWidth?: string | boolean // ContainerProps['maxWidth']

  // Grid
  gridProps?: GridProps
  gridItems?: Array<
    GridProps & { boxProps?: BoxProps; items: BlockItemProps[] }
  >
  gridItemProps?: GridProps

  // Stack
  stackProps?: StackProps
  stackItems?: Array<
    StackProps & { boxProps?: BoxProps; items: BlockItemProps[] }
  >
  stackItemProps?: StackProps

  // Card
  cardItems?: BlockItemProps[]
  cardProps?: CardProps

  // Palette
  mode?: WithPaletteModeProps['mode']

  // Core
  title?: React.ReactNode | React.ReactElement | any // Fix issue with Icon type
  titleProps?:
    | TypographyProps
    | Omit<Partial<ImageProps>, 'src'>
    | ButtonProps
    | LinkProps
    | DividerProps
    | AccordionProps
  type?: BlockItemTypeEnum | string

  // Background Video
  backgroundVideoProps?: VideoProps
}

const renderBlockItem = (props) => {
  const { boxProps, type, title, titleProps } = props

  const renderChildrenJsx = () => {
    if (!title) return null

    switch (type) {
      case BlockItemTypeEnum.OVERLINE:
      case BlockItemTypeEnum.OVERLINE2:
        return (
          <Box {...boxProps}>
            <Typography
              variant={type}
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
      case BlockItemTypeEnum.FA_ICON:
        return (
          <Box {...boxProps}>
            <Box component="i" className={title} {...titleProps} />
          </Box>
        )
      case BlockItemTypeEnum.DIVIDER:
        return (
          <Box {...boxProps}>
            <Divider {...titleProps} />
          </Box>
        )
      case BlockItemTypeEnum.BUTTON:
        const DynamicButton = dynamic(() =>
          import('@gravis-os/ui').then((module) => module.Button)
        )
        return (
          <Box {...boxProps}>
            <DynamicButton {...titleProps}>{title}</DynamicButton>
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
            <Image src={title} {...titleProps} />
          </Box>
        )
      case BlockItemTypeEnum.STORAGE_IMAGE:
        const DynamicStorageImage = dynamic(() =>
          import('@gravis-os/storage').then((module) => module.StorageImage)
        )
        return (
          <Box {...boxProps}>
            <DynamicStorageImage src={title} {...titleProps} />
          </Box>
        )
      case BlockItemTypeEnum.SVG:
        const InlineSvgComponent = title
        return (
          <Box {...boxProps}>
            <Box {...titleProps}>
              <InlineSvgComponent />
            </Box>
          </Box>
        )
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
      case BlockItemTypeEnum.CAPTION:
        return (
          <Box {...boxProps}>
            <Typography variant={type} {...titleProps}>
              {title}
            </Typography>
          </Box>
        )
      case BlockItemTypeEnum.HTML:
        const DynamicHtml = dynamic(() =>
          import('@gravis-os/ui').then((module) => module.Html)
        )
        return (
          <Box {...boxProps}>
            {title && <DynamicHtml html={title} {...titleProps} />}
          </Box>
        )
      // Accordion
      case BlockItemTypeEnum.ACCORDION:
        const DynamicAccordion = dynamic(() =>
          import('@gravis-os/ui').then((module) => module.Accordion)
        )
        return <DynamicAccordion transparent items={title} {...titleProps} />
      // List
      case BlockItemTypeEnum.LIST:
        const DynamicList = dynamic(() =>
          import('@gravis-os/ui').then((module) => module.List)
        )
        return <DynamicList items={title} {...titleProps} />
      case BlockItemTypeEnum.JSX:
        return <Box {...boxProps}>{title}</Box>
      default:
        return null
    }
  }

  const childrenJsx = renderChildrenJsx()

  return childrenJsx
}

const renderGrid = (props) => {
  const {
    boxProps,
    sx,
    gridItems,
    gridItemProps: injectedGridItemProps,
    gridProps,
    maxWidth,
    containerProps,
    disableContainer,
    disableContainerOnMobile,
    titleProps, // Common title props
  } = props
  return (
    <Box sx={sx}>
      <Container
        maxWidth={maxWidth}
        disableContainer={disableContainer}
        disableContainerOnMobile={disableContainerOnMobile}
        {...containerProps}
      >
        <Box {...boxProps}>
          <Grid container spacing={{ xs: 5, md: 10 }} {...gridProps}>
            {gridItems.map((gridItem, i) => {
              const { items, dialogProps, boxProps, ...rest } = gridItem

              // Wrapper gridItem props abstracted for common use
              const gridItemProps = {
                key: `grid-item-${i}`,
                item: true,
                xs: 12,
                md: true,
                ...injectedGridItemProps, // Spread to all grid items
                ...rest,
                sx: {
                  ...injectedGridItemProps?.sx,
                  ...rest?.sx,
                },
              }

              // Inform dev to provide Griditem.items as it is required.
              if (!Array.isArray(items)) {
                throw new Error(
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
    type,
    sx,

    stackItems: injectedStackItems,
    stackItemProps: injectedStackItemProps,
    stackProps,

    // Container
    maxWidth,
    containerProps,

    titleProps,
  } = props

  const stackItems = injectedStackItems.filter(Boolean) || []

  return (
    <Box sx={sx}>
      <Container maxWidth={maxWidth} {...containerProps}>
        <Stack spacing={1} direction="row" {...stackProps}>
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
              throw new Error(
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
    type,
    sx,

    // Palette
    mode,

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
    disableContainer,
    disableContainerOnMobile,
  } = props

  const renderChildren = () => {
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
        const childrenJsx = renderBlockItem(props as BlockItemProps)
        return (
          <Container
            maxWidth={maxWidth as ContainerProps['maxWidth']}
            disableContainer={disableContainer}
            disableContainerOnMobile={disableContainerOnMobile}
            {...containerProps}
          >
            {childrenJsx}
          </Container>
        )
    }
  }

  const childrenJsx = renderChildren()

  return withPaletteMode({
    mode,
  })(childrenJsx)
}

export default BlockItem
