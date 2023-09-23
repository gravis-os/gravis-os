/* eslint-disable @typescript-eslint/no-var-requires */
import React, { ReactNode, useEffect, useState } from 'react'

import { Autocomplete, AutocompleteProps } from '@mui/material'
import codes from 'country-calling-code'
import isEqual from 'lodash/isEqual'
import sortBy from 'lodash/sortBy'
import startCase from 'lodash/startCase'
import uniqBy from 'lodash/uniqBy'

import TextField, { TextFieldProps } from './TextField'

export const COUNTRY_OPTIONS = sortBy(
  codes.map((code) => ({
    countryCode: code.isoCode2,
    countryName: code.country,
  })),
  'countryName'
)

export type GetOptionLabelArgs = {
  countryCode: string
  countryName: string
}

export interface CountryFieldProps
  extends Partial<
    Omit<
      AutocompleteProps<any, boolean, boolean, boolean>,
      'getOptionLabel' | 'onChange'
    >
  > {
  getOptionLabel?: (args: GetOptionLabelArgs) => string
  label?: ReactNode
  name: string
  onChange?: (data: null | string) => void
  priorityCountries?: string[]
  required?: boolean
  textFieldProps?: TextFieldProps
}

const CountryField: React.FC<CountryFieldProps> = (props) => {
  const {
    defaultValue: injectedDefaultValue,
    getOptionLabel,
    label: injectedlabel,
    name,
    onChange: injectedOnChange,
    priorityCountries,
    required,
    textFieldProps,
    value: injectedValue,
    ...rest
  } = props

  const label = injectedlabel || startCase(name)

  // Options
  const defaultOptions = COUNTRY_OPTIONS.map((option: GetOptionLabelArgs) => {
    const { countryName } = option
    return {
      label: getOptionLabel?.(option) || countryName,
      value: countryName,
    }
  })
  const hasPriorityCountries = Boolean(priorityCountries?.length)
  const priorityCountriesOptions = hasPriorityCountries
    ? priorityCountries
        .map((priorityCountry) =>
          defaultOptions.find((option) => option.value === priorityCountry)
        )
        .filter(Boolean)
    : []
  const options = uniqBy(
    [...priorityCountriesOptions, ...defaultOptions],
    'label'
  ) as { label: string; value: string }[]
  const [defaultOption] = options || []

  // Utils
  const getOptionFromInjectedValue = (injectedValue) =>
    options?.find((option) => option.value === injectedValue)

  // States
  const [selectedOption, setSelectedOption] = useState(
    getOptionFromInjectedValue(injectedDefaultValue) ?? defaultOption
  )
  const { value } = selectedOption || {}

  // Handlers
  const handleOnChange = (data) => {
    setSelectedOption(data)
    if (injectedOnChange) injectedOnChange(data?.value ?? null)
  }

  const handleSetValueFromInjectedValue = (injectedValue) => {
    const nextValue = getOptionFromInjectedValue(injectedValue)
    setSelectedOption(nextValue)
  }

  // Side Effects
  useEffect(() => {
    if (!isEqual(value, injectedDefaultValue))
      handleSetValueFromInjectedValue(injectedDefaultValue)
  }, [injectedDefaultValue])

  // Update local value when injected value change e.g. from React Hook Form setValue
  useEffect(() => {
    if (!isEqual(value, injectedValue))
      handleSetValueFromInjectedValue(injectedValue)
  }, [injectedValue])

  return (
    <Autocomplete
      {...rest}
      onChange={(e, data) => handleOnChange(data)}
      options={options}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            inputProps={
              {
                ...params?.inputProps,
                ...(required && { required: true }),
              } as TextFieldProps['inputProps']
            }
            label={label}
            name={name}
            {...(required && { required: true })}
            {...textFieldProps}
          />
        )
      }}
      value={selectedOption}
    />
  )
}

export default CountryField
