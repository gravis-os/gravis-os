import type { ResponsiveStyleValue } from '@mui/system/styleFunctionSx'

import React, { useEffect } from 'react'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import Link, { LinkProps } from './Link'
import Typography, { TypographyProps } from './Typography'

interface NavAccordionStyleProps {
  disablePadding?: boolean
}

export interface NavAccordionProps
  extends Omit<AccordionProps, 'children' | 'title'>,
    NavAccordionStyleProps {
  accordionProps?: Omit<AccordionProps, 'children'>
  children?: React.ReactNode
  href?: string
  id?: string
  itemTitleProps?: TypographyProps
  items?: Array<{
    href?: string
    onClick?: (e: React.SyntheticEvent, item: Record<string, unknown>) => void
    title: React.ReactNode
  }>
  onClick?: (e: React.MouseEvent) => void
  px?: ResponsiveStyleValue<React.CSSProperties['padding']>
  py?: ResponsiveStyleValue<React.CSSProperties['padding']>
  title: React.ReactNode
  titleProps?: LinkProps | TypographyProps
}

const EXPAND_ALL = 'EXPAND_ALL'

const NavAccordion: React.FC<NavAccordionProps> = (props) => {
  const {
    id,
    title,
    accordionProps,
    children,
    disablePadding,
    href,
    items,
    itemTitleProps,
    onClick = null,
    px = 3,
    py = 1.5,
    titleProps,
  } = props

  // Handle expanded state onScreenResize
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const [expanded, setExpanded] = React.useState({ [EXPAND_ALL]: isDesktop })
  useEffect(
    () => setExpanded({ ...expanded, [EXPAND_ALL]: isDesktop }),
    [isDesktop]
  )
  const handleChange = (panel) => (e, isExpanded) => {
    e.stopPropagation()
    setExpanded({ ...expanded, [panel]: isExpanded })
  }
  const isExpanded = Boolean(
    expanded[EXPAND_ALL] || expanded[typeof title === 'string' ? title : id]
  )

  // Icon
  const ExpansionIcon = isExpanded ? CloseOutlinedIcon : AddOutlinedIcon

  // Allow onClick on single string nodes
  const hasItems = items?.length
  const hasLink = Boolean(href)
  const shouldAllowOnClick = !children && !hasItems && !hasLink
  // Only render link if desktop, if no items
  const shouldRenderLink = hasLink && (isDesktop || !hasItems)

  // This is for the title
  const renderAccordionSummaryTitle = () => {
    switch (true) {
      case shouldRenderLink: {
        return (
          <Link
            color="inherit"
            href={href}
            onClick={onClick}
            variant="button"
            {...(titleProps as LinkProps)}
          >
            {title}
          </Link>
        )
      }
      // Title is a Jsx
      case typeof title === 'object': {
        return title
      }
      // Title is a string
      default: {
        return (
          <Typography variant="button" {...(titleProps as TypographyProps)}>
            {title}
          </Typography>
        )
      }
    }
  }

  return (
    <Accordion
      disableGutters
      expanded={isExpanded}
      onChange={handleChange(title)}
      square
      {...accordionProps}
      {...(shouldAllowOnClick && { onClick })}
      sx={{
        ...accordionProps?.sx,

        '&': { borderColor: 'divider' },
        '&:before': { backgroundColor: 'transparent' },

        // Border
        borderBottom: { xs: 1, md: 0 },
        // Colors
        boxShadow: 'none',
      }}
    >
      {/* Title */}
      <AccordionSummary
        expandIcon={items && !isDesktop && <ExpansionIcon fontSize="small" />}
        sx={{
          '& .MuiAccordionSummary-content': { m: 0 },
          // Padding
          px,

          py,

          ...((hasLink || children || shouldAllowOnClick) && {
            '& .MuiAccordionSummary-content > .MuiButton-root': {
              px,
              py,
              width: '100%',
            },
            '& .MuiAccordionSummary-root': {
              px,
              py: 0,
            },
          }),

          ...(hasItems &&
            !isDesktop && {
              '&:hover': { backgroundColor: 'action.hover' },
              p: disablePadding && 0,
            }),

          // Offset extra padding on IconButtons
          '& .MuiIconButton-root': { m: -1 },
        }}
      >
        {children || renderAccordionSummaryTitle()}
      </AccordionSummary>

      {/* Content */}
      {items && (
        <AccordionDetails sx={{ p: (theme) => theme.spacing(0, 0, 1.5) }}>
          <List dense disablePadding>
            {items.map((item, i) => {
              const { onClick: injectedOnClick } = item
              const listItemProps = injectedOnClick
                ? { onClick: (e) => injectedOnClick(e, item) }
                : {}

              const key = `accordion-link-item-${i}`

              const listItemContentJsx = (
                <ListItemText disableTypography>
                  <Typography
                    sx={{ textTransform: 'none' }}
                    variant="button"
                    {...itemTitleProps}
                  >
                    {item.title}
                  </Typography>
                </ListItemText>
              )

              const renderListItem = (children: JSX.Element) => (
                <ListItem
                  color="inherit"
                  sx={{
                    lineHeight: disablePadding ? 1.2 : 1,
                    padding: disablePadding && 0,
                    px,
                  }}
                  {...listItemProps}
                >
                  {children}
                </ListItem>
              )

              const renderLinkItem = (children: JSX.Element) => (
                <Link aria-label={key} href={item.href}>
                  {children}
                </Link>
              )

              const hasItemHref = Boolean(item.href)

              return (
                <React.Fragment key={key}>
                  {renderListItem(
                    hasItemHref
                      ? renderLinkItem(listItemContentJsx)
                      : listItemContentJsx
                  )}
                </React.Fragment>
              )
            })}
          </List>
        </AccordionDetails>
      )}
    </Accordion>
  )
}

export default NavAccordion
