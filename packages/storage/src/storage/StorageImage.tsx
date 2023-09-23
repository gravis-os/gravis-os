import React from 'react'

import { Image, ImageProps } from '@gravis-os/ui'

import useGetStorageObject from './useGetStorageObject'

interface StorageImageProps extends Omit<ImageProps, 'alt' | 'src'> {
  alt?: null | string
  src?: null | string // defaultValue to render the image. Storage filepath where image is currently stored
  value?: string // Typically, the form value
}

/**
 * A component that renders an image from a storage bucket.
 * @param props
 * @constructor
 *
 * @example <StorageImage src={item.hero_src} alt={item.hero_alt} />
 */
const StorageImage: React.FC<StorageImageProps> = (props) => {
  const { alt, src: injectedSrc, value, ...rest } = props

  const isBucketPath =
    typeof injectedSrc === 'string' && injectedSrc.startsWith('public')

  const { src } = useGetStorageObject({
    filePath: injectedSrc,
    skip: !isBucketPath,
    value,
  })

  return (
    <Image
      alt={alt || (src ? 'Image' : 'No image')}
      src={isBucketPath ? src : injectedSrc}
      {...rest}
    />
  )
}

export default StorageImage
