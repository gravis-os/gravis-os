import React, { useEffect } from 'react'
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
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { ResponsiveStyleValue } from '@mui/system/styleFunctionSx'
import Link, { LinkProps } from './Link'
import Typography, { TypographyProps } from './Typography'

interface NavAccordionStyleProps {
  disablePadding?: boolean
}

export interface NavAccordionProps
  extends Omit<AccordionProps, 'children' | 'title'>,
    NavAccordionStyleProps {
  key?: string
  title: React.ReactNode
  href?: string
  items?: Array<{
    title: React.ReactNode
    href?: string
    onClick?: (e: React.SyntheticEvent, item: Record<string, unknown>) => void
  }>
  onClick?: (e: React.MouseEvent) => void
  children?: React.ReactNode
  accordionProps?: Omit<AccordionProps, 'children'>
  titleProps?: TypographyProps | LinkProps
  itemTitleProps?: TypographyProps
  py?: ResponsiveStyleValue<React.CSSProperties['padding']>
  px?: ResponsiveStyleValue<React.CSSProperties['padding']>
}

const EXPAND_ALL = 'EXPAND_ALL'

const NavAccordion: React.FC<NavAccordionProps> = (props) => {
  const {
    key,
    disablePadding,
    onClick = null,
    title,
    titleProps,
    itemTitleProps,
    href,
    items,
    children,
    accordionProps,
    py = 1.5,
    px = 3,
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
    expanded[EXPAND_ALL] || expanded[typeof title === 'string' ? title : key]
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
      case shouldRenderLink:
        return (
          <Link
            color="inherit"
            variant="button"
            href={href}
            onClick={onClick}
            {...(titleProps as LinkProps)}
          >
            {title}
          </Link>
        )
      // Title is a Jsx
      case typeof title === 'object':
        return title
      // Title is a string
      default:
        return (
          <Typography variant="button" {...(titleProps as TypographyProps)}>
            {title}
          </Typography>
        )
    }
  }

  return (
    <Accordion
      expanded={isExpanded}
      onChange={handleChange(title)}
      square
      disableGutters
      {...accordionProps}
      {...(shouldAllowOnClick && { onClick })}
      sx={{
        ...accordionProps?.sx,

        // Border
        borderBottom: { xs: 1, md: 0 },
        '&': { borderColor: 'divider' },

        // Colors
        boxShadow: 'none',
        '&:before': { backgroundColor: 'transparent' },
      }}
    >
      {/* Title */}
      <AccordionSummary
        expandIcon={items && !isDesktop && <ExpansionIcon fontSize="small" />}
        sx={{
          // Padding
          px,
          py,

          '& .MuiAccordionSummary-content': { m: 0 },

          ...((hasLink || children || shouldAllowOnClick) && {
            '& .MuiAccordionSummary-root': {
              py: 0,
              px,
            },
            '& .MuiAccordionSummary-content > .MuiButton-root': {
              width: '100%',
              py,
              px,
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

              const listItemJsx = (
                <ListItem
                  sx={{
                    lineHeight: disablePadding ? 1.2 : 1,
                    padding: disablePadding && 0,
                    px,
                  }}
                  color="inherit"
                  {...listItemProps}
                >
                  <ListItemText disableTypography>
                    <Typography
                      variant="button"
                      sx={{ textTransform: 'none' }}
                      {...itemTitleProps}
                    >
                      {item.title}
                    </Typography>
                  </ListItemText>
                </ListItem>
              )

              const hasItemHref = Boolean(item.href)
              return hasItemHref ? (
                <Link key={key} href={item.href}>
                  {listItemJsx}
                </Link>
              ) : (
                <React.Fragment key={key}>{listItemJsx}</React.Fragment>
              )
            })}
          </List>
        </AccordionDetails>
      )}
    </Accordion>
  )
}

export default NavAccordion
