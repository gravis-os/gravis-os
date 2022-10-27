import type { ChangeEvent, ElementType, FC, ReactNode } from 'react'
import React from 'react'
import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import ViewConfigIcon from '@mui/icons-material/ViewComfy'
import ViewWeekIcon from '@mui/icons-material/ViewWeek'
import ViewDayIcon from '@mui/icons-material/ViewDay'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { BoxProps } from '@gravis-os/ui'
import dayjs from 'dayjs'
import { DAY_VIEW, MONTH_VIEW, WEEK_VIEW } from '../constants'
import type { CalendarView } from '../types'

interface ViewOption {
  icon: ElementType
  label: string
  value: CalendarView
}

interface CalendarToolbarProps extends BoxProps {
  children?: ReactNode
  date: Date
  mobile?: boolean
  onDateNext?: () => void
  onDatePrev?: () => void
  onDateToday?: () => void
  onViewChange?: (view: CalendarView) => void
  view: CalendarView
}

const viewOptions: ViewOption[] = [
  {
    icon: ViewConfigIcon,
    label: 'Month',
    value: MONTH_VIEW,
  },
  {
    icon: ViewWeekIcon,
    label: 'Week',
    value: WEEK_VIEW,
  },
  {
    icon: ViewDayIcon,
    label: 'Day',
    value: DAY_VIEW,
  },
]

export const CalendarToolbar: FC<CalendarToolbarProps> = (props) => {
  const {
    date,
    mobile,
    onDateNext,
    onDatePrev,
    onDateToday,
    onViewChange,
    view,
    ...rest
  } = props

  const handleViewChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onViewChange?.(event.target.value as CalendarView)
  }

  return (
    <Box
      {...rest}
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        ...rest?.sx,
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          mb: {
            xs: 2,
            md: 0,
          },
          mr: 2,
        }}
      >
        <Typography variant="h4">{dayjs(date).format('MMMM')}</Typography>
        <Typography
          sx={{
            fontWeight: 400,
            ml: 1,
          }}
          variant="h4"
        >
          {dayjs(date).format('YYYY')}
        </Typography>
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          flexWrap: 'wrap',
          display: 'flex',
          m: -1,
        }}
      >
        <Box sx={{ m: 1 }}>
          <IconButton onClick={onDatePrev}>
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
          <Button
            onClick={onDateToday}
            variant="contained"
            sx={{
              m: 1,
            }}
          >
            Today
          </Button>

          <IconButton onClick={onDateNext}>
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Box>
        <TextField
          label="View"
          name="view"
          onChange={handleViewChange}
          select
          size="small"
          value={view}
          sx={{
            ml: {
              xs: 'auto',
              md: 1,
            },
            m: 1,
            minWidth: 120,
          }}
          SelectProps={{ native: true }}
        >
          {viewOptions.map((viewOption) => {
            if (
              mobile &&
              !['timeGridDay', 'listWeek'].includes(viewOption.value)
            ) {
              return null
            }

            return (
              <option key={viewOption.value} value={viewOption.value}>
                {viewOption.label}
              </option>
            )
          })}
        </TextField>
      </Box>
    </Box>
  )
}
