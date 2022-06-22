import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

interface FaqAccordionProps {
  items: Array<{
    title: string
    content: React.ReactNode
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
            }}
          >
            <AccordionSummary
              expandIcon={<ExpansionIcon />}
              sx={{
                '&:hover': {
                  backgroundColor: 'background.default',
                },
                '& .MuiAccordionSummary-content': {
                  marginTop: 2,
                  marginBottom: 2,
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
