import React from 'react'
import {
  Avatar as MuiAvatar,
  AvatarProps as MuiAvatarProps,
} from '@mui/material'
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined'

export interface AvatarProps extends MuiAvatarProps {
  size?: number
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const { size, sx, ...rest } = props
  const { src, children } = rest

  // Size
  const sizeSx = size && { width: size, height: size }
  const fallbackIconSizeSx =
    size &&
    Object.entries(sizeSx).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value * 0.6 }),
      {}
    )

  // Common props
  const avatarProps = { sx: { ...sizeSx, ...sx }, ...rest }

  // Force fallback image as MUI default fallback only occurs when src onError
  // and doesn't occur when src is falsey.
  if (!src) {
    return (
      <MuiAvatar {...avatarProps}>
        {children || (
          <PhotoSizeSelectActualOutlinedIcon sx={{ ...fallbackIconSizeSx }} />
        )}
      </MuiAvatar>
    )
  }

  // Default render
  return <MuiAvatar {...avatarProps} />
}

export default Avatar
