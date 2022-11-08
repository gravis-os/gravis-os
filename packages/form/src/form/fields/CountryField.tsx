/* eslint-disable @typescript-eslint/no-var-requires */
import React, { ReactNode, useEffect, useState } from 'react'
import sortBy from 'lodash/sortBy'
import isEqual from 'lodash/isEqual'
import startCase from 'lodash/startCase'
import uniqBy from 'lodash/uniqBy'
import { Autocomplete, AutocompleteProps } from '@mui/material'
import TextField, { TextFieldProps } from './TextField'

const countries = require('i18n-iso-countries')
countries.registerLocale(require('i18n-iso-countries/langs/en.json'))

export const COUNTRY_OPTIONS = sortBy(
  Object.entries(countries.getNames('en')).map(
    ([countryCode, countryName]) => ({
      countryName,
      countryCode,
    })
  ),
  'countryName'
)

export type GetOptionLabelArgs = {
  countryName: string
  countryCode: string
}

export interface CountryFieldProps
  extends Partial<
    Omit<
      AutocompleteProps<any, boolean, boolean, boolean>,
      'getOptionLabel' | 'onChange'
    >
  > {
  name: string
  label?: ReactNode
  priorityCountries?: string[]
  getOptionLabel?: (args: GetOptionLabelArgs) => string
  onChange?: (data: string | null) => void
  textFieldProps?: TextFieldProps
  required?: boolean
}

const CountryField: React.FC<CountryFieldProps> = (props) => {
  const {
    name,
    label: injectedlabel,
    required,
    priorityCountries,
    getOptionLabel,
    defaultValue: injectedDefaultValue,
    value: injectedValue,
    onChange: injectedOnChange,
    textFieldProps,
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

  useEffect(() => {
    if (!isEqual(value, injectedValue))
      handleSetValueFromInjectedValue(injectedValue)
  }, [injectedValue])

  return (
    <Autocomplete
      {...rest}
      value={selectedOption}
      options={options}
      onChange={(e, data) => handleOnChange(data)}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            name={name}
            label={label}
            inputProps={
              {
                ...params?.inputProps,
                ...(required && { required: true }),
              } as TextFieldProps['inputProps']
            }
            {...(required && { required: true })}
            {...textFieldProps}
          />
        )
      }}
    />
  )
}

export default CountryField
