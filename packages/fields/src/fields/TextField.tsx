import React, { useEffect, useRef } from 'react'
import startCase from 'lodash/startCase'
import isNil from 'lodash/isNil'
import {
  InputAdornment,
  TextField as MuiTextField,
  StandardTextFieldProps as MuiTextFieldProps,
} from '@mui/material'
import type { UseFormReturn } from 'react-hook-form'
import { Box, Typography, TypographyProps } from '@gravis-os/ui'

interface OptionItem {
  key: string
  value: any
  label: string
}

export interface TextFieldProps extends Omit<MuiTextFieldProps, 'title'> {
  focus?: boolean
  options?: string[] | OptionItem[]
  disableLabel?: boolean
  disableBorders?: boolean
  setValue?: UseFormReturn['setValue']
  title?: React.ReactNode
  start?: React.ReactNode
  end?: React.ReactNode
  titleProps?: TypographyProps
}

const TextField: React.FC<TextFieldProps> = (props) => {
  const {
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
    ...rest
  } = props
  const { name, value, setValue, required } = rest

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
      ...(!isNil(value) ? { shrink: Boolean(value) } : {}),
    },
    sx: {
      ...sx,
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
    if (!options || hasDefaultValue) return

    // Set defaultValue of options
    const isObjectOption = typeof options[0] === 'object'

    // Get the first value of the options to set as the defaultValue
    const defaultOption = isObjectOption
      ? (options[0] as OptionItem).value
      : options[0]

    // Set the formState upstream with the defaultOption
    if (setValue) setValue(name, defaultOption)
  }, [options])

  // Prepare children
  const renderChildren = () => {
    switch (true) {
      case Boolean(options):
        return (
          <MuiTextField
            {...textFieldProps}
            select
            SelectProps={{ native: true }}
          >
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
        )
      default:
        return <MuiTextField {...textFieldProps} />
    }
  }
  const childrenJsx = renderChildren()

  return (
    <Box sx={{ width: '100%' }}>
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
