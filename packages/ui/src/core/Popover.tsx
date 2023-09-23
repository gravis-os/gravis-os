import React from 'react'

import MuiPopover, {
  PopoverProps as MuiPopoverProps,
} from '@mui/material/Popover'
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state'

import Card, { CardProps } from './Card'

export interface PopoverProps extends Partial<MuiPopoverProps> {
  cardProps?: CardProps
  key: string // popupId
  trigger: React.ReactNode
}

const Popover: React.FC<PopoverProps> = (props) => {
  const { cardProps, children, key, trigger, ...popoverProps } = props

  return (
    <PopupState popupId={key} variant="popover">
      {(popupState) => (
        <div>
          <div {...bindTrigger(popupState)}>{trigger}</div>

          <MuiPopover
            {...bindPopover(popupState)}
            anchorOrigin={{
              horizontal: 'center',
              vertical: 'bottom',
            }}
            transformOrigin={{
              horizontal: 'center',
              vertical: 'top',
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
