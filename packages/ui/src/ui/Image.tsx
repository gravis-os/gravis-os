import React from 'react'
import NextImage, { ImageProps as NextImageProps } from 'next/image'
import Box from './Box'

export interface ImageProps extends NextImageProps {
  disablePointerEvents?: boolean
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
      ...sx,
    },
  }

  return (
    <Box {...boxProps}>
      <NextImage unoptimized {...rest} />
    </Box>
  )
}

export default Image
