import React from 'react'
import {
  ListItem as MuiListItem,
  ListItemProps as MuiListItemProps,
  ListItemText as MuiListItemText,
  ListItemTextProps as MuiListItemTextProps,
  ListItemAvatar as MuiListItemAvatar,
  ListItemAvatarProps as MuiListItemAvatarProps,
} from '@mui/material'
import ListItemIcon, { ListItemIconProps } from './ListItemIcon'
import ListItemButton, { ListItemButtonProps } from './ListItemButton'
import { TooltipProps } from '../Tooltip'
import withTooltip from '../withTooltip'

export interface ListItemProps
  extends Omit<MuiListItemProps, 'title' | 'onClick'> {
  key: string | number
  title?: MuiListItemTextProps['primary']
  subtitle?: MuiListItemTextProps['secondary']
  textProps?: MuiListItemTextProps
  avatarProps?: MuiListItemAvatarProps
  buttonProps?: ListItemButtonProps

  start?: React.ReactElement
  end?: React.ReactElement
  startIcon?: React.ReactElement
  endIcon?: React.ReactElement
  startIconProps?: ListItemIconProps
  endIconProps?: ListItemIconProps
  iconProps?: ListItemIconProps

  href?: string
  onClick?: ListItemButtonProps['onClick']

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

  // Selected state
  selected?: boolean
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const {
    textProps: injectedListItemTextProps,
    avatarProps: injectedListItemAvatarProps,
    buttonProps: injectedListItemButtonProps,

    title,
    subtitle,
    href,

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

    // Selected
    selected,

    ...rest
  } = props

  const listItemButtonProps = {
    onClick,
    href,
    selected,
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
        <ListItemButton {...listItemButtonProps}>{childrenJsx}</ListItemButton>
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
