import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import type { EventClickArg } from '@fullcalendar/react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'
import timelinePlugin from '@fullcalendar/timeline'
import type { Theme } from '@mui/material'
import { useMediaQuery } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Box, Stack } from '@gravis-os/ui'
import { CalendarOptions } from '@fullcalendar/common'
import { isEmpty } from 'lodash'
import {
  createCalendarTheme,
  DEFAULT_DRAWER_WIDTH,
} from '../createCalendarTheme'
import CalendarEventDrawer from './CalendarEventDrawer'
import CalendarHeaderField from './CalendarHeaderField'
import CalendarTimeField from './CalenderTimeField'
import CalendarEventContent from './CalendarEventContent'
import { CalendarToolbar } from './CalendarToolbar'
import type {
  CalendarEvent,
  CalendarEventDrawerDefs,
  CalendarView,
} from '../types'
import { DAY_VIEW, WEEK_VIEW } from '../constants'

interface CalendarDrawerState {
  isOpen: boolean
  eventId?: string
}

interface CalendarProps extends Omit<CalendarOptions, 'events'> {
  events: CalendarEvent[]
  eventDrawerDefs: CalendarEventDrawerDefs
}

const FullCalendarWrapper = styled('div')(createCalendarTheme)

const Calendar: FC<CalendarProps> = (props) => {
  const { events, eventDrawerDefs, ...calendarProps } = props

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  const calendarRef = useRef<FullCalendar | null>(null)
  const calendarApi = calendarRef.current?.getApi()

  const [date, setDate] = useState<Date>(new Date())
  const [view, setView] = useState<CalendarView>(smDown ? DAY_VIEW : WEEK_VIEW)

  const [drawer, setDrawer] = useState<CalendarDrawerState>({
    isOpen: false,
  })

  const selectedEvent = calendarRef?.current
    ?.getApi()
    .getEventById(drawer.eventId || '')

  const drawerWidth = isEmpty(selectedEvent) ? '0%' : DEFAULT_DRAWER_WIDTH

  const handleResize = useCallback(() => {
    if (calendarApi) {
      const newView = smDown ? 'timeGridDay' : 'dayGridMonth'

      calendarApi.changeView(newView)
      setView(newView)
    }
  }, [calendarRef, smDown])

  useEffect(() => {
    handleResize()
  }, [handleResize, smDown])

  const handleDateToday = () => {
    if (calendarApi) {
      calendarApi.today()
      setDate(calendarApi.getDate())
    }
  }

  const handleViewChange = (nextView: CalendarView) => {
    if (calendarApi) {
      calendarApi.changeView(nextView)
      setView(nextView)
    }
  }

  const handleDatePrev = () => {
    if (calendarApi) {
      calendarApi.prev()
      setDate(calendarApi.getDate())
    }
  }

  const handleDateNext = () => {
    if (calendarApi) {
      calendarApi.next()
      setDate(calendarApi.getDate())
    }
  }

  const handleEventSelect = (arg: EventClickArg) =>
    setDrawer({ isOpen: true, eventId: arg.event.id })

  const handleCloseDialog = () => setDrawer({ isOpen: false })

  return (
    <Stack direction="row">
      <Box sx={{ flexBasis: `calc(100% - ${drawerWidth})` }}>
        <CalendarToolbar
          date={date}
          onDateNext={handleDateNext}
          onDatePrev={handleDatePrev}
          onDateToday={handleDateToday}
          onViewChange={handleViewChange}
          view={view}
          mobile={smDown}
          sx={{ mr: drawer.isOpen ? 3 : 0 }}
        />
        <FullCalendarWrapper>
          <FullCalendar
            weekends
            allDaySlot={false}
            headerToolbar={false}
            dayMaxEventRows={3}
            eventClick={handleEventSelect}
            events={events}
            eventContent={CalendarEventContent}
            initialDate={date}
            initialView={view}
            dayHeaderContent={CalendarHeaderField}
            slotLabelContent={CalendarTimeField}
            rerenderDelay={10}
            height="100%"
            ref={calendarRef}
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              listPlugin,
              timeGridPlugin,
              timelinePlugin,
            ]}
            {...calendarProps}
          />
        </FullCalendarWrapper>
      </Box>
      {drawer.isOpen && (
        <CalendarEventDrawer
          event={selectedEvent}
          eventDrawerDefs={eventDrawerDefs}
          onClose={handleCloseDialog}
          sx={{ flexBasis: drawerWidth }}
        />
      )}
    </Stack>
  )
}

export default Calendar
