import type { UseFormReturn } from 'react-hook-form'

import React, { useEffect, useRef } from 'react'

import { Box, Typography, TypographyProps } from '@gravis-os/ui'
import {
  FormControl,
  InputAdornment,
  TextField as MuiTextField,
  StandardTextFieldProps as MuiTextFieldProps,
} from '@mui/material'
import isNil from 'lodash/isNil'
import startCase from 'lodash/startCase'

export interface TextFieldOptionItem {
  key: string
  label: string
  value: any
}

export interface TextFieldProps extends Omit<MuiTextFieldProps, 'title'> {
  backgroundColor?: string
  disableBorders?: boolean
  disableFirstOptionAsDefaultValue?: boolean
  disableLabel?: boolean
  end?: React.ReactNode
  focus?: boolean
  options?: Array<TextFieldOptionItem | string>
  setValue?: UseFormReturn['setValue']
  start?: React.ReactNode
  title?: React.ReactNode
  titleProps?: TypographyProps
}

const TextField: React.FC<TextFieldProps> = (props) => {
  const {
    title,
    backgroundColor,
    disableBorders,
    disableFirstOptionAsDefaultValue,
    disableLabel,
    end,
    focus,
    hidden,
    InputLabelProps,
    inputProps,
    InputProps,
    options,
    start,
    sx,
    titleProps,
    ...rest
  } = props
  const { error, name, placeholder, required, setValue, value } = rest

  // Autofocus
  // @link https://github.com/mui/material-ui/issues/7247#issuecomment-576032102
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (inputRef.current && focus) {
      inputRef.current.focus()
    }
  }, [focus, inputRef])

  // Define TextField props
  const textFieldProps = {
    fullWidth: true,
    hiddenLabel: hidden,
    InputLabelProps: {
      ...InputLabelProps,
      ...(isNil(value)
        ? {}
        : {
            shrink: typeof value === 'boolean' ? true : Boolean(value),
          }),
    },
    /// Hidden
    inputProps: {
      ...(hidden && { type: 'hidden' }),
      ...inputProps,
    },
    InputProps: {
      // Start/End Icon
      ...(start && {
        startAdornment: (
          <InputAdornment position="start">{start}</InputAdornment>
        ),
      }),
      ...(end && {
        endAdornment: <InputAdornment position="end">{end}</InputAdornment>,
      }),

      ...InputProps,
    },
    inputRef,
    label: title || hidden || disableLabel ? null : startCase(name),
    sx: {
      ...sx,

      ...(backgroundColor && {
        '& .MuiInputBase-root': { backgroundColor },
      }),

      ...(disableBorders && {
        '& .MuiOutlinedInput-notchedOutline': { border: 0 },
      }),
      ...(hidden && {
        '& fieldset': {
          visibility: 'hidden',
        },
      }),
    },

    variant: 'outlined' as TextFieldProps['variant'],

    ...rest,
  }

  // To set defaultValue of options in the formState on load
  useEffect(() => {
    const hasDefaultValue = Boolean(value)
    if (disableFirstOptionAsDefaultValue || !options || hasDefaultValue) return

    // Set defaultValue of options
    const isObjectOption = typeof options[0] === 'object'

    // Get the first value of the options to set as the defaultValue
    const defaultOption = isObjectOption
      ? (options[0] as TextFieldOptionItem).value
      : options[0]

    // Set the formState upstream with the defaultOption
    if (setValue) setValue(name, defaultOption)
  }, [options])

  // Prepare children
  const renderChildren = () => {
    switch (true) {
      case Boolean(options): {
        return (
          <FormControl
            component="fieldset"
            error={error}
            required={required}
            sx={{ width: '100%' }}
          >
            <MuiTextField
              {...textFieldProps}
              SelectProps={{ native: true }}
              select
            >
              {disableFirstOptionAsDefaultValue && (
                <option
                  aria-label="placeholder"
                  disabled
                  key="placeholder"
                  value=""
                />
              )}

              {(options as any[]).map((option) => {
                const isObjectOption = typeof option === 'object'
                const pk = Object.keys(option).includes('title')
                  ? 'title'
                  : 'label'

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
          </FormControl>
        )
      }

      default: {
        return <MuiTextField {...textFieldProps} />
      }
    }
  }
  const childrenJsx = renderChildren()

  return (
    <Box sx={{ width: '100%', ...(hidden && { position: 'absolute' }) }}>
      {title && (
        <Typography variant="subtitle1" {...titleProps}>
          {title}
          {required && (
            <Box component="span" sx={{ color: 'error.main' }}>
              *
            </Box>
          )}
        </Typography>
      )}
      {childrenJsx}
    </Box>
  )
}

export default TextField
