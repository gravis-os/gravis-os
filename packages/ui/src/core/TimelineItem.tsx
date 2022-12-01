import React from 'react'
import MuiTimelineItem, {
  TimelineItemProps as MuiTimelineItemProps,
} from '@mui/lab/TimelineItem'
import MuiTimelineSeparator from '@mui/lab/TimelineSeparator'
import MuiTimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimelineContent from '@mui/lab/TimelineContent'
import MuiTimelineDot from '@mui/lab/TimelineDot'

export interface TimelineItemProps extends MuiTimelineItemProps {}

const TimelineItem: React.FC<TimelineItemProps> = (props) => {
  const { children } = props

  return (
    <MuiTimelineItem>
      <MuiTimelineSeparator>
        <MuiTimelineDot />
        <MuiTimelineConnector />
      </MuiTimelineSeparator>

      <MuiTimelineContent>{children}</MuiTimelineContent>
    </MuiTimelineItem>
  )
}

export default TimelineItem
