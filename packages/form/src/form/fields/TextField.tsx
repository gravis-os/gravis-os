import React, { useEffect } from 'react'
import startCase from 'lodash/startCase'
import {
  TextField as MuiTextField,
  StandardTextFieldProps as MuiTextFieldProps,
} from '@mui/material'

interface OptionItem {
  key: string
  value: any
  label: string
}

export interface TextFieldProps extends MuiTextFieldProps {
  options?: string[] | OptionItem[]
  disableLabel?: boolean
  disableBorders?: boolean
}

const TextField: React.FC<TextFieldProps> = (props) => {
  const {
    disableBorders,
    disableLabel,
    options,
    InputLabelProps,
    sx,
    ...rest
  } = props
  const { name, onChange } = rest

  const textFieldProps = {
    label: !disableLabel ? startCase(name) : null,
    fullWidth: true,
    InputLabelProps: {
      ...InputLabelProps,
      ...(rest.value ? { shrink: Boolean(rest.value) } : {}),
    },
    sx: {
      ...sx,
      ...(disableBorders && {
        '& .MuiOutlinedInput-notchedOutline': { border: 0 },
      }),
    },
    ...rest,
  }

  // For options only
  useEffect(() => {
    if (!options) return

    // Set defaultValue of options
    const isObjectOption = typeof options[0] === 'object'
    const defaultOption = isObjectOption
      ? (options[0] as OptionItem).value
      : options[0]
    if (onChange) onChange(defaultOption)
  }, [options])

  if (options) {
    return (
      <MuiTextField {...textFieldProps} select SelectProps={{ native: true }}>
        {(options as any[]).map((option) => {
          const isObjectOption = typeof option === 'object'
          const pk = Object.keys(option).includes('title') ? 'title' : 'label'

          const key = isObjectOption ? option[pk] : option
          const value = isObjectOption ? option.value : option
          const label = isObjectOption ? option[pk] : startCase(option)

          const optionProps = isObjectOption ? option : {}

          return (
            <option key={key} value={value} {...optionProps}>
              {label}
            </option>
          )
        })}
      </MuiTextField>
    )
  }

  return <MuiTextField {...textFieldProps} />
}

export default TextField
