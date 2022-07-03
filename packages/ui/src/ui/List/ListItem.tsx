import React from 'react'
import {
  ListItem as MuiListItem,
  ListItemProps as MuiListItemProps,
  ListItemText as MuiListItemText,
  ListItemTextProps as MuiListItemTextProps,
  ListItemAvatar as MuiListItemAvatar,
  ListItemAvatarProps as MuiListItemAvatarProps,
  ListItemButton as MuiListItemButton,
  ListItemButtonProps as MuiListItemButtonProps,
} from '@mui/material'
import ListItemIcon, { ListItemIconProps } from './ListItemIcon'

export interface ListItemProps
  extends Omit<MuiListItemProps, 'title' | 'onClick'> {
  key: string
  title?: MuiListItemTextProps['primary']
  subtitle?: MuiListItemTextProps['secondary']
  textProps?: MuiListItemTextProps
  avatarProps?: MuiListItemAvatarProps
  buttonProps?: MuiListItemButtonProps

  start?: React.ReactElement
  end?: React.ReactElement
  startIcon?: React.ReactElement
  endIcon?: React.ReactElement
  startIconProps?: ListItemIconProps
  endIconProps?: ListItemIconProps

  onClick?: MuiListItemButtonProps['onClick']

  // NestedItems
  depth?: number
  items?: ListItemProps[]
  // Divider
  divider?: boolean
  // Open state
  defaultOpen?: boolean
  open?: boolean
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const {
    textProps: injectedListItemTextProps,
    avatarProps: injectedListItemAvatarProps,
    buttonProps: injectedListItemButtonProps,

    title,
    subtitle,

    start,
    startIcon,
    startIconProps,
    end,
    endIcon,
    endIconProps,

    onClick,

    disableGutters,
    disablePadding,

    ...rest
  } = props

  const listItemButtonProps = {
    onClick,
    ...injectedListItemButtonProps,
  }
  const hasButton = Boolean(onClick || listItemButtonProps)

  const listItemProps = {
    disablePadding: disablePadding || hasButton,
    disableGutters,
    ...rest,
  }

  const listItemAvatarProps = injectedListItemAvatarProps && {
    ...injectedListItemAvatarProps,
  }

  const listItemTextProps = {
    primary: title,
    secondary: subtitle,
    ...injectedListItemTextProps,
  }

  const commonIconProps = { dense: rest.dense }

  const childrenJsx = (
    <>
      {startIcon && (
        <ListItemIcon {...commonIconProps} {...startIconProps}>
          {startIcon}
        </ListItemIcon>
      )}
      {listItemAvatarProps && <MuiListItemAvatar {...listItemAvatarProps} />}
      {listItemTextProps && <MuiListItemText {...listItemTextProps} />}
      {endIcon && (
        <ListItemIcon
          {...commonIconProps}
          {...endIconProps}
          sx={{
            mr: 0,
            justifyContent: 'flex-end',
            ...endIconProps?.sx,
          }}
        >
          {endIcon}
        </ListItemIcon>
      )}
    </>
  )

  return (
    <MuiListItem {...listItemProps}>
      {hasButton ? (
        <MuiListItemButton {...listItemButtonProps}>
          {childrenJsx}
        </MuiListItemButton>
      ) : (
        childrenJsx
      )}
    </MuiListItem>
  )
}

export default ListItem
