import React, { useEffect } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
} from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import RouterLink from 'next/link'
import { useTheme } from '@mui/material/styles'

interface NavAccordionStyleProps {
  disablePadding?: boolean
}

export interface NavAccordionProps
  extends Omit<AccordionProps, 'children'>,
    NavAccordionStyleProps {
  title: string
  href?: string
  items?: Array<{
    title: string | React.ReactElement
    href?: string
    onClick?: () => void
  }>
  onClick?: (e: React.MouseEvent) => void
  children?: React.ElementType
}

const EXPAND_ALL = 'EXPAND_ALL'

const NavAccordion: React.FC<NavAccordionProps> = (props) => {
  const {
    disablePadding,
    onClick = null,
    title,
    href,
    items,
    children,
    ...rest
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
  const isExpanded = Boolean(expanded[EXPAND_ALL] || expanded[title])

  // Icon
  const ExpansionIcon = isExpanded ? CloseOutlinedIcon : AddOutlinedIcon

  // Children
  const renderAccordionSummaryContent = () => {
    const hasLink = Boolean(href)

    switch (true) {
      case hasLink:
        return (
          <RouterLink href={href} passHref>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link color="inherit" variant="button" onClick={onClick}>
              {title}
            </Link>
          </RouterLink>
        )
      // Title is a Jsx
      case typeof title === 'object':
        return title
      // Title is a string
      default:
        return <Typography variant="button">{title}</Typography>
    }
  }

  // Allow onClick on single string nodes
  const shouldAllowOnClick = !children && !items && !href

  return (
    <Accordion
      expanded={isExpanded}
      onChange={handleChange(title)}
      square
      disableGutters
      {...rest}
      sx={{
        ...rest.sx,

        boxShadow: 'none',
        borderBottom: (theme) => ({
          xs: `1px solid ${theme.palette.divider}`,
          md: 'none',
        }),
        '&:before': { backgroundColor: 'transparent' },

        ...(children && {
          '& .MuiAccordionSummary-root': {
            padding: 0,
            '& .MuiAccordionSummary-content': {
              margin: 0,
              '& > .MuiButton-root': {
                width: '100%',
                padding: (theme) => theme.spacing(1.5, 2),
              },
            },
          },
        }),
      }}
    >
      <AccordionSummary
        expandIcon={items && !isDesktop && <ExpansionIcon fontSize="small" />}
        sx={{
          ...(items && {
            padding: disablePadding && 0,
            '& > *:first-of-type': { marginY: 1 },
          }),
          ...(href && {
            padding: 0,
            '& .MuiAccordionSummary-content': { margin: 0 },
            '& a': {
              width: '100%',
              padding: (theme) => theme.spacing(1.5, 2),
            },
          }),
          ...((children || shouldAllowOnClick) && {
            padding: 0,
            '& .MuiAccordionSummary-content': { margin: 0 },
            '& > *': {
              width: '100%',
              padding: theme.spacing(1.5, 2),
            },
          }),
        }}
        onClick={shouldAllowOnClick && onClick}
      >
        {children || renderAccordionSummaryContent()}
      </AccordionSummary>

      {items && (
        <AccordionDetails sx={{ padding: (theme) => theme.spacing(0, 0, 1.5) }}>
          <List dense disablePadding>
            {items.map((item, i) => {
              const { onClick: injectedOnClick } = item
              const listItemProps = injectedOnClick
                ? { onClick: (e) => injectedOnClick(e, item) }
                : {}

              const key = `accordion-link-item-${i}`

              const listItemJsx = (
                <ListItem
                  component={Link}
                  sx={{
                    lineHeight: disablePadding ? 1.2 : 1,
                    padding: disablePadding && 0,
                  }}
                  color="inherit"
                  {...listItemProps}
                >
                  <ListItemText disableTypography>
                    <Typography variant="button" fontWeight="normal">
                      {item.title}
                    </Typography>
                  </ListItemText>
                </ListItem>
              )

              if (!item.href) {
                return <React.Fragment key={key}>{listItemJsx}</React.Fragment>
              }

              return (
                <RouterLink key={key} href={item.href} passHref>
                  {listItemJsx}
                </RouterLink>
              )
            })}
          </List>
        </AccordionDetails>
      )}
    </Accordion>
  )
}

export default NavAccordion
