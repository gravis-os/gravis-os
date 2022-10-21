import { EventApi } from '@fullcalendar/common'
import { DAY_VIEW, MONTH_VIEW, WEEK_VIEW } from './constants'

export interface CalendarEventApiExtendedProps {
  subtitle?: string
  [key: string]: unknown
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

export interface CalendarEventDrawerDef {
  name: string
  title: string
}

export type CalendarEventDrawerDefs = CalendarEventDrawerDef[]

export type CalendarView =
  | typeof MONTH_VIEW
  | typeof WEEK_VIEW
  | typeof DAY_VIEW
