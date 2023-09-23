import React from 'react'

import { RenderPropsFunction } from '@gravis-os/types'
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'
import {
  ListItemIcon,
  ListItemIconProps,
  ListItemText,
  ListItemTextProps,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
  MenuItemProps as MuiMenuItemProps,
  MenuProps as MuiMenuProps,
} from '@mui/material'
import PopupState, {
  InjectedProps,
  bindMenu,
  bindTrigger,
} from 'material-ui-popup-state'

import GvsButton, { ButtonProps } from './Button'

const renderItems = ({
  items,
  listItemIconProps,
  listItemTextProps,
  menuItemProps,
  popupState,
  size,
}) => {
  const isSmall = size === 'small'

  return items.map((item) => {
    const { icon, key, label, onClick: injectedOnClick, value, ...rest } = item
    const handleClick = (e) => {
      if (injectedOnClick) injectedOnClick(e)
      popupState.close()
    }
    return (
      <MuiMenuItem key={key} onClick={handleClick} {...menuItemProps} {...rest}>
        {icon && (
          <ListItemIcon
            {...listItemIconProps}
            sx={{
              '& .MuiIcon-root': {
                ...(isSmall && { fontSize: isSmall && 'small' }),
              },
              ...listItemIconProps?.sx,
            }}
          >
            {icon}
          </ListItemIcon>
        )}
        <ListItemText
          {...listItemTextProps}
          primaryTypographyProps={{
            variant: isSmall ? 'body2' : 'body1',
            ...listItemTextProps?.primaryTypographyProps,
          }}
        >
          {label}
        </ListItemText>
      </MuiMenuItem>
    )
  })
}

export interface MenuButtonItem extends MuiMenuItemProps {
  icon?: React.ReactElement
  key: string
  label: string
  value: string
}

export interface MenuButtonProps
  extends Omit<ButtonProps, 'children' | 'title'> {
  button?: React.ElementType
  children?: RenderPropsFunction<InjectedProps>
  items?: MenuButtonItem[]
  listItemIconProps?: ListItemIconProps
  listItemTextProps?: ListItemTextProps
  menuItemProps?: MuiMenuItemProps
  menuProps?: Omit<MuiMenuProps, 'open'>
  title: React.ReactNode
}

const MenuButton: React.FC<MenuButtonProps> = (props) => {
  const {
    title,
    button,
    children,
    items,
    listItemIconProps,
    listItemTextProps,
    menuItemProps,
    menuProps,
    size,
    ...rest
  } = props

  const Button = button || GvsButton

  return (
    <PopupState popupId={String(title)} variant="popover">
      {(popupState) => (
        <>
          <Button
            {...bindTrigger(popupState)}
            endIcon={<ArrowDropDownOutlinedIcon fontSize="small" />}
            size={size}
            {...rest}
          >
            {title}
          </Button>

          <MuiMenu {...bindMenu(popupState)} {...menuProps}>
            {items
              ? renderItems({
                  items,
                  listItemIconProps,
                  listItemTextProps,
                  menuItemProps,
                  popupState,
                  size,
                })
              : children(popupState)}
          </MuiMenu>
        </>
      )}
    </PopupState>
  )
}

export default MenuButton
