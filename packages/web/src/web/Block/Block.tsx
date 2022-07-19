import React from 'react'
import { Theme } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import {
  ContainerProps,
  Box,
  BoxProps,
  Image,
  ImageProps,
  Stack,
  StackProps,
} from '@gravis-os/ui'
import BlockItem, { BlockItemProps } from './BlockItem'
import landingTheme from '../../themes/Landing/landingTheme'
import getBlockPadding, { BlockPadding } from './getBlockPadding'

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

  // Padding
  pt?: BlockPadding
  pb?: BlockPadding
  py?: BlockPadding
}

const Block: React.FC<BlockProps> = (props) => {
  const {
    spacing,
    stackProps,
    pt,
    pb,
    py,
    items,
    sx,
    maxWidth,
    containerProps,
    reveal = true,
    backgroundImageProps,
    dark,
    ...rest
  } = props

  const hasBackgroundImage = Boolean(backgroundImageProps)

  const childrenJsx = (
    // Section layer
    <Box
      sx={{
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
          layout="fill"
          objectFit="cover"
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

  // Dark mode wrapper activated by `dark` prop
  return dark ? (
    <ThemeProvider
      theme={(outerTheme: Theme) => {
        const innerTheme = {
          ...outerTheme,
          palette: {
            ...outerTheme.palette,
            /**
             * Set to dark mode with the default changes to dark mode palette
             * @link https://mui.com/material-ui/customization/dark-mode/#dark-mode-by-default
             * @note that mode: 'dark', does nothing because we're using a custom palette
             */
            mode: 'dark',
            text: landingTheme.dark.palette.text,
            background: landingTheme.dark.palette.background,
            divider: landingTheme.dark.palette.divider,
            action: landingTheme.dark.palette.action,
          },
        }

        return innerTheme
      }}
    >
      {childrenJsx}
    </ThemeProvider>
  ) : (
    childrenJsx
  )
}

export default Block
