import React from 'react'

import { SlotLabelContentArg } from '@fullcalendar/common'
import { Typography } from '@gravis-os/ui'
import dayjs from 'dayjs'

interface CalendarTimeFieldProps extends SlotLabelContentArg {}

const CalendarTimeField: React.FC<CalendarTimeFieldProps> = (props) => {
  const { date } = props

  return (
    <Typography sx={{ fontWeight: 600, p: 1 }} variant="subtitle2">
      {dayjs(date).format('h A')}
    </Typography>
  )
}

export default CalendarTimeField
