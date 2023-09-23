import type { ReactNode } from 'react'

import { EventApi } from '@fullcalendar/common'

import { DAY_VIEW, MONTH_VIEW, WEEK_VIEW } from './constants'

export type CalendarEventApiExtendedProps = {
  data?: unknown
  subtitle?: string
}

export interface CalendarEvent extends CalendarEventApiExtendedProps {
  allDay?: boolean
  color?: string
  end?: Date | string
  id?: string
  start: Date | string
  title: string
}

export type CalendarEventApi = Omit<EventApi, 'extendedProps'> & {
  extendedProps: CalendarEventApiExtendedProps
}

export interface CalendarEventData {}

export interface CalendarEventDrawerDef {
  name?: string
  render?: ({
    data,
    value,
  }: {
    data: CalendarEventData
    value: unknown
  }) => ReactNode
  title: string
}

export type CalendarEventDrawerDefs = CalendarEventDrawerDef[]

export type CalendarView =
  | typeof DAY_VIEW
  | typeof MONTH_VIEW
  | typeof WEEK_VIEW
