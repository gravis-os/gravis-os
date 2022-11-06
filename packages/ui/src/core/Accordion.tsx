import React from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionProps as MuiAccordionProps,
  AccordionSummary,
} from '@mui/material'
import Typography, { TypographyProps } from './Typography'

export interface AccordionProps {
  transparent?: boolean
  disablePadding?: boolean
  items: Array<{ key: string; title: string; content: React.ReactNode }>
  titleProps?: TypographyProps
}

const Accordion: React.FC<AccordionProps> = (props) => {
  const { items, transparent, disablePadding, titleProps } = props

  // Icon
  const [expanded, setExpanded] = React.useState({})
  const handleChange = (panel) => (e, isExpanded) => {
    e.stopPropagation()
    setExpanded({ ...expanded, [panel]: isExpanded })
  }

  if (!items?.length) return null

  return (
    <div>
      {items.map((item) => {
        const { title, content } = item

        const isExpanded = Boolean(expanded[title])
        const ExpansionIcon = isExpanded ? CloseOutlinedIcon : AddOutlinedIcon

        return (
          <MuiAccordion
            expanded={isExpanded}
            onChange={handleChange(title)}
            key={item.title}
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
              <Typography>{content}</Typography>
            </AccordionDetails>
          </MuiAccordion>
        )
      })}
    </div>
  )
}

export default Accordion
