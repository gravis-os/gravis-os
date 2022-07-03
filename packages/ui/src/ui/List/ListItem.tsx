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
import withTooltip from '../withTooltip'
import { TooltipProps } from '../Tooltip'

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
  iconProps?: ListItemIconProps

  onClick?: MuiListItemButtonProps['onClick']

  // NestedItems
  depth?: number
  items?: ListItemProps[]
  // Divider
  divider?: boolean
  // Open state
  defaultOpen?: boolean
  open?: boolean

  // Tooltip
  tooltip?: TooltipProps['title']
  hasTooltip?: boolean
  tooltipProps?: TooltipProps
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
    iconProps,

    onClick,

    disableGutters,
    disablePadding,

    // Tooltip
    hasTooltip,
    tooltip,
    tooltipProps,

    ...rest
  } = props

  const listItemButtonProps = {
    onClick,
    ...injectedListItemButtonProps,
  }
  const hasButton = Boolean(onClick || listItemButtonProps)

  const listItemProps = {
    disablePadding: disablePadding || hasButton,
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

  const commonIconProps = {
    dense: rest.dense,
    ...iconProps,
    sx: { color: 'primary.main', ...iconProps?.sx },
  }

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
          sx={
            {
              mr: 0,
              justifyContent: 'flex-end',
              ...commonIconProps?.sx,
              ...endIconProps?.sx,
            } as ListItemIconProps['sx']
          }
        >
          {endIcon}
        </ListItemIcon>
      )}
    </>
  )

  const listItemJsx = (
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

  return withTooltip({
    tooltip: hasTooltip && title,
    arrow: true,
    placement: 'right',
    ...tooltipProps,
  })(listItemJsx)
}

export default ListItem
