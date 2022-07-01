import React from 'react'
import {
  ListItem as MuiListItem,
  ListItemText as MuiListItemText,
  ListItemTextProps as MuiListItemTextProps,
  ListItemIcon as MuiListItemIcon,
  ListItemIconProps as MuiListItemIconProps,
  ListItemAvatar as MuiListItemAvatar,
  ListItemAvatarProps as MuiListItemAvatarProps,
  ListItemButton as MuiListItemButton,
  ListItemButtonProps as MuiListItemButtonProps,
} from '@mui/material'

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
  startIconProps?: MuiListItemIconProps
  endIconProps?: MuiListItemIconProps

  onClick?: MuiListItemButtonProps['onClick']

  disableGutters?: boolean
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

    ...rest
  } = props

  const listItemProps = {
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

  const listItemButtonProps = {
    onClick,
    ...injectedListItemButtonProps,
  }

  const childrenJsx = (
    <>
      {startIcon && (
        <MuiListItemIcon {...startIconProps}>{startIcon}</MuiListItemIcon>
      )}
      {listItemAvatarProps && <MuiListItemAvatar {...listItemAvatarProps} />}
      {listItemTextProps && <MuiListItemText {...listItemTextProps} />}
      {endIcon && (
        <MuiListItemIcon
          {...endIconProps}
          sx={{
            mr: 0,
            ...endIconProps?.sx,
          }}
        >
          {endIcon}
        </MuiListItemIcon>
      )}
    </>
  )

  return (
    <MuiListItem {...listItemProps}>
      {onClick || listItemButtonProps ? (
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
