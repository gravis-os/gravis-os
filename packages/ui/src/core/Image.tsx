import React, { useState } from 'react'
import NextImage, { ImageProps as NextImageProps } from 'next/image'
import omit from 'lodash/omit'
import Box, { BoxProps } from './Box'

export interface ImageProps extends Omit<NextImageProps, 'loading'> {
  /**
   * The aspect ratio of the image
   * Needs to include a `:` character
   * @example '16:9'
   */
  ar?: string
  disablePointerEvents?: boolean
  disableResponsive?: boolean
  sx?: BoxProps['sx']
  containerSx?: BoxProps['sx']
  fadeOnHover?: boolean
  scaleOnHover?: boolean
  loading?: boolean
  rounded?: boolean
}

/**
 * @example https://image-component.nextjs.gallery/
 */
const Image: React.FC<ImageProps> = (props) => {
  const {
    loading: injectedLoading,
    ar,
    scaleOnHover,
    fadeOnHover,
    sx,
    containerSx,
    disablePointerEvents,
    disableResponsive,
    rounded,
    ...rest
  } = props
  const { src } = rest

  const empty = !src
  const [loading, setLoading] = useState(true)
  const [aspectWidth, aspectHeight] = ar?.split(':') || [1, 1]

  if (empty) {
    return (
      <Box
        sx={{
          ...(!disableResponsive
            ? { position: 'relative', overflow: 'hidden', pb: '100%' }
            : { width: rest?.width, height: rest?.height }),
          backgroundColor: ({ palette: { mode } }) => {
            const isDarkMode = mode === 'dark'
            return isDarkMode ? 'grey.900' : 'grey.100'
          },
        }}
      />
    )
  }

  const boxProps = {
    sx: {
      ...(disablePointerEvents && { '> span': { pointerEvents: 'none' } }),

      '& img': {
        // Transitions
        transition: ({ transitions }) =>
          transitions.create(['opacity', 'transform']),
        transform: loading ? 'scale(1.1)' : 'scale(1)',
        ...(fadeOnHover && { '&:hover': { opacity: 0.87 } }),
        ...(scaleOnHover && { '&:hover': { transform: 'scale(1.1)' } }),

        /**
         * Adds a blur effect to the image
         * Adapted from https://github.com/leerob/image-gallery-supabase-tailwind-nextjs/blob/main/pages/index.tsx
         */
        filter: loading ? 'blur(40px) grayscale(100%)' : 'blur(0) grayscale(0)',

        // Rounded adds border radius
        ...(rounded && { borderRadius: 1 }),

        ...sx,
      },

      // For blur effect
      ...(!disableResponsive && {
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        pb: `calc(${aspectHeight} / ${aspectWidth} * 100%)`,
      }),

      ...containerSx,
    } as BoxProps['sx'],
  }

  const imageProps = !disableResponsive
    ? {
        layout: 'fill' as NextImageProps['layout'],
        objectFit: 'cover' as NextImageProps['objectFit'],
        onLoadingComplete: () => setLoading(false),
        ...(omit(rest, ['width', 'height', 'loading']) as NextImageProps),
      }
    : rest

  return (
    <Box {...boxProps}>
      <NextImage {...imageProps} />
    </Box>
  )
}

export default Image
