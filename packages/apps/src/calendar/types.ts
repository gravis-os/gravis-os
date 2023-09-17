import type { ReactNode } from 'react'
import { EventApi } from '@fullcalendar/common'
import { DAY_VIEW, MONTH_VIEW, WEEK_VIEW } from './constants'

export type CalendarEventApiExtendedProps = {
  subtitle?: string
  data?: unknown
}

export interface CalendarEvent extends CalendarEventApiExtendedProps {
  id?: string
  allDay?: boolean
  color?: string
  end?: string | Date
  start: string | Date
  title: string
}

export type CalendarEventApi = Omit<EventApi, 'extendedProps'> & {
  extendedProps: CalendarEventApiExtendedProps
}

export interface CalendarEventData {}

export interface CalendarEventDrawerDef {
  name?: string
  title: string
  render?: ({
    data,
    value,
  }: {
    data: CalendarEventData
    value: unknown
  }) => ReactNode
}

export type CalendarEventDrawerDefs = CalendarEventDrawerDef[]

export type CalendarView =
  | typeof MONTH_VIEW
  | typeof WEEK_VIEW
  | typeof DAY_VIEW
