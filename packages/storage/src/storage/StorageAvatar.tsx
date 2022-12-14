import React from 'react'
import { Avatar, AvatarProps } from '@gravis-os/ui'
import useGetStorageObject from './useGetStorageObject'

interface StorageAvatarProps extends Omit<AvatarProps, 'alt'> {
  src?: string | null // defaultValue to render the image. Storage filepath where image is currently stored
  size?: number // Image size
  value?: string // Typically, the form value
  alt?: string | null
}

/**
 * A component that renders an image from a storage bucket.
 * @param props
 * @constructor
 *
 * @example <StorageAvatar src={item.avatar_src} alt={item.avatar_alt} />
 */
const StorageAvatar: React.FC<StorageAvatarProps> = (props) => {
  const { src: injectedSrc, size = 64, value, alt, ...rest } = props

  const { src } = useGetStorageObject({ filePath: injectedSrc, value })

  return <Avatar src={src} alt={alt} size={size} {...rest} />
}

export default StorageAvatar
