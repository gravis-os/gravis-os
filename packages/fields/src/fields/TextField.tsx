import React, { useEffect, useRef } from 'react'
import startCase from 'lodash/startCase'
import isNil from 'lodash/isNil'
import {
  FormControl,
  InputAdornment,
  TextField as MuiTextField,
  StandardTextFieldProps as MuiTextFieldProps,
} from '@mui/material'
import type { UseFormReturn } from 'react-hook-form'
import { Box, Typography, TypographyProps } from '@gravis-os/ui'

export interface TextFieldOptionItem {
  key: string
  value: any
  label: string
}

export interface TextFieldProps extends Omit<MuiTextFieldProps, 'title'> {
  focus?: boolean
  options?: Array<string | TextFieldOptionItem>
  disableLabel?: boolean
  disableBorders?: boolean
  disableFirstOptionAsDefaultValue?: boolean
  setValue?: UseFormReturn['setValue']
  title?: React.ReactNode
  start?: React.ReactNode
  end?: React.ReactNode
  titleProps?: TypographyProps
  backgroundColor?: string
}

const TextField: React.FC<TextFieldProps> = (props) => {
  const {
    disableFirstOptionAsDefaultValue,
    disableBorders,
    disableLabel,
    options,
    InputLabelProps,
    sx,
    hidden,
    inputProps,
    title,
    titleProps,
    focus,
    start,
    end,
    InputProps,
    backgroundColor,
    ...rest
  } = props
  const { placeholder, name, value, setValue, required, error } = rest

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
    variant: 'outlined' as TextFieldProps['variant'],
    label: title || hidden || disableLabel ? null : startCase(name),
    inputRef,
    fullWidth: true,
    InputLabelProps: {
      ...InputLabelProps,
      ...(!isNil(value)
        ? {
            shrink: typeof value === 'boolean' ? true : Boolean(value),
          }
        : {}),
    },
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
    /// Hidden
    inputProps: {
      ...(hidden && { type: 'hidden' }),
      ...inputProps,
    },
    hiddenLabel: hidden,

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
      case Boolean(options):
        return (
          <FormControl
            required={required}
            error={error}
            component="fieldset"
            sx={{ width: '100%' }}
          >
            <MuiTextField
              {...textFieldProps}
              select
              SelectProps={{ native: true }}
            >
              {disableFirstOptionAsDefaultValue && (
                <option key="placeholder" disabled value="" />
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

      default:
        return <MuiTextField {...textFieldProps} />
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
