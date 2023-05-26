import React from 'react'
import {
  Card,
  CardProps,
  setThemeColor,
  Stack,
  Typography,
} from '@gravis-os/ui'
import posConfig from './posConfig'

export interface PosAppCardProps extends CardProps {
  iconElement?: React.ElementType
  title: string
  color?: string
}

const PosAppCard: React.FC<PosAppCardProps> = (props) => {
  const { color, iconElement: Icon, title, sx, ...rest } = props

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
        sx={{ minHeight: posConfig.appCardMinHeight }}
        justifyContent="space-between"
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
            variant="h4"
            sx={{
              ...(color && {
                color: setThemeColor(`${color}.main`),
              }),
            }}
          >
            {title}
          </Typography>
        </div>
      </Stack>
    </Card>
  )
}

export default PosAppCard
