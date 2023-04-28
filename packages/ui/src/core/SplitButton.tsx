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
import React, { SyntheticEvent, useRef, useState } from 'react'

export interface SplitButtonOption<T = string> {
  label: string
  disabled?: boolean
  value?: T
  render?: () => React.ReactNode
}

export interface SplitButtonProps
  extends Omit<ButtonProps, 'onClick' | 'onChange'> {
  options: SplitButtonOption[]
  onClick?: (option: SplitButtonOption, event: SyntheticEvent) => void
  onChange?: (option: SplitButtonOption) => void
  buttonGroupProps?: Partial<ButtonGroupProps>
}

const SplitButton: React.FC<SplitButtonProps> = (props) => {
  const { options, disabled, onClick, onChange, buttonGroupProps, ...rest } =
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
        <Button size="small" onClick={handleToggle}>
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        sx={{ zIndex: 'modal' }}
      >
        {({ TransitionProps, placement }) => (
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
                    const { label, disabled } = option
                    return (
                      <MenuItem
                        key={label}
                        disabled={disabled}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
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
