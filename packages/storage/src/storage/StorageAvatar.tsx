import React from 'react'

import { Avatar, AvatarProps } from '@gravis-os/ui'

import useGetStorageObject from './useGetStorageObject'

interface StorageAvatarProps extends Omit<AvatarProps, 'alt'> {
  alt?: null | string
  size?: number // Image size
  src?: null | string // defaultValue to render the image. Storage filepath where image is currently stored
  value?: string // Typically, the form value
}

/**
 * A component that renders an image from a storage bucket.
 * @param props
 * @constructor
 *
 * @example <StorageAvatar src={item.avatar_src} alt={item.avatar_alt} />
 */
const StorageAvatar: React.FC<StorageAvatarProps> = (props) => {
  const { alt, size = 64, src: injectedSrc, value, ...rest } = props

  const { src } = useGetStorageObject({ filePath: injectedSrc, value })

  return <Avatar alt={alt} size={size} src={src} {...rest} />
}

export default StorageAvatar
