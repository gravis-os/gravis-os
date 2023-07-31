import React from 'react'
import {
  Box,
  BoxProps,
  Image,
  ImageProps,
  Stack,
  StackProps,
  Video,
  VideoProps,
} from '@gravis-os/ui'
import flowRight from 'lodash/flowRight'
import { withPaletteMode, WithPaletteModeProps } from '@gravis-os/theme'
import BlockItem, { BlockItemProps } from './BlockItem'
import getBlockPadding from './getBlockPadding'
import withBlockItemShorthand from './withBlockItemShorthand'

export interface BlockProps extends Omit<BoxProps, 'maxWidth'> {
  id?: string

  items?: BlockItemProps[]
  maxWidth?: BlockItemProps['maxWidth']
  containerProps?: BlockItemProps['containerProps']
  disableContainer?: BlockItemProps['disableContainer']
  disableContainerOnMobile?: BlockItemProps['disableContainerOnMobile']

  // Stack
  spacing?: StackProps['spacing']
  stackProps?: StackProps

  /**
   * Add a background image to the block
   *
   * Adapted from:
   * @link https://github.com/vercel/next.js/blob/canary/examples/image-component/pages/background.js
   * @link https://github.com/vercel/next.js/discussions/18357
   */
  backgroundImageProps?: ImageProps
  backgroundVideoProps?: VideoProps
  backgroundOverlayProps?: BoxProps
  backgroundOverlayOpacity?: number

  /**
   * Dark mode
   * Trigger MUI nesting behavior to invert the text colors
   * Used to invert the text colors to work on a dark colored background
   * @link https://mui.com/system/styles/advanced/#theme-nesting
   */
  dark?: boolean
  /**
   * Used for forcing dark/light mode
   */
  mode?: WithPaletteModeProps['mode']
}

const Block: React.FC<BlockProps> = (props) => {
  const {
    id,
    spacing,
    stackProps,
    pt,
    pb,
    py,
    items: injectedItems = [],
    sx,
    maxWidth,
    containerProps,
    disableContainer,
    disableContainerOnMobile,
    reveal = true,
    backgroundImageProps,
    backgroundVideoProps,
    backgroundOverlayOpacity,
    backgroundOverlayProps,
    dark,
    mode,
    ...rest
  } = props

  const hasBackgroundImage = Boolean(backgroundImageProps)
  const hasBackgroundVideo = Boolean(backgroundVideoProps)
  const hasBackgroundOverlay =
    backgroundOverlayOpacity || Boolean(backgroundOverlayProps)
  const defaultBackgroundColor = hasBackgroundVideo
    ? 'transparent'
    : 'background.default'

  const cleanedItems = injectedItems.filter(Boolean)
  const items = flowRight([withBlockItemShorthand()])(cleanedItems)

  const childrenJsx = (
    // Section layer
    <Box
      {...(id && { id })}
      sx={{
        ...((dark || mode === 'dark') && {
          backgroundColor: defaultBackgroundColor,
        }),
        color: 'text.primary',
        ...getBlockPadding({ pt, pb, py }),
        ...(hasBackgroundImage || hasBackgroundVideo
          ? { position: 'relative' }
          : { backgroundColor: defaultBackgroundColor }),
        ...sx,
      }}
      {...rest}
    >
      {/* Background Overlay */}
      {hasBackgroundOverlay && (
        <Box
          sx={{
            backgroundColor: 'black',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 0,
            opacity: backgroundOverlayOpacity || 0.25,
            ...backgroundOverlayProps?.sx,
          }}
        />
      )}

      {/* Background Image */}
      {hasBackgroundImage && <Image background {...backgroundImageProps} />}

      {/* Background video */}
      {hasBackgroundVideo && (
        <Video
          src={backgroundVideoProps.src}
          poster={backgroundVideoProps.poster}
          sx={{
            height: '100%',
            position: 'absolute',
            top: 0,
            zIndex: -1,
          }}
        />
      )}

      {/* Content */}
      <Box sx={{ width: '100%' }} reveal={reveal}>
        <Stack spacing={spacing} {...stackProps}>
          {items.map((item, i) => {
            return (
              <BlockItem
                key={`block-item-${i}`}
                maxWidth={maxWidth}
                containerProps={containerProps}
                disableContainer={disableContainer}
                disableContainerOnMobile={disableContainerOnMobile}
                {...item}
              />
            )
          })}
        </Stack>
      </Box>
    </Box>
  )

  return withPaletteMode({
    mode,
    dark,
  })(childrenJsx)
}

export default Block
