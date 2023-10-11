'use client'

import React, { SyntheticEvent, useRef, useState } from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import {
  Button,
  ButtonGroup,
  ButtonGroupProps,
  ButtonProps,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material'

export interface SplitButtonOption<T = string> {
  disabled?: boolean
  label: string
  render?: () => React.ReactNode
  value?: T
}

export interface SplitButtonProps
  extends Omit<ButtonProps, 'onChange' | 'onClick'> {
  buttonGroupProps?: Partial<ButtonGroupProps>
  onChange?: (option: SplitButtonOption) => void
  onClick?: (option: SplitButtonOption, event: SyntheticEvent) => void
  options: SplitButtonOption[]
}

const SplitButton: React.FC<SplitButtonProps> = (props) => {
  const { buttonGroupProps, disabled, onChange, onClick, options, ...rest } =
    props
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { label, render } = options[selectedIndex] || {}

  const handleButtonClick = (event: SyntheticEvent) => {
    onClick?.(options[selectedIndex], event)
  }

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setOpen(false)
    onChange?.(options[index])
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  return (
    <>
      <ButtonGroup variant="contained" {...buttonGroupProps} ref={anchorRef}>
        {typeof render === 'function' ? (
          render()
        ) : (
          <Button disabled={disabled} onClick={handleButtonClick} {...rest}>
            {label}
          </Button>
        )}
        <Button onClick={handleToggle} size="small">
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        anchorEl={anchorRef.current}
        disablePortal
        open={open}
        sx={{ zIndex: 'modal' }}
        transition
      >
        {({ placement, TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem>
                  {options.map((option, index) => {
                    const { disabled, label } = option
                    return (
                      <MenuItem
                        disabled={disabled}
                        key={label}
                        onClick={(event) => handleMenuItemClick(event, index)}
                        selected={index === selectedIndex}
                      >
                        {label}
                      </MenuItem>
                    )
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

export default SplitButton
