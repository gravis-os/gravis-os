import React from 'react'

import MuiTimelineConnector, {
  TimelineConnectorProps as MuiTimelineConnectorProps,
} from '@mui/lab/TimelineConnector'
import MuiTimelineContent from '@mui/lab/TimelineContent'
import MuiTimelineDot, {
  TimelineDotProps as MuiTimelineDotProps,
} from '@mui/lab/TimelineDot'
import MuiTimelineItem, {
  TimelineItemProps as MuiTimelineItemProps,
} from '@mui/lab/TimelineItem'
import MuiTimelineSeparator from '@mui/lab/TimelineSeparator'

export interface TimelineItemProps extends MuiTimelineItemProps {
  connectorColor?: MuiTimelineConnectorProps['color']
  dotColor?: MuiTimelineDotProps['color']
}

const TimelineItem: React.FC<TimelineItemProps> = (props) => {
  const { children, connectorColor, dotColor } = props

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
