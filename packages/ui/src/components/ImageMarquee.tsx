import React from 'react'
import ReactFastMarquee from 'react-fast-marquee'

import { Stack, StackProps } from '@mui/material'
import { alpha } from '@mui/material/styles'

import Box, { BoxProps } from '../core/Box'
import Image, { ImageProps } from '../core/Image'

export interface ReactFastMarqueeProps {
  /**
   * The children rendered inside the marquee
   * Type: ReactNode
   * Default: null
   */
  children?: React.ReactNode
  /**
   * Class name to style the container div
   * Type: string
   * Default: ""
   */
  className?: string
  /**
   * Duration to delay the animation after render, in seconds
   * Type: number
   * Default: 0
   */
  delay?: number
  /**
   * The direction the marquee is sliding
   * Type: "left" or "right"
   * Default: "left"
   */
  direction?: 'left' | 'right'
  /**
   * Whether to show the gradient or not
   * Type: boolean
   * Default: true
   */
  gradient?: boolean
  /**
   * The rgb color of the gradient as an array of length 3
   * Type: Array<number> of length 3
   * Default: [255, 255, 255]
   */
  gradientColor?: [number, number, number]
  /**
   * The width of the gradient on either side
   * Type: string
   * Default: 200
   */
  gradientWidth?: number | string
  /**
   * The number of times the marquee should loop, 0 is equivalent to infinite
   * Type: number
   * Default: 0
   */
  loop?: number
  /**
   * A callback for when the marquee finishes a loop. Does not call if maximum loops are reached (use onFinish instead).
   * Type: Function
   * Default: null
   */
  onCycleComplete?: () => void
  /**
   * A callback for when the marquee finishes scrolling and stops. Only calls if loop is non-zero.
   * Type: Function
   * Default: null
   */
  onFinish?: () => void
  /**
   * Whether to pause the marquee when clicked
   * Type: boolean
   * Default: false
   */
  pauseOnClick?: boolean
  /**
   * Whether to pause the marquee when hovered
   * Type: boolean
   * Default: false
   */
  pauseOnHover?: boolean
  /**
   * Whether to play or pause the marquee
   * Type: boolean
   * Default: true
   */
  play?: boolean
  /**
   * Speed calculated as pixels/second
   * Type: number
   * Default: 20
   */
  speed?: number
  /**
   * Inline style for the container div
   * Type: object
   * Default: {}
   */
  style?: React.CSSProperties
}

const getWidth = (size: ImageMarqueeProps['size']) => {
  switch (size) {
    case 'lg': {
      return 640
    }
    case 'sm': {
      return 360
    }
    default: {
      return 480
    }
  }
}

const getGutterMultiplier = (size: ImageMarqueeProps['size']) => {
  switch (size) {
    case 'lg': {
      return 2
    }
    case 'sm': {
      return 1
    }
    default: {
      return 1
    }
  }
}

export interface ImageMarqueeProps extends ReactFastMarqueeProps {
  aspectRatio?: number
  center?: boolean
  imageProps?: Omit<ImageProps, 'alt' | 'src'>
  items: Array<{ key?: React.Key } & ImageProps>
  py?: StackProps['py']
  reverse?: boolean
  size?: 'lg' | 'md' | 'sm' | string

  // Stack
  spacing?: StackProps['spacing']
  sx?: BoxProps['sx']
}

const ImageMarquee: React.FC<ImageMarqueeProps> = (props) => {
  const {
    aspectRatio = 1.752_293_58,
    center = true,
    imageProps: injectedImageProps,
    items,
    py,
    reverse,
    size = 'md',
    spacing,
    sx,
    ...rest
  } = props

  const { gradient, gradientColor } = rest

  // Calculate width
  const width = getWidth(size)
  const gutterMultiplier = getGutterMultiplier(size)

  const imageProps = {
    height: width / aspectRatio,
    width,
    ...injectedImageProps,
  }

  const marqueeProps = {
    ...rest,
    ...(reverse && { direction: 'right' }),
  }

  // Calculate the margin
  const mx = spacing || 2 * gutterMultiplier

  // Empty guard
  if (!items?.length) return null

  return (
    <Box
      sx={{
        // Set gradientColor automatically from palette.background.default
        ...(gradient &&
          !gradientColor && {
            '& .overlay::before, & .overlay::after': {
              background: ({ palette }) => {
                const gradientColor = palette.background.default
                return `linear-gradient(to right, ${alpha(
                  gradientColor,
                  1
                )}, ${alpha(gradientColor, 0)})`
              },
            },
          }),

        ...sx,
      }}
    >
      <ReactFastMarquee
        gradient={false}
        pauseOnClick
        speed={20}
        style={{ paddingRight: 8 * gutterMultiplier }}
        {...(marqueeProps as ReactFastMarqueeProps)}
      >
        <Stack direction="row" mr={mx} py={py} spacing={mx}>
          {items.map((item) => {
            const { key, ...itemRest } = item
            const { alt } = itemRest
            return (
              <Image
                center={center}
                key={key || alt}
                {...imageProps}
                {...itemRest}
                sx={
                  {
                    ...imageProps?.sx,
                    ...itemRest?.sx,
                  } as ImageProps['sx']
                }
              />
            )
          })}
        </Stack>
      </ReactFastMarquee>
    </Box>
  )
}

export default ImageMarquee
