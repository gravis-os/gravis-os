'use client'
import React, { useState } from 'react'

import {
  CardActions,
  CardActionsProps,
  Card as MuiCard,
  CardProps as MuiCardProps,
  Typography,
} from '@mui/material'
import flowRight from 'lodash/flowRight'

import getPaletteColor from '../../utils/getPaletteColor'
import ButtonLink, { ButtonLinkProps } from '../ButtonLink'
import Collapse from '../Collapse'
import withHref from '../withHref'
import CardContent, { CardContentProps } from './CardContent'
import CardHeader, {
  CardHeaderProps as BaseCardHeaderProps,
} from './CardHeader'
import CardList, { CardListProps } from './CardList'
import CardTable, { CardTableProps } from './CardTable'

interface CardLinkInterface extends ButtonLinkProps {
  href: string
  icon?: React.ReactElement
  key: string
  title: string
}

interface CardActionInterface {
  children: React.ReactNode
  key: string
}

interface CardHeaderProps extends BaseCardHeaderProps {
  action?: React.ReactNode
  icon: React.ReactElement
  subtitle?: CardHeaderProps['subheader']
}

export interface CardProps extends Omit<MuiCardProps, 'title'> {
  actionProps?: CardActionsProps
  actions?: CardActionInterface[]
  border?: boolean
  borderHoverColor?: string

  // Collapse
  collapsible?: boolean
  content?: {
    subtitle?: string
    title?: string
  }
  contentProps?: CardContentProps
  defaultCollapsed?: boolean
  disableBackgroundColor?: boolean
  disableBorderRadiusBottom?: boolean
  disableBorderRadiusTop?: boolean
  disableBoxShadow?: boolean

  disableCardContent?: boolean
  disableHeader?: boolean

  // Disables
  disableHeaderDivider?: boolean

  disableLastGutterBottom?: boolean
  disablePadding?: boolean
  gutterBottom?: boolean

  // Props
  header?: CardHeaderProps
  // Styles
  hover?: boolean
  // Href
  href?: string
  icon?: CardHeaderProps['avatar']
  links?: CardLinkInterface[]
  list?: CardListProps
  // Shorthands
  overline?: React.ReactNode
  padding?: number
  // Padding
  py?: number
  // Size
  size?: 'large' | 'medium' | 'small'

  // Flex
  stretch?: boolean
  subtitle?: CardHeaderProps['subheader']

  table?: CardTableProps

  targetBlank?: boolean
  title?: CardHeaderProps['title']
}

