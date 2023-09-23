import React, { useEffect, useState } from 'react'

import { TextField } from '@gravis-os/fields'
import {
  FilterDef,
  FilterDefOptionValue,
  FilterDefTypeEnum,
  UseFilterDefsReturn,
  useRouterQuery,
} from '@gravis-os/query'
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
import startCase from 'lodash/startCase'

export interface FilterAccordionOptionInterface {
  key: string
  label: string
  value: FilterDefOptionValue
}

export interface FilterAccordionProps extends FilterDef {
  accordionProps?: Omit<AccordionProps, 'children'>
  activeOptionLabels?: unknown[]
  useFilterDefsProps?: UseFilterDefsReturn
}

export interface CommonRenderProps extends Omit<FilterDef, 'key'> {
  filterChips?: UseFilterDefsReturn['filterChips']
}
export interface RenderOptionProps extends CommonRenderProps {
  activeOptionLabels: FilterAccordionProps['activeOptionLabels']
  handleCheckboxChange: (option: FilterAccordionOptionInterface) => void
  options: FilterAccordionOptionInterface[]
}
const renderCheckboxes = (props: RenderOptionProps) => {
  const { activeOptionLabels, handleCheckboxChange, op, options } = props
  if (!options?.length) return null
  return (
    <FormGroup>
      {options.map((option) => {
        const { key, label, value } = option
        const isChecked = activeOptionLabels.includes(`${op}.${value}`)
        return (
          <FormControlLabel
            checked={isChecked}
            componentsProps={{
              typography: { variant: 'body2' },
            }}
            control={<Checkbox size="small" />}
            key={key}
            label={label}
            onChange={() => handleCheckboxChange(option)}
            sx={{
              '&:active': { backgroundColor: 'action.selected' },
              '&:hover': { backgroundColor: 'action.hover' },
            }}
          />
        )
      })}
    </FormGroup>
  )
}

export interface RenderInputProps extends CommonRenderProps {
  handleInputChange: (inputValue: string) => void
}
const renderInput = (props: RenderInputProps) => {
  const { filterChips, handleInputChange, label, name } = props

  const currentFilterChip = filterChips?.find(
    (filterChip) => filterChip.key === name
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(
      (new FormData(e.target) as any).entries()
    )
    const inputValue = formData[name]
    return handleInputChange(inputValue)
  }

  // Intentionally keeping this field uncontrolled because we don't want to mount the state up
  const defaultValue =
    typeof currentFilterChip?.value === 'string'
      ? currentFilterChip?.value.replaceAll('%', '').replace('ilike.', '')
      : ''

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        defaultValue={defaultValue}
        disableLabel
        // Add a key to force re-render when the defaultValue changes
        key={defaultValue}
        name={name}
        placeholder={startCase(typeof label === 'string' ? label : name)}
        size="small"
      />
    </form>
  )
}

const FilterAccordion: React.FC<FilterAccordionProps> = (props) => {
  const {
    accordionProps = {},
    activeOptionLabels,
    label,
    name,
    op,
    options,
    type = 'checkbox',
    useFilterDefsProps,
  } = props
  const { defaultExpanded } = accordionProps

  // Expanded
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const handleChange = () => setIsExpanded(!isExpanded)
  useEffect(() => {
    setIsExpanded(defaultExpanded)
  }, [defaultExpanded])

  // Methods
  const { replaceQueryString, toggleQueryString } = useRouterQuery()

  const handleInputChange = (inputValue) => {
    if (!inputValue) return

    const newQsItem = { [name]: `${op}.%${inputValue}%` }
    return replaceQueryString(newQsItem)
  }

  const handleCheckboxChange = (option: FilterAccordionOptionInterface) => {
    const newQsItem = { [name]: `${op}.${option.value}` }
    return toggleQueryString(newQsItem)
  }

  const { filterChips } = useFilterDefsProps || {}
  const commonRenderProps = { filterChips, label, name, op }
  const renderInputProps = {
    ...commonRenderProps,
    handleInputChange,
  }
  const renderOptionProps = {
    ...commonRenderProps,
    activeOptionLabels,
    handleCheckboxChange,
    options,
  }

  const renderChildren = () => {
    switch (type) {
      case FilterDefTypeEnum.Input: {
        return renderInput(renderInputProps)
      }
      case FilterDefTypeEnum.Checkbox:
      default: {
        return renderCheckboxes(renderOptionProps)
      }
    }
  }

  return (
    <Accordion
      disableGutters
      expanded={isExpanded}
      onChange={handleChange}
      {...accordionProps}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ fontSize: 'overline.fontSize' }} />}
        sx={{
          '&:active': { backgroundColor: 'action.selected' },
          '&:hover': { backgroundColor: 'action.hover' },
          px: { xs: 2, md: 3 },
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          sx={{
            pr: 1,
            width: '100%',
          }}
        >
          <Typography variant="overline">{label}</Typography>
          {activeOptionLabels.length > 0 && (
            <Chip
              color="primary"
              label={activeOptionLabels.length}
              size="small"
              sx={{
                '& .MuiChip-label': {
                  pl: 0,
                  pr: 0,
                },
                fontSize: 'caption.fontSize',
                fontWeight: 'bold',
                height: (theme) =>
                  theme.spacing(activeOptionLabels.length >= 10 ? 2.5 : 2),
                width: (theme) =>
                  theme.spacing(activeOptionLabels.length >= 10 ? 2.5 : 2),
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
        {renderChildren()}
      </AccordionDetails>
    </Accordion>
  )
}

export default FilterAccordion
