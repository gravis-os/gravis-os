import React from 'react'
import {
  Box,
  BoxProps,
  ContainerProps,
  Image,
  ImageProps,
  Stack,
  StackProps,
} from '@gravis-os/ui'
import flowRight from 'lodash/flowRight'
import { withPaletteMode, WithPaletteModeProps } from '@gravis-os/theme'
import BlockItem, { BlockItemProps } from './BlockItem'
import getBlockPadding, { BlockPadding } from './getBlockPadding'
import withBlockItemShorthand from './withBlockItemShorthand'

export interface BlockProps
  extends Omit<BoxProps, 'maxWidth' | 'pt' | 'pb' | 'py'> {
  items: BlockItemProps[]
  maxWidth?: BlockItemProps['maxWidth']
  containerProps?: ContainerProps

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

  // Padding
  pt?: BlockPadding
  pb?: BlockPadding
  py?: BlockPadding

  id?: string
}

const Block: React.FC<BlockProps> = (props) => {
  const {
    id,
    spacing,
    stackProps,
    pt,
    pb,
    py,
    items: injectedItems,
    sx,
    maxWidth,
    containerProps,
    reveal = true,
    backgroundImageProps,
    dark,
    mode,
    ...rest
  } = props

  const hasBackgroundImage = Boolean(backgroundImageProps)

  const items = flowRight([withBlockItemShorthand()])(injectedItems)

  const childrenJsx = (
    // Section layer
    <Box
      id={id}
      sx={{
        ...((dark || mode === 'dark') && {
          backgroundColor: 'background.default',
        }),
        color: 'text.primary',
        ...getBlockPadding({ pt, pb, py }),
        ...(hasBackgroundImage
          ? { position: 'relative' }
          : { backgroundColor: 'background.default' }),
        ...sx,
      }}
      {...rest}
    >
      {/* Background Image */}
      {hasBackgroundImage && (
        <Image
          background
          fadeOnLoad
          disableResponsive
          disablePointerEvents
          {...backgroundImageProps}
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
                {...item}
              />
            )
          })}
        </Stack>
      </Box>
    </Box>
  )

  return withPaletteMode({
    mode: mode || ((dark && 'dark') as WithPaletteModeProps['mode']),
  })(childrenJsx)
}

export default Block
