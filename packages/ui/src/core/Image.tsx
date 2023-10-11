'use client'
import type { ResponsiveStyleValue } from '@mui/system/styleFunctionSx'

import React, { useState } from 'react'

import { useGravis } from '@gravis-os/config'
import omit from 'lodash/omit'
import dynamic from 'next/dynamic'
import NextImage, { ImageProps as NextImageProps } from 'next/image'

import Box, { BoxProps } from './Box'

const DynamicZoom = dynamic(() => import('react-medium-image-zoom'))

export interface ImageProps extends Omit<NextImageProps, 'loading'> {
  /**
   * The aspect ratio of the image
   * Needs to include a `:` character
   * @example '16:9'
   */
  ar?: string
  /**
   * Use the image as a background photo
   * @default false
   */
  background?: boolean
  backgroundHeight?: ResponsiveStyleValue<React.CSSProperties['height']>
  backgroundSx?: BoxProps['sx']
  boxProps?: BoxProps
  boxSx?: BoxProps['sx']
  center?: boolean
  disableBlur?: boolean
  fadeOnHover?: boolean
  /**
   * Fade the image in after it's loaded
   * @default false
   */
  fadeOnLoad?: boolean
  /**
   * Allow the image to fill the container
   * @default false
   */
  fill?: boolean
  /**
   * Use the original image dimensioms
   * @default false
   */
  fixed?: boolean
  /**
   * Preserve the image size without scaling
   * @default false
   */
  fixedBackground?: boolean
  invertImage?: boolean
  invertImageOnMode?: 'dark' | 'light'
  loading?: boolean
  rounded?: boolean
  scaleOnHover?: boolean
  sx?: BoxProps['sx']
  zoom?: boolean
}

/**
 * Important: Add the following to your _app.tsx file to get the zoom effect
 * import 'react-medium-image-zoom/dist/styles.css'
 * @example https://image-component.nextjs.gallery/
 */
const Image: React.FC<ImageProps> = (props) => {
  const {
    ar,
    // Background
    background,
    backgroundHeight,
    backgroundSx,
    boxProps: injectedBoxProps,
    boxSx,
    center,
    disableBlur,
    fadeOnHover,
    fadeOnLoad: injectedFadeOnLoad,

    fill,
    fixed,
    fixedBackground,
    invertImage,

    // Invert Filter
    invertImageOnMode,
    loading: injectedLoading,
    rounded,

    scaleOnHover,

    sx,
    zoom,

    ...rest
  } = props
  const { height, src, width } = rest || {}

  const empty = !src
  const [loading, setLoading] = useState(injectedLoading ?? true)
  const [aspectWidth, aspectHeight] = ar?.split(':') || [1, 1]

  const fadeOnLoad = Boolean(injectedFadeOnLoad || background)

  // Source config
  const onUseGravis = useGravis()
  const { next } = onUseGravis

  if (empty) {
    return (
      <Box
        sx={{
          ...(ar
            ? { overflow: 'hidden', pb: '100%', position: 'relative' }
            : { height, width }),
          backgroundColor: ({ palette: { mode } }) => {
            const isDarkMode = mode === 'dark'
            return isDarkMode ? 'grey.900' : 'grey.100'
          },
        }}
      />
    )
  }

  const isNextImageFill = ar || fixed || fill || background
  const isNotBackgroundImage = !background && (fixed || fill)

  const boxProps = {
    ...injectedBoxProps,
    sx: {
      ...(isNextImageFill && {
        '> span, > img': { pointerEvents: 'none' },
      }),

      // Transitions
      ...(!disableBlur && {
        transition: ({ transitions }) => {
          const opacityTransition = transitions.create(['opacity'], {
            delay: '0.1s',
            duration: '3s',
            easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
          })

          const transformTransition = transitions.create(['transform'])

          const nextTransitions: string[] = [
            opacityTransition,
            ...(scaleOnHover ? [transformTransition] : []),
          ]

          return nextTransitions.join(',')
        },

        ...(scaleOnHover && {
          transform:
            loading && !isNotBackgroundImage ? 'scale(1.1)' : 'scale(1)',
        }),

        ...(fadeOnLoad && { opacity: loading ? 0 : 1 }),
      }),
      ...(fadeOnHover && { '&:hover': { opacity: 0.87 } }),
      ...(scaleOnHover && { '&:hover': { transform: 'scale(1.1)' } }),

      '& img': {
        ...(isNextImageFill && { objectFit: 'cover' }),

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
        ...(isNotBackgroundImage && { position: 'relative !important' }),

        ...(fixed && {
          height: 'initial !important',
          width: 'initial !important',
        }),

        /**
         * Fixed background
         */
        ...(fixedBackground && { position: 'static !important' }),

        /**
         *  Invert the image color based on palette mode
         */
        ...(invertImageOnMode && {
          filter: ({ palette: { mode } }) =>
            `invert(${mode === invertImageOnMode ? '1' : '0'})`,
        }),
        ...(invertImage && { filter: 'invert(1)' }),

        ...sx,
      },

      // For blur effect
      ...(!fixed &&
        ar &&
        !fill && {
          overflow: 'hidden',
          pb: `calc(${aspectHeight} / ${aspectWidth} * 100%)`,
          position: 'relative',
          width: '100%',
        }),

      /**
       * Fill the image
       */
      ...((fixed || fill) && { '& span': { position: 'static !important' } }),

      /**
       * Fixed to position the image in a background
       */
      ...(fixedBackground && { position: 'absolute' }),

      // Center the image
      ...(center && {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }),

      ...boxSx,
      ...injectedBoxProps?.sx,
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
      case Boolean(isNextImageFill): {
        return {
          ...(next.version >= 13
            ? { fill: true }
            : {
                layout: 'fill' as NextImageProps['layout'],
                objectFit: 'cover' as NextImageProps['objectFit'],
              }),
          ...commonProps,
          ...nextRest,
        }
      }
      default: {
        return {
          ...(next.version >= 13
            ? {}
            : {
                layout: 'fixed' as NextImageProps['layout'],
              }),
          ...commonProps,
          // Contains width and height
          ...rest,
        }
      }
    }
  }

  const imageProps = getImageProps()

  const childrenJsx = (
    <Box {...boxProps}>
      <NextImage {...imageProps} />
    </Box>
  )

  const childrenJsxWithZoom = zoom ? (
    <Box
      sx={{
        // Offset the default css injected display from the Zoom lib
        '& [data-rmiz-wrap="visible"], & [data-rmiz-wrap="hidden"]': {
          display: 'block',
        },
      }}
    >
      <DynamicZoom>{childrenJsx}</DynamicZoom>
    </Box>
  ) : (
    childrenJsx
  )

  return backgroundHeight ? (
    <Box
      sx={{ height: backgroundHeight, position: 'relative', ...backgroundSx }}
    >
      {childrenJsxWithZoom}
    </Box>
  ) : (
    childrenJsxWithZoom
  )
}

export default Image
