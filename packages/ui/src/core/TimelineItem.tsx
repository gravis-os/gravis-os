import React from 'react'
import MuiTimelineItem, {
  TimelineItemProps as MuiTimelineItemProps,
} from '@mui/lab/TimelineItem'
import MuiTimelineSeparator from '@mui/lab/TimelineSeparator'
import MuiTimelineConnector, {
  TimelineConnectorProps as MuiTimelineConnectorProps,
} from '@mui/lab/TimelineConnector'
import MuiTimelineContent from '@mui/lab/TimelineContent'
import MuiTimelineDot, {
  TimelineDotProps as MuiTimelineDotProps,
} from '@mui/lab/TimelineDot'

export interface TimelineItemProps extends MuiTimelineItemProps {
  dotColor?: MuiTimelineDotProps['color']
  connectorColor?: MuiTimelineConnectorProps['color']
}

const TimelineItem: React.FC<TimelineItemProps> = (props) => {
  const { children, dotColor, connectorColor } = props

  return (
    <MuiTimelineItem>
      <MuiTimelineSeparator>
        <MuiTimelineDot color={dotColor} />
        <MuiTimelineConnector
          sx={{
            ...(connectorColor && {
              backgroundColor: `${connectorColor}.main`,
            }),
          }}
        />
      </MuiTimelineSeparator>

      <MuiTimelineContent>{children}</MuiTimelineContent>
    </MuiTimelineItem>
  )
}

export default TimelineItem
