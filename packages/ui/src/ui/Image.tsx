import React from 'react'
import NextImage, { ImageProps as NextImageProps } from 'next/image'

export interface ImageProps extends NextImageProps {}

/**
 * @example https://image-component.nextjs.gallery/
 */
const Image: React.FC<ImageProps> = (props) => {
  return <NextImage unoptimized {...props} />
}

export default Image
