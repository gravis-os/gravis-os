import React from 'react'

import { WithPaletteModeProps, withPaletteMode } from '@gravis-os/theme'
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

import BlockItem, { BlockItemProps } from './BlockItem'
import getBlockPadding from './getBlockPadding'
import withBlockItemShorthand from './withBlockItemShorthand'

export interface BlockProps extends Omit<BoxProps, 'maxWidth'> {
  /**
   * Add a background image to the block
   *
   * Adapted from:
   * @link https://github.com/vercel/next.js/blob/canary/examples/image-component/pages/background.js
   * @link https://github.com/vercel/next.js/discussions/18357
   */
  backgroundImageProps?: ImageProps

  backgroundOverlayOpacity?: number
  backgroundOverlayProps?: BoxProps
  backgroundVideoProps?: VideoProps
  containerProps?: BlockItemProps['containerProps']
  /**
   * Dark mode
   * Trigger MUI nesting behavior to invert the text colors
   * Used to invert the text colors to work on a dark colored background
   * @link https://mui.com/system/styles/advanced/#theme-nesting
   */
  dark?: boolean

  disableContainer?: BlockItemProps['disableContainer']
  disableContainerOnMobile?: BlockItemProps['disableContainerOnMobile']

  id?: string
  items?: BlockItemProps[]
  maxWidth?: BlockItemProps['maxWidth']
  /**
   * Used for forcing dark/light mode
   */
  mode?: WithPaletteModeProps['mode']

  // Stack
  spacing?: StackProps['spacing']
  stackProps?: StackProps
}

const Block: React.FC<BlockProps> = (props) => {
  const {
    id,
    backgroundImageProps,
    backgroundOverlayOpacity,
    backgroundOverlayProps,
    backgroundVideoProps,
    containerProps,
    dark,
    disableContainer,
    disableContainerOnMobile,
    items: injectedItems = [],
    maxWidth,
    mode,
    pb,
    pt,
    py,
    reveal = true,
    spacing,
    stackProps,
    sx,
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
        ...getBlockPadding({ pb, pt, py }),
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
            bottom: 0,
            left: 0,
            opacity: backgroundOverlayOpacity || 0.25,
            position: 'absolute',
            right: 0,
            top: 0,
            zIndex: 0,
            ...backgroundOverlayProps?.sx,
          }}
        />
      )}

      {/* Background Image */}
      {hasBackgroundImage && <Image background {...backgroundImageProps} />}

      {/* Background video */}
      {hasBackgroundVideo && (
        <Video
          poster={backgroundVideoProps.poster}
          src={backgroundVideoProps.src}
          sx={{
            height: '100%',
            position: 'absolute',
            top: 0,
            zIndex: -1,
          }}
        />
      )}

      {/* Content */}
      <Box reveal={reveal} sx={{ width: '100%' }}>
        <Stack spacing={spacing} {...stackProps}>
          {items.map((item, i) => {
            return (
              <BlockItem
                containerProps={containerProps}
                disableContainer={disableContainer}
                disableContainerOnMobile={disableContainerOnMobile}
                key={`block-item-${i}`}
                maxWidth={maxWidth}
                {...item}
              />
            )
          })}
        </Stack>
      </Box>
    </Box>
  )

  return withPaletteMode({
    dark,
    mode,
  })(childrenJsx)
}

export default Block
