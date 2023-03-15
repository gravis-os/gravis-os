import omit from 'lodash/omit'
import NextImage, { ImageProps as NextImageProps } from 'next/image'
import React, { useState } from 'react'
import Zoom from 'react-medium-image-zoom'
import { useGravis } from '@gravis-os/config'
import { ResponsiveStyleValue } from '@mui/system/styleFunctionSx'
import Box, { BoxProps } from './Box'

export interface ImageProps extends Omit<NextImageProps, 'loading'> {
  /**
   * The aspect ratio of the image
   * Needs to include a `:` character
   * @example '16:9'
   */
  ar?: string
  disableBlur?: boolean
  sx?: BoxProps['sx']
  containerSx?: BoxProps['sx']
  fadeOnHover?: boolean
  scaleOnHover?: boolean
  loading?: boolean
  rounded?: boolean
  zoom?: boolean
  /**
   * Use the original image dimensioms
   * @default false
   */
  fixed?: boolean
  /**
   * Use the image as a background photo
   * @default false
   */
  background?: boolean
  backgroundSx?: BoxProps['sx']
  backgroundHeight?: ResponsiveStyleValue<React.CSSProperties['height']>
  /**
   * Preserve the image size without scaling
   * @default false
   */
  fixedBackground?: boolean
  /**
   * Allow the image to fill the container
   * @default false
   */
  fill?: boolean
  /**
   * Fade the image in after it's loaded
   * @default false
   */
  fadeOnLoad?: boolean
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
    disableBlur,
    rounded,
    fixed,

    // Background
    background,
    backgroundHeight,
    backgroundSx,
    fixedBackground,

    fadeOnLoad: injectedFadeOnLoad,
    fill,
    zoom,
    ...rest
  } = props
  const { src } = rest

  const empty = !src
  const [loading, setLoading] = useState(injectedLoading ?? true)
  const [aspectWidth, aspectHeight] = ar?.split(':') || [1, 1]

  const fadeOnLoad = Boolean(injectedFadeOnLoad || background)

  if (empty) {
    return (
      <Box
        sx={{
          ...(ar
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

  const isNextImageFill = ar || fixed || fill || background
  const isNotBackgroundImage = !background && (fixed || fill)

  const boxProps = {
    sx: {
      ...(isNextImageFill && {
        '> span, > img': { pointerEvents: 'none' },
      }),

      // Transitions
      ...(!disableBlur && {
        transition: ({ transitions }) => {
          const opacityTransition = transitions.create(['opacity'], {
            easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
            duration: '3s',
            delay: '0.1s',
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
          width: 'initial !important',
          height: 'initial !important',
        }),

        /**
         * Fixed background
         */
        ...(fixedBackground && { position: 'static !important' }),

        ...sx,
      },

      // For blur effect
      ...(!fixed &&
        ar &&
        !fill && {
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          pb: `calc(${aspectHeight} / ${aspectWidth} * 100%)`,
        }),

      /**
       * Fill the image
       */
      ...((fixed || fill) && { '& span': { position: 'static !important' } }),

      /**
       * Fixed to position the image in a background
       */
      ...(fixedBackground && { position: 'absolute' }),

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

    // Source config
    const onUseGravis = useGravis()
    const { next } = onUseGravis

    switch (true) {
      case Boolean(isNextImageFill):
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
      default:
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
      <Zoom>{childrenJsx}</Zoom>
    </Box>
  ) : (
    childrenJsx
  )

  return backgroundHeight ? (
    <Box
      sx={{ position: 'relative', height: backgroundHeight, ...backgroundSx }}
    >
      {childrenJsxWithZoom}
    </Box>
  ) : (
    childrenJsxWithZoom
  )
}

export default Image
