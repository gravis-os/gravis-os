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
  ListItemIcon,
  ListItemText,
  ListItemIconProps,
  ListItemTextProps,
} from '@mui/material'
import { RenderPropsFunction } from '@gravis-os/types'
import { ArrowDropDownOutlined } from '@mui/icons-material'
import GvsButton, { ButtonProps } from './Button'

const renderItems = ({
  items,
  popupState,
  listItemIconProps,
  listItemTextProps,
  menuItemProps,
  size,
}) => {
  const isSmall = size === 'small'

  return items.map((item) => {
    const { key, value, label, icon, onClick: injectedOnClick, ...rest } = item
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
  value: string
  label: string
}

export interface MenuButtonProps
  extends Omit<ButtonProps, 'children' | 'title'> {
  menuProps?: Omit<MuiMenuProps, 'open'>
  title: React.ReactNode
  children?: RenderPropsFunction<InjectedProps>
  items?: MenuButtonItem[]
  button?: React.ElementType
  menuItemProps?: MuiMenuItemProps
  listItemIconProps?: ListItemIconProps
  listItemTextProps?: ListItemTextProps
}

const MenuButton: React.FC<MenuButtonProps> = (props) => {
  const {
    button,
    items,
    children,
    title,
    menuProps,
    menuItemProps,
    listItemIconProps,
    listItemTextProps,
    size,
    ...rest
  } = props

  const Button = button || GvsButton

  return (
    <PopupState variant="popover" popupId={String(title)}>
      {(popupState) => (
        <>
          <Button
            {...bindTrigger(popupState)}
            size={size}
            endIcon={<ArrowDropDownOutlined fontSize="small" />}
            {...rest}
          >
            {title}
          </Button>

          <MuiMenu {...bindMenu(popupState)} {...menuProps}>
            {items
              ? renderItems({
                  items,
                  popupState,
                  menuItemProps,
                  listItemIconProps,
                  listItemTextProps,
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
