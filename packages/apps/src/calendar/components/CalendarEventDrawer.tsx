import React, { FC } from 'react'
import { IconButton, Stack, StackProps, Typography } from '@gravis-os/ui'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import dayjs from 'dayjs'
import CalendarEventContent from './CalendarEventContent'
import CalendarEventDrawerSection from './CalendarEventDrawerSection'
import type { CalendarEventApi, CalendarEventDrawerDefs } from '../types'

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
      sx={{ borderLeft: '1px solid', borderColor: 'divider', ...rest?.sx }}
    >
      <Stack
        sx={{
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
          flexDirection: 'row',
          justifyContent: 'space-between',
          py: 2.75,
          px: 2,
        }}
      >
        <Typography variant="h3" sx={{ ml: 1 }}>
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
                key={eventDrawerDef.name}
                event={event}
                eventDrawerDef={eventDrawerDef}
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
