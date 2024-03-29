import { Theme } from '@mui/material'
import { alpha } from '@mui/material/styles'

interface CreateCalendarThemeArgs {
  theme: Theme
}

export const DEFAULT_DRAWER_WIDTH = '25%'

export const createCalendarTheme = ({ theme }: CreateCalendarThemeArgs) => ({
  '& .fc': {
    '--fc-bg-event-opacity': 1,
    '--fc-border-color': theme.palette.divider,
    '--fc-daygrid-event-dot-width': '10px',
    '--fc-event-text-color': theme.palette.primary.contrastText,
    '--fc-list-event-hover-bg-color': theme.palette.background.default,
    '--fc-neutral-bg-color': theme.palette.background.default,
    '--fc-page-bg-color': theme.palette.background.default,
    '--fc-today-bg-color': alpha(theme.palette.primary.main, 0.25),
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
  },
  '& .fc .fc-col-header-cell-cushion': {
    fontSize: theme.typography.overline.fontSize,
    fontWeight: theme.typography.overline.fontWeight,
    letterSpacing: theme.typography.overline.letterSpacing,
    lineHeight: theme.typography.overline.lineHeight,
    paddingBottom: '10px',
    paddingTop: '10px',
    textTransform: theme.typography.overline.textTransform,
  },
  '& .fc .fc-day-other .fc-daygrid-day-top': {
    color: theme.palette.text.secondary,
  },
  '& .fc-daygrid-block-event .fc-event-time': {
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.body2.fontWeight,
    lineHeight: theme.typography.body2.lineHeight,
  },
  '& .fc-daygrid-day-events': {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  '& .fc-daygrid-day-frame': {
    padding: '12px',
  },
  '& .fc-daygrid-event': {
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    fontSize: theme.typography.subtitle2.fontSize,
    fontWeight: theme.typography.subtitle2.fontWeight,
    lineHeight: theme.typography.subtitle2.lineHeight,
    whiteSpace: 'normal',
  },
  '& .fc-license-message': {
    display: 'none',
  },
  '& .fc-scrollgrid-section > *': { border: 'none' },
  '& .fc-theme-standard .fc-scrollgrid': { border: 'none' },
  '& .fc-timegrid-event': {
    '& .fc-event-main': { cursor: 'pointer', padding: 0 },
    background: 'transparent',
    border: 'none',
  },
  '& .fc-timegrid-slot': { height: theme.spacing(6) },
  '& .fc-timegrid-slot-label': { verticalAlign: 'top' },
  '& .fc-timegrid-slot-minor': { border: 'none' },
  '& th': { textAlign: 'left' },
  height: '100%',
})
