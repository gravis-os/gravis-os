import React from 'react'
import {
  ListItem as MuiListItem,
  ListItemText as MuiListItemText,
  ListItemTextProps as MuiListItemTextProps,
  ListItemAvatar as MuiListItemAvatar,
  ListItemAvatarProps as MuiListItemAvatarProps,
  ListItemButton as MuiListItemButton,
  ListItemButtonProps as MuiListItemButtonProps,
} from '@mui/material'
import ListItemIcon, { ListItemIconProps } from './ListItemIcon'

export interface ListItemProps {
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

  disableGutters?: boolean
  disablePadding?: boolean

  // NestedItems
  items?: ListItemProps[]
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

  const childrenJsx = (
    <>
      {startIcon && (
        <ListItemIcon {...startIconProps}>{startIcon}</ListItemIcon>
      )}
      {listItemAvatarProps && <MuiListItemAvatar {...listItemAvatarProps} />}
      {listItemTextProps && <MuiListItemText {...listItemTextProps} />}
      {endIcon && (
        <ListItemIcon
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
