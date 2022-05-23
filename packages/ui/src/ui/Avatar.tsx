import React from 'react'
import {
  Avatar as MuiAvatar,
  AvatarProps as MuiAvatarProps,
} from '@mui/material'

export interface AvatarProps extends MuiAvatarProps {
  size?: number
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const { size, sx, ...rest } = props

  return (
    <MuiAvatar
      sx={{
        ...(size && { width: size, height: size }),
        ...sx,
      }}
      {...rest}
    />
  )
}

export default Avatar
