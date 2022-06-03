import React from 'react'
import PopupState, {
  bindTrigger,
  bindMenu,
  InjectedProps,
} from 'material-ui-popup-state'
import {
  Menu as MuiMenu,
  MenuProps as MuiMenuProps,
  MenuItem as MuiMenuItem,
  MenuItemProps as MuiMenuItemProps,
} from '@mui/material'
import Button, { ButtonProps } from './Button'
import { RenderPropsFunction } from '../types'

const renderItems = ({ items, popupState }) => {
  return (
    <>
      {items.map((item) => {
        const { key, value, label, onClick: injectedOnClick, ...rest } = item
        const handleClick = (e) => {
          if (injectedOnClick) injectedOnClick(e)
          popupState.close()
        }
        return (
          <MuiMenuItem key={key} onClick={handleClick} {...rest}>
            {label}
          </MuiMenuItem>
        )
      })}
    </>
  )
}

export interface MenuButtonItem extends MuiMenuItemProps {
  key: string
  value: string
  label: string
}

export interface MenuButtonProps extends Omit<ButtonProps, 'children'> {
  menuProps?: Omit<MuiMenuProps, 'open'>
  title: string
  children?: RenderPropsFunction<InjectedProps>
  items?: MenuButtonItem[]
}

const MenuButton: React.FC<MenuButtonProps> = (props) => {
  const { items, children, title, menuProps, ...rest } = props

  return (
    <PopupState variant="popover" popupId={title}>
      {(popupState) => (
        <>
          <Button {...bindTrigger(popupState)} {...rest}>
            {title}
          </Button>

          <MuiMenu {...bindMenu(popupState)} {...menuProps}>
            {items ? renderItems({ items, popupState }) : children(popupState)}
          </MuiMenu>
        </>
      )}
    </PopupState>
  )
}

export default MenuButton
