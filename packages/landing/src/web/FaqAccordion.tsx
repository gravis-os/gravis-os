import React from 'react'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'

export interface FaqAccordionProps {
  items: Array<{
    content: React.ReactNode
    title: string
  }>
}

const FaqAccordion: React.FC<FaqAccordionProps> = (props) => {
  const { items } = props

  // Icon
  const [expanded, setExpanded] = React.useState({})
  const handleChange = (panel) => (e, isExpanded) => {
    e.stopPropagation()
    setExpanded({ ...expanded, [panel]: isExpanded })
  }

  return (
    <div>
      {items.map((item) => {
        const { title, content } = item

        const isExpanded = Boolean(expanded[title])
        const ExpansionIcon = isExpanded ? CloseOutlinedIcon : AddOutlinedIcon

        return (
          <Accordion
            disableGutters
            expanded={isExpanded}
            key={title}
            onChange={handleChange(title)}
            square
            sx={{
              '&.Mui-expanded': {
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              },
              boxShadow: 'none',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpansionIcon />}
              sx={{
                '& .MuiAccordionSummary-content': {
                  marginBottom: 2,
                  marginTop: 2,
                },
                '&:hover': {
                  backgroundColor: 'background.default',
                },
              }}
            >
              <Typography variant="h6">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{content}</Typography>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  )
}

export default FaqAccordion
