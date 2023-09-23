/* eslint-disable @typescript-eslint/no-var-requires */
import React, { ReactNode, useEffect, useState } from 'react'

import { Autocomplete, AutocompleteProps } from '@mui/material'
import codes from 'country-calling-code'
import isEqual from 'lodash/isEqual'
import sortBy from 'lodash/sortBy'
import startCase from 'lodash/startCase'
import uniqBy from 'lodash/uniqBy'

import TextField, { TextFieldProps } from './TextField'

export const PHONE_EXT_CODE_OPTIONS = sortBy(
  codes.map((code) => ({
    countryCode: code.isoCode2,
    countryName: code.country,
    phoneExtCode: Number(code.countryCodes[0]).toString(),
  })),
  'phoneExtCode'
)

export type GetOptionLabelArgs = {
  countryCode: string
  countryName: string
  phoneExtCode: string
}

export interface CountryCodeFieldProps
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
  priorityExtCodes?: string[]
  required?: boolean
  showCountry?: boolean
  textFieldProps?: TextFieldProps
}

const CountryCodeField: React.FC<CountryCodeFieldProps> = (props) => {
  const {
    defaultValue: injectedDefaultValue,
    getOptionLabel,
    label: injectedlabel,
    name,
    onChange: injectedOnChange,
    priorityExtCodes,
    required,
    showCountry,
    textFieldProps,
    value: injectedValue,
    ...rest
  } = props

  const label = injectedlabel || startCase(name)

  // Options
  const defaultOptions = PHONE_EXT_CODE_OPTIONS.map(
    (option: GetOptionLabelArgs) => {
      const { countryName, phoneExtCode } = option
      return {
        label:
          getOptionLabel?.(option) ||
          (showCountry
            ? `(+${phoneExtCode}) ${countryName}`
            : `+${phoneExtCode}`),
        value: String(phoneExtCode),
      }
    }
  )
  const hasPriorityExtCodes = Boolean(priorityExtCodes?.length)
  const priorityExtCodesOptions = hasPriorityExtCodes
    ? priorityExtCodes
        .map((priorityExtCode) =>
          defaultOptions.find((option) => option.value === priorityExtCode)
        )
        .filter(Boolean)
    : []
  const options = uniqBy(
    [...priorityExtCodesOptions, ...defaultOptions],
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

export default CountryCodeField
