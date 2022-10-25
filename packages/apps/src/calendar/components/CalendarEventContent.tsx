import React, { FC } from 'react'
import { Box, Typography, TypographyProps } from '@gravis-os/ui'
import dayjs from 'dayjs'
import { darken } from '@mui/system'
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
    variant="subtitle2"
    sx={{
      overflow: 'inherit',
      textOverflow: 'inherit',
      lineHeight: 1.4,
      ...sx,
    }}
  >
    {children}
  </Typography>
)

const CalendarEventContent: FC<CalendarEventContentProps> = (props) => {
  const { event } = props
  const { backgroundColor, extendedProps, start, title } = event
  const { subtitle } = extendedProps

  return (
    <Box
      sx={{
        backgroundColor,
        borderRadius: 1,
        borderLeft: '4px solid',
        borderLeftColor: darken(backgroundColor, 0.3),
        p: 1,
        textOverflow: 'ellipsis',
        width: '100%',
        overflow: 'hidden',
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
