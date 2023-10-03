import React, { FC } from 'react'

import { Box, Typography, TypographyProps } from '@gravis-os/ui'
import { darken } from '@mui/material/styles'
import dayjs from 'dayjs'

import type { CalendarEventApi } from '../types'

interface CalendarEventContentProps {
  event: CalendarEventApi
}

const CalendarEvenTypography = ({
  children,
  color = 'neutral.200',
  sx,
}: TypographyProps) => (
  <Typography
    color={color}
    sx={{
      lineHeight: 1.4,
      overflow: 'inherit',
      textOverflow: 'inherit',
      ...sx,
    }}
    variant="subtitle2"
  >
    {children}
  </Typography>
)

const CalendarEventContent: FC<CalendarEventContentProps> = (props) => {
  const { event } = props
  const { title, backgroundColor, extendedProps, start } = event
  const { subtitle } = extendedProps

  return (
    <Box
      sx={{
        backgroundColor,
        borderLeft: '4px solid',
        borderLeftColor: darken(backgroundColor, 0.3),
        borderRadius: 1,
        overflow: 'hidden',
        p: 1,
        textOverflow: 'ellipsis',
        width: '100%',
      }}
    >
      <CalendarEvenTypography color="neutral.200">
        {dayjs(start).format('h A')}
      </CalendarEvenTypography>
      <CalendarEvenTypography>{title}</CalendarEvenTypography>
      <CalendarEvenTypography>{subtitle}</CalendarEvenTypography>
    </Box>
  )
}

export default CalendarEventContent
