import omit from 'lodash/omit'
import NextImage, { ImageProps as NextImageProps } from 'next/image'
import React, { useState } from 'react'
import Zoom from 'react-medium-image-zoom'
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
  disableBlur?: boolean
  sx?: BoxProps['sx']
  containerSx?: BoxProps['sx']
  fadeOnHover?: boolean
  scaleOnHover?: boolean
  loading?: boolean
  rounded?: boolean
  fill?: boolean
  zoom?: boolean
}

/**
 * Important: Add the following to your _app.tsx file to get the zoom effect
 * import 'react-medium-image-zoom/dist/styles.css'
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
    disableBlur,
    rounded,
    fill,
    zoom,
    ...rest
  } = props
  const { src } = rest

  const empty = !src
  const [loading, setLoading] = useState(injectedLoading ?? true)
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
        ...(!disableBlur && {
          transition: ({ transitions }) =>
            transitions.create(['opacity', 'transform']),
          transform: loading ? 'scale(1.1)' : 'scale(1)',
          ...(fadeOnHover && { '&:hover': { opacity: 0.87 } }),
          ...(scaleOnHover && { '&:hover': { transform: 'scale(1.1)' } }),
        }),

        /**
         * Adds a blur effect to the image
         * Adapted from https://github.com/leerob/image-gallery-supabase-tailwind-nextjs/blob/main/pages/index.tsx
         */
        ...(!disableBlur && {
          filter: loading
            ? 'blur(40px) grayscale(100%)'
            : 'blur(0) grayscale(0)',
        }),

        // Rounded adds border radius
        ...(rounded && { borderRadius: 1 }),

        /**
         * Fill the image
         * Need to be important to override NextJS image inline style
         */
        ...(fill && {
          width: 'initial !important',
          height: 'initial !important',
          position: 'static !important',
        }),

        ...sx,
      },

      // For blur effect
      ...(!fill &&
        !disableResponsive && {
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          pb: `calc(${aspectHeight} / ${aspectWidth} * 100%)`,
        }),

      /**
       * Fill the image
       */
      ...(fill && { '& span': { position: 'static !important' } }),

      ...containerSx,
    } as BoxProps['sx'],
  }

  const getImageProps = () => {
    const commonProps = {
      onLoadingComplete: () => setLoading(false),
    }

    const nextRest = omit(rest, [
      'width',
      'height',
      'loading',
    ]) as NextImageProps

    switch (true) {
      case Boolean(fill):
        return {
          layout: 'fill' as NextImageProps['layout'],
          objectFit: 'cover' as NextImageProps['objectFit'],
          ...commonProps,
          ...nextRest,
        }
      case Boolean(!disableResponsive):
        return {
          layout: 'fill' as NextImageProps['layout'],
          objectFit: 'cover' as NextImageProps['objectFit'],
          ...commonProps,
          ...nextRest,
        }
      default:
        return {
          layout: 'fixed' as NextImageProps['layout'],
          ...commonProps,
          // Contains width and height
          ...rest,
        }
    }
  }

  const imageProps = getImageProps()

  const childrenJsx = (
    <Box {...boxProps}>
      <NextImage {...imageProps} />
    </Box>
  )

  // Render
  return zoom ? <Zoom>{childrenJsx}</Zoom> : childrenJsx
}

export default Image
