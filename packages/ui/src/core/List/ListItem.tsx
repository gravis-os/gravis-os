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
  titleProps?: MuiListItemTextProps['primaryTypographyProps']
  subtitle?: MuiListItemTextProps['secondary']
  subtitleProps?: MuiListItemTextProps['secondaryTypographyProps']
  textProps?: MuiListItemTextProps
  avatarProps?: MuiListItemAvatarProps
  buttonProps?: ListItemButtonProps

  // Avatar
  avatar?: React.ReactNode

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

  // Horizontal spacing between elements in ListItem
  spacing?: number
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const {
    textProps: injectedListItemTextProps,
    avatarProps: injectedListItemAvatarProps,
    buttonProps: injectedListItemButtonProps,

    // avatar
    avatar,

    title,
    titleProps,
    subtitle,
    subtitleProps,
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
    spacing,

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
  const hasButton = Boolean(onClick || href)

  const listItemProps = {
    disablePadding: disablePadding || hasButton,
    disableGutters,
    ...rest,
  }

  const commonIconProps = {
    dense: rest.dense,
    ...iconProps,
    sx: { color: 'primary.main', ...iconProps?.sx },
  }

  const listItemStartIconProps = {
    ...commonIconProps,
    ...startIconProps,
    ...(spacing && {
      sx: { minWidth: 0, mr: spacing, ...injectedListItemAvatarProps?.sx },
    }),
  }

  const listItemAvatarProps = {
    ...(avatar && { children: avatar }),
    ...injectedListItemAvatarProps,
    ...(spacing && {
      sx: { minWidth: 0, mr: spacing, ...injectedListItemAvatarProps?.sx },
    }),
  }

  const listItemTextProps = {
    primary: title,
    primaryTypographyProps: titleProps,
    secondary: subtitle,
    secondaryTypographyProps: { lineHeight: 1.35, ...subtitleProps },
    ...injectedListItemTextProps,
  }

  const childrenJsx = (
    <>
      {startIcon && (
        <ListItemIcon {...listItemStartIconProps}>{startIcon}</ListItemIcon>
      )}
      {avatar && <MuiListItemAvatar {...listItemAvatarProps} />}
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
