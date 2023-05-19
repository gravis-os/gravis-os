/* eslint-disable @typescript-eslint/no-var-requires */
import React, { ReactNode, useEffect, useState } from 'react'
import codes from 'country-calling-code'
import sortBy from 'lodash/sortBy'
import isEqual from 'lodash/isEqual'
import startCase from 'lodash/startCase'
import uniqBy from 'lodash/uniqBy'
import { Autocomplete, AutocompleteProps } from '@mui/material'
import TextField, { TextFieldProps } from './TextField'

export const PHONE_EXT_CODE_OPTIONS = sortBy(codes.map(code => ({
    countryName: code.country,
    countryCode: code.isoCode2,
    phoneExtCode: parseInt(code.countryCodes[0]).toString()
  })),
  'phoneExtCode'
)

export type GetOptionLabelArgs = {
  countryName: string
  countryCode: string
  phoneExtCode: string
}

export interface CountryCodeFieldProps
  extends Partial<
    Omit<
      AutocompleteProps<any, boolean, boolean, boolean>,
      'getOptionLabel' | 'onChange'
    >
  > {
  name: string
  label?: ReactNode
  priorityExtCodes?: string[]
  getOptionLabel?: (args: GetOptionLabelArgs) => string
  onChange?: (data: string | null) => void
  textFieldProps?: TextFieldProps
  required?: boolean
  showCountry?: boolean
}

const CountryCodeField: React.FC<CountryCodeFieldProps> = (props) => {
  const {
    name,
    label: injectedlabel,
    required,
    showCountry,
    priorityExtCodes,
    getOptionLabel,
    defaultValue: injectedDefaultValue,
    value: injectedValue,
    onChange: injectedOnChange,
    textFieldProps,
    ...rest
  } = props

  const label = injectedlabel || startCase(name)

  // Options
  const defaultOptions = PHONE_EXT_CODE_OPTIONS.map(
    (option: GetOptionLabelArgs) => {
      const { phoneExtCode, countryName } = option
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

export default CountryCodeField
