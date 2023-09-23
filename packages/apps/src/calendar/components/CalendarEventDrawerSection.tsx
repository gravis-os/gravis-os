import React, { FC } from 'react'

import { Box, BoxProps, Typography } from '@gravis-os/ui'
import get from 'lodash/get'

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
  const { title, name, render } = eventDrawerDef

  const { extendedProps } = event
  const { data } = extendedProps

  const value = (get(data, name) as string) || FALLBACK_VALUE

  const child = render ? (
    render({ data, value })
  ) : (
    <Typography variant="subtitle1">{value}</Typography>
  )

  return (
    <Box {...rest}>
      <Typography color="neutral.300" fontWeight={400} variant="subtitle1">
        {title}
      </Typography>
      <>{child}</>
    </Box>
  )
}

export default CalendarEventDrawerSection
