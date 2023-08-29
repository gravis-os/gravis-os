import React from 'react'
import { Image, ImageProps } from '@gravis-os/ui'
import useGetStorageObject from './useGetStorageObject'

interface StorageImageProps extends Omit<ImageProps, 'alt' | 'src'> {
  src?: string | null // defaultValue to render the image. Storage filepath where image is currently stored
  alt?: string | null
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
  const { src: injectedSrc, value, alt, ...rest } = props

  const isAbsolutePath = !/^public.+/.test(injectedSrc)

  const { src } = useGetStorageObject({
    filePath: injectedSrc,
    value,
    skip: isAbsolutePath,
  })

  return (
    <Image
      src={isAbsolutePath ? injectedSrc : src}
      alt={alt || (src ? 'Image' : 'No image')}
      {...rest}
    />
  )
}

export default StorageImage
