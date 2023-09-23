import type { SxCssProperties } from '@gravis-os/types'

import React from 'react'

import {
  ListItem as MuiListItem,
  ListItemAvatar as MuiListItemAvatar,
  ListItemAvatarProps as MuiListItemAvatarProps,
  ListItemProps as MuiListItemProps,
  ListItemText as MuiListItemText,
  ListItemTextProps as MuiListItemTextProps,
} from '@mui/material'
import merge from 'lodash/merge'

import Box from '../Box'
import { TooltipProps } from '../Tooltip'
import withTooltip from '../withTooltip'
import ListItemButton, { ListItemButtonProps } from './ListItemButton'
import ListItemIcon, { ListItemIconProps } from './ListItemIcon'

export interface ListItemProps
  extends Omit<MuiListItemProps, 'onClick' | 'title'> {
  // Advanced styles
  advancedStyles?: {
    buttonColor?: SxCssProperties
    hoverBackgroundColor?: SxCssProperties
    hoverTextColor?: SxCssProperties
    iconColor?: SxCssProperties
    linkColor?: SxCssProperties
    // Only the following styles are required:
    selectedBackgroundColor: SxCssProperties
    selectedTextColor?: SxCssProperties
    subtitleColor?: SxCssProperties
    textColor: SxCssProperties
    titleColor?: SxCssProperties
  }
  // Avatar
  avatar?: React.ReactNode
  avatarProps?: MuiListItemAvatarProps
  buttonProps?: ListItemButtonProps
  // Open state
  defaultOpen?: boolean
  // NestedItems
  depth?: number
  disableText?: boolean
  // Divider
  divider?: boolean

  end?: React.ReactElement

  endIcon?: React.ReactElement
  endIconProps?: ListItemIconProps
  hasTooltip?: boolean
  href?: string

  iconProps?: ListItemIconProps
  id?: string
  items?: ListItemProps[]

  onClick?: ListItemButtonProps['onClick']
  open?: boolean
  // Right
  right?: React.ReactNode

  // Selected state
  selected?: boolean
  // Horizontal spacing between elements in ListItem
  spacing?: number
  start?: React.ReactElement
  startIcon?: React.ReactElement
  startIconProps?: ListItemIconProps

  subtitle?: MuiListItemTextProps['secondary']
  subtitleProps?: MuiListItemTextProps['secondaryTypographyProps']
  targetBlank?: boolean

  textProps?: MuiListItemTextProps

  title?: MuiListItemTextProps['primary']

  titleProps?: MuiListItemTextProps['primaryTypographyProps']

  // Tooltip
  tooltip?: TooltipProps['title']

  tooltipProps?: TooltipProps
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const {
    title,
    // Advanced Styles
    advancedStyles: injectedAdvancedStyles,
    // avatar
    avatar,

    avatarProps: injectedListItemAvatarProps,

    buttonProps: injectedListItemButtonProps,
    disableGutters,
    disablePadding,
    disableText,

    end,
    endIcon,

    endIconProps,
    // Tooltip
    hasTooltip,
    // Link
    href,
    iconProps,
    onClick,
    // Right
    right,
    // Selected
    selected,

    spacing = 1,

    start,
    startIcon,
    startIconProps,

    subtitle,
    subtitleProps,
    targetBlank,

    textProps: injectedListItemTextProps,

    titleProps,

    tooltip,

    tooltipProps,

    ...rest
  } = props

  // ==============================
  // Advanced Styles
  // ==============================
  const defaultAdvancedStyles = {
    buttonColor: 'inherit',
    hoverBackgroundColor: 'inherit',
    hoverTextColor: 'inherit',
    iconColor: 'inherit',
    linkColor: 'inherit',
    selectedBackgroundColor: '',
    selectedTextColor: 'inherit',
    subtitleColor: 'inherit',
    textColor: '',
    titleColor: 'inherit',
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
    href,
    onClick,
    selected,
    targetBlank,
    ...injectedListItemButtonProps,
    sx: {
      ...(hasAdvancedStyles && {
        // Hover
        '&:hover': {
          background: advancedStyles.hoverBackgroundColor,
          color: advancedStyles.hoverTextColor,
        },
        // Selected
        '&.Mui-selected, &.Mui-selected:hover': {
          background: advancedStyles.selectedBackgroundColor,
          color: advancedStyles.selectedTextColor,
        },

        color: advancedStyles.buttonColor,
      }),
      ...injectedListItemButtonProps?.sx,
    },
  }

  const listItemProps = {
    disableGutters,
    disablePadding: disablePadding || hasButton,
    ...rest,
    sx: {
      ...(hasAdvancedStyles && {
        color: advancedStyles.textColor,
      }),

      ...(href && {
        // Link Props
        '& > a': {
          ...(hasAdvancedStyles && {
            '&:hover': {
              color: advancedStyles.hoverTextColor,
            },
            color: advancedStyles.linkColor,
          }),
        },

        // Expand by default
        '&, & > a': { width: '100%' },
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
        mr: spacing,
      }),
    } as ListItemIconProps['sx'],
  }

  const listItemAvatarProps = {
    ...(avatar && { children: avatar }),
    ...injectedListItemAvatarProps,
    sx: {
      // Reset minWidth
      minWidth: 'initial',

      // Spacing
      ...(spacing && {
        mr: spacing,
      }),

      ...injectedListItemAvatarProps?.sx,
    },
  }

  const listItemTextProps = merge(
    {
      primary: title,
      primaryTypographyProps: {
        ...(React.isValidElement(title) && { component: 'div' }),
        ...titleProps,
        sx: {
          ...(hasAdvancedStyles && { color: advancedStyles.titleColor }),
          '&&&': { fontWeight: 'medium' },
          ...titleProps?.sx,
        },
      },
      secondary: subtitle,
      secondaryTypographyProps: {
        ...(React.isValidElement(subtitle) && { component: 'div' }),
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
      {right && <Box sx={{ justifyContent: 'flex-end' }}>{right}</Box>}
      {endIcon && (
        <ListItemIcon
          {...commonIconProps}
          {...endIconProps}
          sx={
            {
              justifyContent: 'flex-end',
              mr: 0,
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
    arrow: true,
    placement: 'right',
    tooltip: hasTooltip && title,
    ...tooltipProps,
  })(listItemJsx)
}

export default ListItem
