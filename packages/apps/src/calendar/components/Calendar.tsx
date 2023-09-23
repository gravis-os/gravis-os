import type { EventClickArg } from '@fullcalendar/react'
import type { Theme } from '@mui/material'

import React, { FC, useCallback, useEffect, useRef, useState } from 'react'

import { CalendarOptions } from '@fullcalendar/common'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import timelinePlugin from '@fullcalendar/timeline'
import { Box, Stack } from '@gravis-os/ui'
import { useMediaQuery } from '@mui/material'
import { styled } from '@mui/material/styles'
import isEmpty from 'lodash/isEmpty'

import type {
  CalendarEvent,
  CalendarEventDrawerDefs,
  CalendarView,
} from '../types'

import { DAY_VIEW, WEEK_VIEW } from '../constants'
import {
  DEFAULT_DRAWER_WIDTH,
  createCalendarTheme,
} from '../createCalendarTheme'
import CalendarEventContent from './CalendarEventContent'
import CalendarEventDrawer from './CalendarEventDrawer'
import CalendarHeaderField from './CalendarHeaderField'
import { CalendarToolbar } from './CalendarToolbar'
import CalendarTimeField from './CalenderTimeField'

interface CalendarDrawerState {
  eventId?: string
  isOpen: boolean
}

interface CalendarProps extends Omit<CalendarOptions, 'events' | 'height'> {
  eventDrawerDefs: CalendarEventDrawerDefs
  events: CalendarEvent[]
  height: number | string
}

const FullCalendarWrapper = styled('div')(createCalendarTheme)

const Calendar: FC<CalendarProps> = (props) => {
  const { eventDrawerDefs, events, height, ...calendarProps } = props

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
    setDrawer({ eventId: arg.event.id, isOpen: true })

  const handleCloseDialog = () => setDrawer({ isOpen: false })

  return (
    <Stack direction="row" sx={{ height }}>
      <Box sx={{ flexBasis: `calc(100% - ${drawerWidth})` }}>
        <CalendarToolbar
          date={date}
          mobile={smDown}
          onDateNext={handleDateNext}
          onDatePrev={handleDatePrev}
          onDateToday={handleDateToday}
          onViewChange={handleViewChange}
          sx={{ mb: 2, mr: drawer.isOpen ? 3 : 0 }}
          view={view}
        />
        <FullCalendarWrapper>
          <FullCalendar
            allDaySlot={false}
            dayHeaderContent={CalendarHeaderField}
            dayMaxEventRows={3}
            eventClick={handleEventSelect}
            eventContent={CalendarEventContent}
            events={events}
            headerToolbar={false}
            height="100%"
            initialDate={date}
            initialView={view}
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              listPlugin,
              timeGridPlugin,
              timelinePlugin,
            ]}
            ref={calendarRef}
            rerenderDelay={10}
            slotLabelContent={CalendarTimeField}
            weekends
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
