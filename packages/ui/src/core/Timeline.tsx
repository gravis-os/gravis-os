import React from 'react'
import MuiTimeline, {
  TimelineProps as MuiTimelineProps,
} from '@mui/lab/Timeline'
import { timelineItemClasses } from '@mui/lab/TimelineItem'
import TimelineItem from './TimelineItem'

export interface TimelineProps extends Omit<MuiTimelineProps, 'ref'> {
  items?: Array<{
    key: string
    children?: React.ReactNode
  }>
}

const Timeline: React.FC<TimelineProps> = (props) => {
  const { items, sx, ...rest } = props

  return (
    <MuiTimeline
      {...rest}
      sx={{
        my: 0,
        // Align timeline to left
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
        // Disable right padding
        '&.MuiTimeline-positionRight, & .MuiTimelineContent-positionRight': {
          pr: 0,
        },

        ...sx,
      }}
    >
      {items?.map((item) => {
        return <TimelineItem key={item.key} {...item} />
      })}
    </MuiTimeline>
  )
}

export default Timeline
