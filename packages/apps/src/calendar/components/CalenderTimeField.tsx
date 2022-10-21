import React from 'react'
import { Typography } from '@gravis-os/ui'
import dayjs from 'dayjs'
import { SlotLabelContentArg } from '@fullcalendar/common'

interface CalendarTimeFieldProps extends SlotLabelContentArg {}

const CalendarTimeField: React.FC<CalendarTimeFieldProps> = (props) => {
  const { date } = props

  return (
    <Typography variant="subtitle2" sx={{ fontWeight: 600, p: 1 }}>
      {dayjs(date).format('h A')}
    </Typography>
  )
}

export default CalendarTimeField