const Card: React.FC<CardProps> = (props) => {
  const {
    title,
    actionProps: injectedCardActionProps,
    actions,
    border,
    borderHoverColor = 'primary',
    children,
    collapsible,
    content = {},
    contentProps,
    defaultCollapsed,
    disableBackgroundColor,
    disableBorderRadiusBottom,
    disableBorderRadiusTop,
    disableBoxShadow,
    disableCardContent,
    disableHeader,
    disableHeaderDivider,
    disableLastGutterBottom,
    disablePadding,
    gutterBottom,
    header,
    hover,
    href,
    icon,
    links,
    list,
    overline,
    padding: injectedPadding,
    py,
    size,
    stretch,
    subtitle,
    sx,
    table,
    targetBlank,
    ...rest
  } = props
  const { onClick } = rest

  // Size
  const isSmall = size === 'small'
  const isLarge = size === 'large'

  // Collapse
  const initialCollapsed = defaultCollapsed || false
  const [collapsed, setCollapsed] = useState(initialCollapsed)
  const toggleCollapsed = () => setCollapsed(!collapsed)

  // ==============================
  // Header
  // ==============================
  const {
    title: headerTitle,
    action: headerAction,
    icon: headerIcon,
    subtitle: headerSubtitle,
  } = header || {}

  const cardHeaderProps = {
    title: title || headerTitle,
    action: headerAction,
    avatar: icon || headerIcon,
    subheader: subtitle || headerSubtitle,
  }
  const hasHeader =
    !disableHeader && Object.values(cardHeaderProps).some(Boolean)

  // ==============================
  // Content
  // ==============================
  const hasContent = Object.keys(content).length > 0
  const { title: contentTitle, subtitle: contentSubtitle } = content || {}
  const cardContentProps = {
    ...contentProps,
    disableGutterBottom: !gutterBottom,
    padding: disablePadding
      ? 0
      : // prettier-ignore
        injectedPadding || (isSmall ? 1.5 : (isLarge ? 2.5 : 2)),
    stretch,
    sx: {
      ...contentProps?.sx,
      ...((disablePadding || disableCardContent) && { p: 0 }),
    },
  }

  // ==============================
  // Actions
  // ==============================
  const cardActionProps = {
    ...injectedCardActionProps,
    sx: {
      '&&': {
        backgroundColor: 'background.muted',
        ...injectedCardActionProps?.sx,
      },
    } as CardActionsProps['sx'],
  }

  const contentJsx = (
    <>
      {hasContent && (
        <CardContent {...cardContentProps}>
          <Typography gutterBottom variant="h5">
            {contentTitle}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {contentSubtitle}
          </Typography>
        </CardContent>
      )}
      {list && <CardList {...list} />}
      {table && <CardTable {...table} />}
      {children &&
        (disableCardContent ? (
          children
        ) : (
          <CardContent {...cardContentProps}>{children}</CardContent>
        ))}
      {links && (
        <CardActions {...cardActionProps}>
          {links.map((link) => {
            const { title, ...rest } = link

            return (
              <ButtonLink color="primary" {...rest}>
                {title}
              </ButtonLink>
            )
          })}
        </CardActions>
      )}
      {actions && (
        <CardActions {...cardActionProps}>
          {actions.map((action, i) => {
            const { children } = action
            return <div key={`action-${i}`}>{children}</div>
          })}
        </CardActions>
      )}
    </>
  )

  const cardHeaderJsx = hasHeader && (
    <CardHeader
      collapsed={!collapsed}
      collapsible={collapsible}
      divider={!disableHeaderDivider}
      onCollapsedClick={toggleCollapsed}
      titleTypographyProps={{ variant: 'h4' }}
      {...cardHeaderProps}
    />
  )

  const cardBodyJsx = collapsible ? (
    <Collapse in={!collapsed}>{contentJsx}</Collapse>
  ) : (
    contentJsx
  )

  const cardProps = {
    sx: {
      '& .MuiCardActions-root': {
        '& .MuiButton-root': {
          textTransform: 'none',
        },
        backgroundColor: 'grey.100',
      },
      '& .MuiCardHeader-avatar': {
        display: 'flex',
        marginRight: 1,
      },

      // Padding
      ...(py && { '&& .MuiCardContent-root': { py } }),

      // Stretch
      ...(stretch && { '&.MuiCard-root': { height: '100%' } }),

      // Border Radius
      ...(disableBorderRadiusTop && {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }),
      ...(disableBorderRadiusBottom && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }),

      // Box Shadow
      ...(disableBoxShadow && { boxShadow: 'none' }),

      // Border
      border: '1px solid transparent',
      ...(border && { borderColor: 'divider' }),

      // Background Color
      ...(disableBackgroundColor && {
        '&, & .MuiPaper-root': { backgroundColor: 'transparent' },
      }),

      // Hover
      ...((onClick || hover) && {
        '&:hover': {
          borderColor: getPaletteColor(borderHoverColor),
          cursor: 'pointer',
        },
      }),

      ...sx,
    },
    ...rest,
  }

  const cardChildrenJsx = (
    <MuiCard {...cardProps}>
      {cardHeaderJsx}
      {cardBodyJsx}
    </MuiCard>
  )

  const cardChildrenWithOverlineJsx = overline ? (
    <>
      {overline}
      {cardChildrenJsx}
    </>
  ) : (
    cardChildrenJsx
  )

  return flowRight([
    withHref({
      href,
      linkProps: {
        sx: {
          '&:hover .MuiCard-root': {
            borderColor: getPaletteColor(borderHoverColor),
          },
        },
      },
      targetBlank,
    }),
  ])(cardChildrenWithOverlineJsx)
}

export default Card
