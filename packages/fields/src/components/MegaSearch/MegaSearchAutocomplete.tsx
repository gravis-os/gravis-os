import { ControllerProps } from 'react-hook-form'
import {
  Autocomplete,
  AutocompleteProps,
  IconProps,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material'
import React from 'react'
import { SxProps } from '@mui/system'
import { omit } from 'lodash'

// Constants
const marginBetweenAutocompleteIconAndText = 1
const paddingXInAutocomplete = 2
const marginTopInAutocomplete = 5

export interface MegaSearchAutocompleteProps {
  key: string
  control?: ControllerProps<any, any>['control']
  name: string
  options: Partial<AutocompleteProps<any, any, any, any>['options']>
  Icon?: React.JSXElementConstructor<IconProps>
  sx?: SxProps
  autocompleteProps?: Partial<AutocompleteProps<any, any, any, any>>
  textFieldProps?: Partial<TextFieldProps>
  label: string
  placeholder: string
  title?: React.ReactNode
  onChange?: any
  value?: any
  TextFieldElement?: React.JSXElementConstructor<any>
}

const MegaSearchAutocomplete: React.FC<MegaSearchAutocompleteProps> = (
  props
) => {
  const {
    name,
    title,
    options,
    Icon,
    sx,
    autocompleteProps,
    textFieldProps,
    onChange,
    value,
    TextFieldElement = TextField,
    ...rest
  } = props

  const iconSpacing = Icon ? 4 : 0
  const textFieldSx = {
    // Icon
    '& .MuiInputAdornment-root': { mt: -marginTopInAutocomplete },
    // Overline
    '& label': {
      marginTop: marginTopInAutocomplete / 2,
      fontSize: 'h6.fontSize',
      left: (theme) =>
        theme.spacing(
          iconSpacing +
            marginBetweenAutocompleteIconAndText +
            paddingXInAutocomplete
        ),
      color: 'text.secondary',
      ...sx?.['& label'],
    },
    // Placeholder
    '& input::placeholder': {
      fontWeight: 'bold',
      color: 'text.primary',
      opacity: 1,
      ...sx?.['& input::placeholder'],
    },
    // Placeholder onFocus
    '& input:focus::placeholder': {
      opacity: 0.4,
    },
    // Text Input Wrapper
    '&& .MuiInput-root': {
      paddingLeft: paddingXInAutocomplete,
      paddingRight: paddingXInAutocomplete,
      marginTop: marginTopInAutocomplete,
      // Caret
      '& .MuiAutocomplete-endAdornment': {
        right: (theme) => theme.spacing(paddingXInAutocomplete),
        mt: -marginTopInAutocomplete / 2,
      },
      '&:before, &:hover:before': { borderBottom: 0 },
    },
    // Text Input
    '&& .MuiInput-input': {
      marginLeft: marginBetweenAutocompleteIconAndText,
      padding: (theme) => theme.spacing(0.5, 2, 2, 0),
      fontWeight: 'bold',
      // Cursor
      '&:not(:focus)': { cursor: 'pointer' },
      ...sx?.['&& .MuiInput-input'],
    },
  }

  return (
    <Autocomplete
      disablePortal
      options={options}
      fullWidth
      value={value}
      onChange={(e, newValue: any) => onChange?.(newValue?.value || newValue)}
      renderInput={(params) => (
        <TextFieldElement
          {...params}
          InputProps={{
            ...textFieldProps?.InputProps,
            ...params.InputProps,
            ...(Icon && {
              startAdornment: (
                <InputAdornment position="start">
                  <Icon color="secondary" />
                </InputAdornment>
              ),
            }),
          }}
          InputLabelProps={{
            shrink: true,
            ...params?.InputLabelProps,
          }}
          fullWidth
          variant="standard"
          sx={{
            // Overrides
            ...sx,
            ...textFieldSx,
          }}
          {...rest}
          {...omit(textFieldProps, ['InputProps'])}
        />
      )}
      {...autocompleteProps}
    />
  )
}

export default MegaSearchAutocomplete
