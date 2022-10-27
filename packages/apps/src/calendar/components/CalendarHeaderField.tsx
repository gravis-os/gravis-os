import React, { FC } from 'react'
import { Box, Stack, Typography } from '@gravis-os/ui'
import dayjs from 'dayjs'
import { DayHeaderContentArg } from '@fullcalendar/common'
import { MONTH_VIEW } from '../constants'

interface CalendarHeaderColumnProps extends DayHeaderContentArg {}

const CalendarDefaultHeaderField: FC<CalendarHeaderColumnProps> = ({
  date,
}) => (
  <Stack sx={{ px: 1 }}>
    <Box>{dayjs(date).format('ddd')}</Box>
    <Typography variant="h3">{dayjs(date).format('D')}</Typography>
  </Stack>
)

const CalendarMonthViewHeaderField: React.FC<CalendarHeaderColumnProps> = ({
  date,
}) => (
  <Typography sx={{ fontWeight: 500, px: 1 }}>
    {dayjs(date).format('ddd')}
  </Typography>
)

const CalendarHeaderField: React.FC<CalendarHeaderColumnProps> = (
  props: CalendarHeaderColumnProps
) => {
  const { view } = props

  switch (view.type) {
    case MONTH_VIEW:
      return <CalendarMonthViewHeaderField {...props} />
    default:
      return <CalendarDefaultHeaderField {...props} />
  }
}

export default CalendarHeaderField
