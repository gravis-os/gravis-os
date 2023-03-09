import React from 'react'
import MuiPopover, {
  PopoverProps as MuiPopoverProps,
} from '@mui/material/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import Card, { CardProps } from './Card'

export interface PopoverProps extends Partial<MuiPopoverProps> {
  key: string // popupId
  trigger: React.ReactNode
  cardProps?: CardProps
}

const Popover: React.FC<PopoverProps> = (props) => {
  const { key, children, trigger, cardProps, ...popoverProps } = props

  return (
    <PopupState variant="popover" popupId={key}>
      {(popupState) => (
        <div>
          <div {...bindTrigger(popupState)}>{trigger}</div>

          <MuiPopover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            {...popoverProps}
          >
            <Card {...cardProps}>{children}</Card>
          </MuiPopover>
        </div>
      )}
    </PopupState>
  )
}

export default Popover
