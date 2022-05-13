import React from 'react'
import Avatar, { AvatarProps } from '../ui/Avatar'
import useGetStorageObject from './useGetStorageObject'

interface StorageAvatarProps extends AvatarProps {
  src?: string // defaultValue to render the image. Storage filepath where image is currently stored
  size?: number // Image size
  value?: string // Typically the form value
}

/**
 * A component that renders an image from a storage bucket.
 * @param props
 * @constructor
 *
 * @example <StorageAvatar src={item.avatar_src} alt={item.avatar_alt} />
 */
const StorageAvatar: React.FC<StorageAvatarProps> = props => {
  const { src: filePath, size = 64, value, alt } = props

  const { src } = useGetStorageObject({ filePath, value })

  return (
    <Avatar
      src={src}
      alt={alt || (src ? 'Avatar' : 'No image')}
      sx={{
        width: size,
        height: size,

        // Color
        backgroundColor: 'transparent',
        borderWidth: '1px',
        color: 'primary.main',
        borderStyle: src ? 'solid' : 'dashed',
        borderColor: src ? 'transparent' : 'primary.main',
      }}
    />
  )
}

export default StorageAvatar
