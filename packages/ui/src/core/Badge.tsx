import React from 'react'

import { Badge as MuiBadge, BadgeProps as MuiBadgeProps } from '@mui/material'

export interface BadgeProps extends MuiBadgeProps {}

const Badge: React.FC<BadgeProps> = (props) => {
  return <MuiBadge {...props} />
}

export default Badge
