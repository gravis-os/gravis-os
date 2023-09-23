import React, { FC } from 'react'

import { IconButton, Stack, StackProps, Typography } from '@gravis-os/ui'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import dayjs from 'dayjs'

import type { CalendarEventApi, CalendarEventDrawerDefs } from '../types'

import CalendarEventContent from './CalendarEventContent'
import CalendarEventDrawerSection from './CalendarEventDrawerSection'

interface CalendarDrawerProps extends StackProps {
  event?: CalendarEventApi
  eventDrawerDefs: CalendarEventDrawerDefs
  onClose?: () => void
}

const CalendarEventDrawer: FC<CalendarDrawerProps> = (props) => {
  const { event, eventDrawerDefs, onClose, ...rest } = props
  const { start } = event || {}

  return (
    <Stack
      {...rest}
      sx={{ borderColor: 'divider', borderLeft: '1px solid', ...rest?.sx }}
    >
      <Stack
        sx={{
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
          flexDirection: 'row',
          justifyContent: 'space-between',
          px: 2,
          py: 2.75,
        }}
      >
        <Typography sx={{ ml: 1 }} variant="h3">
          {dayjs(start).format('D MMMM YY, HH:mm A')}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseOutlinedIcon />
        </IconButton>
      </Stack>
      <Stack sx={{ gap: 3, p: 2 }}>
        {event && (
          <>
            <CalendarEventContent event={event} />
            {eventDrawerDefs.map((eventDrawerDef) => (
              <CalendarEventDrawerSection
                event={event}
                eventDrawerDef={eventDrawerDef}
                key={eventDrawerDef.name}
                sx={{ px: 0.5 }}
              />
            ))}
          </>
        )}
      </Stack>
    </Stack>
  )
}

export default CalendarEventDrawer
