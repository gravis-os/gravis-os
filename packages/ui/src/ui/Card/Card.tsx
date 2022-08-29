import React, { useState } from 'react'
import {
  Card as MuiCard,
  CardProps as MuiCardProps,
  CardActions,
  Typography,
  CardActionsProps,
} from '@mui/material'
import CardHeader, {
  CardHeaderProps as BaseCardHeaderProps,
} from './CardHeader'
import ButtonLink, { ButtonLinkProps } from '../ButtonLink'
import CardTable, { CardTableProps } from './CardTable'
import CardList, { CardListProps } from './CardList'
import CardContent, { CardContentProps } from './CardContent'
import Collapse from '../Collapse'

interface CardLinkInterface extends ButtonLinkProps {
  key: string
  title: string
  href: string
  icon?: React.ReactElement
}

interface CardActionInterface {
  key: string
  children: React.ReactNode
}

interface CardHeaderProps extends BaseCardHeaderProps {
  icon: React.ReactElement
  subtitle?: CardHeaderProps['subheader']
  action?: React.ReactNode
}

export interface CardProps extends Omit<MuiCardProps, 'title'> {
  // Shorthands
  title?: CardHeaderProps['title']
  subtitle?: CardHeaderProps['subheader']
  icon?: CardHeaderProps['avatar']

  // Props
  header?: CardHeaderProps
  content?: {
    title?: string
    subtitle?: string
  }
  contentProps?: CardContentProps
  list?: CardListProps
  table?: CardTableProps
  links?: CardLinkInterface[]
  actions?: CardActionInterface[]
  actionProps?: CardActionsProps

  // Padding
  py?: number

  // Flex
  stretch?: boolean

  // Disables
  disableHeaderDivider?: boolean
  disableLastGutterBottom?: boolean
  disableBorderRadiusTop?: boolean
  disableBorderRadiusBottom?: boolean
  disablePadding?: boolean
  disableHeader?: boolean

  // Collapse
  collapsible?: boolean
  defaultCollapsed?: boolean
}

const Card: React.FC<CardProps> = (props) => {
  const {
    // Collapsed
    collapsible,
    defaultCollapsed,

    children,
    content = {},
    contentProps,
    actionProps: injectedCardActionProps,
    title,
    subtitle,
    icon,
    header,
    list,
    table,
    links,
    actions,
    sx,
    py,
    stretch,
    disableHeader,
    disableHeaderDivider,
    disableLastGutterBottom,
    disableBorderRadiusTop,
    disableBorderRadiusBottom,
    disablePadding,
    ...rest
  } = props

  // Collapse
  const initialCollapsed = defaultCollapsed || false
  const [collapsed, setCollapsed] = useState(initialCollapsed)
  const toggleCollapsed = () => setCollapsed(!collapsed)

  // ==============================
  // Header
  // ==============================
  const {
    icon: headerIcon,
    title: headerTitle,
    subtitle: headerSubtitle,
    action: headerAction,
  } = header || {}

  const cardHeaderProps = {
    avatar: icon || headerIcon,
    title: title || headerTitle,
    subheader: subtitle || headerSubtitle,
    action: headerAction,
  }
  const hasHeader =
    !disableHeader && Object.values(cardHeaderProps).some(Boolean)

  // ==============================
  // Content
  // ==============================
  const hasContent = Boolean(Object.keys(content).length)
  const { title: contentTitle, subtitle: contentSubtitle } = content || {}
  const cardContentProps = {
    ...contentProps,
    sx: {
      ...contentProps?.sx,
      ...(disableLastGutterBottom && {
        '&&.MuiCardContent-root': { pb: 1 },
      }),
      ...(disablePadding && { p: 0 }),
    },
  }

  // ==============================
  // Actions
  // ==============================
  const cardActionProps = { ...injectedCardActionProps }

  const contentJsx = (
    <>
      {hasContent && (
        <CardContent {...cardContentProps}>
          <Typography variant="h5" gutterBottom>
            {contentTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {contentSubtitle}
          </Typography>
        </CardContent>
      )}
      {list && <CardList {...list} />}
      {table && <CardTable {...table} />}
      {children && <CardContent {...cardContentProps}>{children}</CardContent>}
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
      onCollapsedClick={toggleCollapsed}
      divider={!disableHeaderDivider}
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
      '& .MuiCardHeader-avatar': {
        display: 'flex',
        marginRight: 1,
      },
      '& .MuiCardActions-root': {
        backgroundColor: 'grey.100',
        '& .MuiButton-root': {
          textTransform: 'none',
        },
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

  return cardChildrenJsx
}

export default Card
