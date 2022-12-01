import React from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material'
import Typography, { TypographyProps } from './Typography'

export interface AccordionProps {
  transparent?: boolean
  disablePadding?: boolean
  items?: Array<{
    key: string
    title: React.ReactNode
    children?: React.ReactNode
    content?: React.ReactNode
  }>
  titleProps?: TypographyProps
  defaultExpandedKeys?: string[]
}

const Accordion: React.FC<AccordionProps> = (props) => {
  const {
    items: injectedItems,
    transparent,
    disablePadding,
    titleProps,
    defaultExpandedKeys = [],
  } = props

  // Icon
  const initialExpanded = defaultExpandedKeys.length
    ? defaultExpandedKeys.reduce((acc, defaultExpandedKey) => {
        return { ...acc, [defaultExpandedKey]: true }
      }, {})
    : {}
  const [expanded, setExpanded] = React.useState(initialExpanded)

  const handleChange = (panel) => (e, isExpanded) => {
    e.stopPropagation()
    setExpanded({ ...expanded, [panel]: isExpanded })
  }

  const items = injectedItems?.filter(Boolean)

  if (!items?.length) return null

  return (
    <div>
      {items.map((item) => {
        const { key, title } = item
        const content = item.children || item.content

        const isExpanded = Boolean(expanded[key])
        const ExpansionIcon = isExpanded ? CloseOutlinedIcon : AddOutlinedIcon

        return (
          <MuiAccordion
            expanded={isExpanded}
            onChange={handleChange(key)}
            key={key}
            square
            disableGutters
            sx={{
              boxShadow: 'none',
              '&.Mui-expanded': {
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              },
              ...(transparent && { backgroundColor: 'transparent' }),
            }}
          >
            <AccordionSummary
              expandIcon={<ExpansionIcon />}
              sx={{
                '&:hover': { backgroundColor: 'action.hover' },
                '& .MuiAccordionSummary-content': { my: 2 },
                ...(disablePadding && { px: 0 }),
              }}
            >
              <Typography variant="h5" {...titleProps}>
                {title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                ...(disablePadding && { px: 0 }),
              }}
            >
              {typeof content === 'string' ? (
                <Typography>{content}</Typography>
              ) : (
                content
              )}
            </AccordionDetails>
          </MuiAccordion>
        )
      })}
    </div>
  )
}

export default Accordion
