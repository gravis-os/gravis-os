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
      sx={{
        my: 0,
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
        ...sx,
      }}
      {...rest}
    >
      {items?.map((item) => {
        return <TimelineItem key={item.key} {...item} />
      })}
    </MuiTimeline>
  )
}

export default Timeline
