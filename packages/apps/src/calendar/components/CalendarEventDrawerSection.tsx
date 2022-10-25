import React, { FC } from 'react'
import { Box, BoxProps, Typography } from '@gravis-os/ui'
import { get } from 'lodash'
import type { CalendarEventApi, CalendarEventDrawerDef } from '../types'

interface CalendarEventDrawerSectionProps extends BoxProps {
  event: CalendarEventApi
  eventDrawerDef: CalendarEventDrawerDef
}

const FALLBACK_VALUE = '-'

const CalendarEventDrawerSection: FC<CalendarEventDrawerSectionProps> = (
  props
) => {
  const { event, eventDrawerDef, ...rest } = props
  const { extendedProps } = event
  const { data } = extendedProps

  const value = (get(data, eventDrawerDef.name) as string) || FALLBACK_VALUE

  return (
    <Box {...rest}>
      <Typography color="neutral.300" fontWeight={400} variant="subtitle1">
        {eventDrawerDef.title}
      </Typography>
      <Typography variant="subtitle1">{value}</Typography>
    </Box>
  )
}

export default CalendarEventDrawerSection
