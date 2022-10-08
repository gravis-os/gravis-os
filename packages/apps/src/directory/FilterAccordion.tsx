import React, { useEffect, useState } from 'react'
import orderBy from 'lodash/orderBy'
import { Chip, Stack, Typography } from '@gravis-os/ui'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material'
import { useRouterQuery } from '@gravis-os/query'
import { UseFilterDefsReturn } from './useFilterDefs'
import { FilterDefOptionValue, FilterDef } from './types'

export interface FilterAccordionOptionInterface {
  key: string
  value: FilterDefOptionValue
  label: React.ReactNode
}

export interface FilterAccordionProps extends FilterDef {
  optionsSortOrder?: boolean | 'asc' | 'desc'
  children?: React.ReactNode
  activeOptionLabels?: unknown[]
  useFilterDefsProps?: UseFilterDefsReturn
  accordionProps?: Omit<AccordionProps, 'children'>
}

const FilterAccordion: React.FC<FilterAccordionProps> = (props) => {
  const {
    activeOptionLabels,
    label,
    children,
    options,
    name,
    optionsSortOrder = 'asc',
    useFilterDefsProps,
    op,
    accordionProps = {},
  } = props
  const { defaultExpanded } = accordionProps

  // Expanded
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const handleChange = () => setIsExpanded(!isExpanded)
  useEffect(() => {
    setIsExpanded(defaultExpanded)
  }, [defaultExpanded])

  // Methods
  const { toggleQueryString } = useRouterQuery()

  const handleCheckboxChange = (option: FilterAccordionOptionInterface) => {
    const newQsItem = { [name]: `${op}.${option.value}` }
    return toggleQueryString(newQsItem)
  }

  // Options
  const renderOptions = (options: FilterAccordionOptionInterface[]) => {
    return (
      <FormGroup>
        {orderBy(options, ['label'], [optionsSortOrder]).map((option) => {
          const { key, value, label } = option
          const isChecked = activeOptionLabels.includes(`${op}.${value}`)
          return (
            <FormControlLabel
              checked={isChecked}
              key={key}
              onChange={() => handleCheckboxChange(option)}
              control={<Checkbox size="small" />}
              label={label}
              componentsProps={{
                typography: { variant: 'body2' },
              }}
              sx={{
                '&:hover': { backgroundColor: 'action.hover' },
                '&:active': { backgroundColor: 'action.selected' },
              }}
            />
          )
        })}
      </FormGroup>
    )
  }

  return (
    <Accordion
      expanded={isExpanded}
      onChange={handleChange}
      disableGutters
      {...accordionProps}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ fontSize: 'overline.fontSize' }} />}
        sx={{
          px: { xs: 2, md: 3 },
          '&:hover': { backgroundColor: 'action.hover' },
          '&:active': { backgroundColor: 'action.selected' },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            width: '100%',
            pr: 1,
          }}
        >
          <Typography variant="overline">{label}</Typography>
          {activeOptionLabels.length > 0 && (
            <Chip
              label={activeOptionLabels.length}
              color="primary"
              size="small"
              sx={{
                width: (theme) =>
                  theme.spacing(activeOptionLabels.length >= 10 ? 2.5 : 2),
                height: (theme) =>
                  theme.spacing(activeOptionLabels.length >= 10 ? 2.5 : 2),
                fontSize: 'caption.fontSize',
                fontWeight: 'bold',
                '& .MuiChip-label': {
                  pl: 0,
                  pr: 0,
                },
              }}
            />
          )}
        </Stack>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          pt: 0,
          px: { xs: 2, md: 3 },
        }}
      >
        {children || renderOptions(options)}
      </AccordionDetails>
    </Accordion>
  )
}

export default FilterAccordion
