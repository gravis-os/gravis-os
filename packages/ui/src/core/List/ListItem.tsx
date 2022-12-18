import React from 'react'
import merge from 'lodash/merge'
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
  key?: string | number
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

  disableText?: boolean

  // Advanced styles
  advancedStyles?: {
    iconColor?: any
    titleColor?: any
    subtitleColor?: any
    linkColor?: any
    buttonColor?: any
    selectedTextColor?: any

    selectedBackgroundColor: any
    textColor: any
  }
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

    disableText,

    // Advanced Styles
    advancedStyles: injectedAdvancedStyles,

    ...rest
  } = props

  // ==============================
  // Advanced Styles
  // ==============================
  const defaultAdvancedStyles = {
    iconColor: 'inherit',
    titleColor: 'inherit',
    subtitleColor: 'inherit',
    selectedTextColor: 'inherit',
    linkColor: 'inherit',
    buttonColor: 'inherit',
    textColor: '',
    selectedBackgroundColor: '',
  }
  const advancedStyles = {
    ...defaultAdvancedStyles,
    ...injectedAdvancedStyles,
  }
  const hasAdvancedStyles = Boolean(
    advancedStyles.textColor && advancedStyles.selectedBackgroundColor
  )

  const hasButton = Boolean(onClick || href)
  const listItemButtonProps = {
    onClick,
    href,
    selected,
    ...injectedListItemButtonProps,
    sx: {
      ...(hasAdvancedStyles && {
        color: advancedStyles.buttonColor,
        '&.Mui-selected': {
          background: advancedStyles.selectedBackgroundColor,
          color: advancedStyles.selectedTextColor,
        },
      }),
      ...injectedListItemButtonProps?.sx,
    },
  }

  const listItemProps = {
    disablePadding: disablePadding || hasButton,
    disableGutters,
    ...rest,
    sx: {
      ...(hasAdvancedStyles && {
        color: advancedStyles.textColor,
      }),

      ...(href && {
        // Expand by default
        '&, & > a': { width: '100%' },

        // Link Props
        '& > a': {
          ...(hasAdvancedStyles && {
            color: advancedStyles.linkColor,
          }),
        },
      }),

      ...rest?.sx,
    },
  }

  const commonIconProps = {
    dense: rest.dense,
    ...iconProps,
    sx: {
      color: advancedStyles ? advancedStyles.iconColor : 'primary.main',
      ...iconProps?.sx,
    },
  }

  const listItemStartIconProps = {
    ...commonIconProps,
    ...startIconProps,
    sx: {
      ...commonIconProps?.sx,
      ...startIconProps?.sx,
      ...injectedListItemAvatarProps?.sx,

      ...(spacing && {
        minWidth: 0,
        mr: spacing,
      }),
    } as ListItemIconProps['sx'],
  }

  const listItemAvatarProps = {
    ...(avatar && { children: avatar }),
    ...injectedListItemAvatarProps,
    ...(spacing && {
      sx: { minWidth: 0, mr: spacing, ...injectedListItemAvatarProps?.sx },
    }),
  }

  const listItemTextProps = merge(
    {
      primary: title,
      primaryTypographyProps: {
        ...titleProps,
        sx: {
          ...(hasAdvancedStyles && { color: advancedStyles.titleColor }),
          ...titleProps?.sx,
        },
      },
      secondary: subtitle,
      secondaryTypographyProps: {
        lineHeight: 1.35,
        ...subtitleProps,
        sx: {
          mt: -0.5,
          ...(hasAdvancedStyles && { color: advancedStyles.subtitleColor }),
          ...subtitleProps?.sx,
        },
      },
    },
    injectedListItemTextProps
  )

  const childrenJsx = (
    <>
      {startIcon && (
        <ListItemIcon {...listItemStartIconProps}>{startIcon}</ListItemIcon>
      )}
      {avatar && <MuiListItemAvatar {...listItemAvatarProps} />}
      {!disableText && listItemTextProps && (
        <MuiListItemText {...listItemTextProps} />
      )}
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
