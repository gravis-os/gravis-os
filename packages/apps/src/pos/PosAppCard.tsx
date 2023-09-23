import React from 'react'

import {
  Card,
  CardProps,
  Stack,
  Typography,
  setThemeColor,
} from '@gravis-os/ui'

import posConfig from './posConfig'

export interface PosAppCardProps extends CardProps {
  color?: string
  iconElement?: React.ElementType
  title: string
}

const PosAppCard: React.FC<PosAppCardProps> = (props) => {
  const { title, color, iconElement: Icon, sx, ...rest } = props

  return (
    <Card
      sx={{
        ...(color && {
          backgroundColor: setThemeColor(`${color}.light`),
        }),

        ...sx,
      }}
      {...rest}
    >
      <Stack
        justifyContent="space-between"
        sx={{ minHeight: posConfig.appCardMinHeight }}
      >
        {/* Icon */}
        <Icon
          sx={{
            fontSize: 'h2.fontSize',

            ...(color && {
              color: setThemeColor(`${color}.main`),
            }),
          }}
        />

        {/* Text */}
        <div>
          <Typography
            sx={{
              ...(color && {
                color: setThemeColor(`${color}.main`),
              }),
            }}
            variant="h4"
          >
            {title}
          </Typography>
        </div>
      </Stack>
    </Card>
  )
}

export default PosAppCard
