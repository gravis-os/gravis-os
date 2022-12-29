import React, { useEffect, useState } from 'react'
import { Chip, Stack, Typography } from '@gravis-os/ui'
import { TextField } from '@gravis-os/fields'
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
import {
  useRouterQuery,
  FilterDef,
  FilterDefOptionValue,
  FilterDefTypeEnum,
  UseFilterDefsReturn,
} from '@gravis-os/query'
import startCase from 'lodash/startCase'

export interface FilterAccordionOptionInterface {
  key: string
  value: FilterDefOptionValue
  label: string
}

export interface FilterAccordionProps extends FilterDef {
  activeOptionLabels?: unknown[]
  useFilterDefsProps?: UseFilterDefsReturn
  accordionProps?: Omit<AccordionProps, 'children'>
}

export interface CommonRenderProps extends Omit<FilterDef, 'key'> {
  filterChips?: UseFilterDefsReturn['filterChips']
}
export interface RenderOptionProps extends CommonRenderProps {
  options: FilterAccordionOptionInterface[]
  activeOptionLabels: FilterAccordionProps['activeOptionLabels']
  handleCheckboxChange: (option: FilterAccordionOptionInterface) => void
}
const renderCheckboxes = (props: RenderOptionProps) => {
  const { activeOptionLabels, handleCheckboxChange, options, op } = props
  if (!options?.length) return null
  return (
    <FormGroup>
      {options.map((option) => {
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

export interface RenderInputProps extends CommonRenderProps {
  handleInputChange: (inputValue: string) => void
}
const renderInput = (props: RenderInputProps) => {
  const { name, label, handleInputChange, filterChips } = props

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
        // Add a key to force re-render when the defaultValue changes
        key={defaultValue}
        name={name}
        disableLabel
        defaultValue={defaultValue}
        size="small"
        placeholder={startCase(typeof label === 'string' ? label : name)}
      />
    </form>
  )
}

const FilterAccordion: React.FC<FilterAccordionProps> = (props) => {
  const {
    activeOptionLabels,
    label,
    type = 'checkbox',
    options,
    name,
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
  const { toggleQueryString, replaceQueryString } = useRouterQuery()

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
  const commonRenderProps = { name, op, label, filterChips }
  const renderInputProps = {
    ...commonRenderProps,
    handleInputChange,
  }
  const renderOptionProps = {
    ...commonRenderProps,
    activeOptionLabels,
    options,
    handleCheckboxChange,
  }

  const renderChildren = () => {
    switch (type) {
      case FilterDefTypeEnum.Input:
        return renderInput(renderInputProps)
      case FilterDefTypeEnum.Checkbox:
      default:
        return renderCheckboxes(renderOptionProps)
    }
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
        {renderChildren()}
      </AccordionDetails>
    </Accordion>
  )
}

export default FilterAccordion
