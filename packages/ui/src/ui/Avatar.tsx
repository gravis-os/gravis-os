import React from 'react'
import {
  Avatar as MuiAvatar,
  AvatarProps as MuiAvatarProps,
} from '@mui/material'

export interface AvatarProps extends MuiAvatarProps {}

const Avatar: React.FC<AvatarProps> = props => {
  return <MuiAvatar {...props} />
}

export default Avatar
