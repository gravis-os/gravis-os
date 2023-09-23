import React from 'react'
import { ControllerProps } from 'react-hook-form'

import {
  Autocomplete,
  AutocompleteProps,
  IconProps,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material'
import { SxProps } from '@mui/system'

// Constants
const marginBetweenAutocompleteIconAndText = 1
const paddingXInAutocomplete = 2
const marginTopInAutocomplete = 5

export interface MegaSearchAutocompleteProps {
  Icon?: React.JSXElementConstructor<IconProps>
  TextFieldElement?: React.JSXElementConstructor<any>
  autocompleteProps?: Partial<AutocompleteProps<any, any, any, any>>
  control?: ControllerProps<any, any>['control']
  key: string
  label: string
  name: string
  onChange?: any
  options: Partial<AutocompleteProps<any, any, any, any>['options']>
  placeholder: string
  sx?: SxProps
  textFieldProps?: Partial<TextFieldProps>
  title?: React.ReactNode
  value?: any
}

const MegaSearchAutocomplete: React.FC<MegaSearchAutocompleteProps> = (
  props
) => {
  const {
    title,
    autocompleteProps,
    Icon,
    name,
    onChange,
    options,
    sx,
    TextFieldElement = TextField,
    textFieldProps,
    value,
    ...rest
  } = props

  const iconSpacing = Icon ? 4 : 0
  const textFieldSx = {
    // Icon
    '& .MuiInputAdornment-root': { mt: -marginTopInAutocomplete },
    // Placeholder
    '& input::placeholder': {
      color: 'text.primary',
      fontWeight: 'bold',
      opacity: 1,
      ...sx?.['& input::placeholder'],
    },
    // Placeholder onFocus
    '& input:focus::placeholder': {
      opacity: 0.4,
    },
    // Overline
    '& label': {
      color: 'text.secondary',
      fontSize: 'h6.fontSize',
      left: (theme) =>
        theme.spacing(
          iconSpacing +
            marginBetweenAutocompleteIconAndText +
            paddingXInAutocomplete
        ),
      marginTop: marginTopInAutocomplete / 2,
      ...sx?.['& label'],
    },
    // Text Input
    '&& .MuiInput-input': {
      // Cursor
      '&:not(:focus)': { cursor: 'pointer' },
      fontWeight: 'bold',
      marginLeft: marginBetweenAutocompleteIconAndText,
      padding: (theme) => theme.spacing(0.5, 2, 0.5, 0),
      ...sx?.['&& .MuiInput-input'],
    },
    // Text Input Wrapper
    '&& .MuiInput-root': {
      // Caret
      '& .MuiAutocomplete-endAdornment': {
        mt: -marginTopInAutocomplete / 2,
        right: (theme) => theme.spacing(paddingXInAutocomplete),
      },
      '&:before, &:hover:before': { borderBottom: 0 },
      marginTop: marginTopInAutocomplete,
      paddingLeft: paddingXInAutocomplete,
      paddingRight: paddingXInAutocomplete,
      pb: 1.5,
    },
  }

  return (
    <Autocomplete
      disablePortal
      fullWidth
      onChange={(e, newValue: any, reason) =>
        onChange?.(e, newValue?.value || newValue, reason)
      }
      options={options}
      renderInput={(params) => {
        return (
          <TextFieldElement
            {...params}
            InputLabelProps={{
              shrink: true,
              ...params?.InputLabelProps,
            }}
            fullWidth
            sx={{ ...sx, ...textFieldSx }}
            value={value}
            variant="standard"
            {...rest}
            {...textFieldProps}
            InputProps={{
              ...params.InputProps,
              ...textFieldProps?.InputProps,
              ...(Icon && {
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <Icon color="secondary" />
                    </InputAdornment>
                    {params.InputProps?.startAdornment}
                    {textFieldProps?.InputProps?.startAdornment}
                  </>
                ),
              }),
            }}
          />
        )
      }}
      value={value}
      {...autocompleteProps}
    />
  )
}

export default MegaSearchAutocomplete
