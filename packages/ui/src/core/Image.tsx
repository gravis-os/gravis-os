import React from 'react'
import NextImage, { ImageProps as NextImageProps } from 'next/image'
import Box, { BoxProps } from './Box'

export interface ImageProps extends NextImageProps {
  disablePointerEvents?: boolean
  sx?: BoxProps['sx']
}

/**
 * @example https://image-component.nextjs.gallery/
 */
const Image: React.FC<ImageProps> = (props) => {
  const { sx, disablePointerEvents, ...rest } = props

  const boxProps = {
    sx: {
      ...(disablePointerEvents && {
        '> span': { pointerEvents: 'none' },
      }),
      ...(sx && {
        '& img': sx,
      }),
    } as BoxProps['sx'],
  }

  return (
    <Box {...boxProps}>
      <NextImage {...rest} />
    </Box>
  )
}

export default Image
