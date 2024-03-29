import React from 'react'

import MuiTimeline, {
  TimelineProps as MuiTimelineProps,
} from '@mui/lab/Timeline'
import { timelineItemClasses } from '@mui/lab/TimelineItem'

import TimelineItem from './TimelineItem'

export interface TimelineProps extends Omit<MuiTimelineProps, 'ref'> {
  items?: Array<{
    children?: React.ReactNode
    key: string
  }>
}

const Timeline: React.FC<TimelineProps> = (props) => {
  const { items, sx, ...rest } = props

  return (
    <MuiTimeline
      {...rest}
      sx={{
        // Disable right padding
        '&.MuiTimeline-positionRight, & .MuiTimelineContent-positionRight': {
          pr: 0,
        },
        // Align timeline to left
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
        my: 0,

        ...sx,
      }}
    >
      {items?.map((item) => {
        if (!item) return null
        return <TimelineItem key={item.key} {...item} />
      })}
    </MuiTimeline>
  )
}

export default Timeline
