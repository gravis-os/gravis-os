import {
  Autocomplete,
  AutocompleteProps,
  Button,
  ButtonProps,
  Divider,
  IconProps,
  InputAdornment,
  Stack,
  StackProps,
  TextField,
  TextFieldProps,
} from '@mui/material'
import { SxProps } from '@mui/system'
import React from 'react'
import { ControllerProps, Controller } from 'react-hook-form'

// Styles
const marginBetweenAutocompleteIconAndText = 1
const paddingXInAutocomplete = 2
const marginTopInAutocomplete = 5
const textFieldSx = {
  // Icon
  '& .MuiInputAdornment-root': { mt: -marginTopInAutocomplete },
  // Overline
  '& label': {
    marginTop: marginTopInAutocomplete / 2,
    fontSize: 'h6.fontSize',
    left: (theme) =>
      theme.spacing(
        4 + marginBetweenAutocompleteIconAndText + paddingXInAutocomplete
      ),
    color: 'text.secondary',
  },
  // Placeholder
  '& input::placeholder': {
    fontWeight: 'bold',
    color: 'text.primary',
    opacity: 1,
  },
  // Placeholder onFocus
  '& input:focus::placeholder': {
    opacity: 0.4,
  },
  // Text Input Wrapper
  '&& .MuiInput-root': {
    paddingLeft: paddingXInAutocomplete,
    paddingRight: paddingXInAutocomplete + 4,
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
  },
}

interface MegaSearchAutocompleteProps {
  control?: ControllerProps<any, any>['control']
  name: string
  options: AutocompleteProps<any, any, any, any>['options']
  Icon: React.JSXElementConstructor<IconProps>
  sx?: SxProps
  AutocompleteProps?: Partial<AutocompleteProps<any, any, any, any>>
  label: string
  placeholder: string
}

const MegaSearchAutocomplete: React.FC<
  MegaSearchAutocompleteProps & TextFieldProps
> = (props) => {
  const {
    name,
    title,
    options,
    Icon,
    sx,
    AutocompleteProps,
    onChange,
    value,
    ...rest
  } = props

  return (
    <Autocomplete
      disablePortal
      options={options}
      fullWidth
      value={value}
      onChange={(e, newValue) => onChange?.(newValue?.value || newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Icon color="secondary" />
              </InputAdornment>
            ),
          }}
          fullWidth
          variant="standard"
          sx={{
            ...textFieldSx,
            // Overrides
            ...sx,
          }}
          {...rest}
        />
      )}
      {...AutocompleteProps}
    />
  )
}

export interface MegaSearchProps extends StackProps {
  ButtonProps?: ButtonProps
  dropdowns?: MegaSearchAutocompleteProps[]
}

const MegaSearch: React.FC<MegaSearchProps> = (props) => {
  const { dropdowns, ButtonProps, sx } = props

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems="center"
      divider={<Divider orientation="vertical" flexItem />}
      sx={{ background: 'white', borderRadius: 2, ...sx }}
    >
      {dropdowns.map((dropdown) => {
        const { control, ...rest } = dropdown
        const { name } = dropdown
        const dropdownJSX = <MegaSearchAutocomplete key={name} {...rest} />

        if (control) {
          return (
            <Controller
              name={name}
              control={control}
              render={(params) => {
                return (
                  <MegaSearchAutocomplete
                    key={dropdown.name}
                    {...rest}
                    {...params}
                  />
                )
              }}
            />
          )
        }

        return dropdownJSX
      })}
      <Button
        sx={{
          height: '100%',
          maxWidth: (theme) => ({
            xs: `calc(100% - ${theme.spacing(4)})`,
            md: 200,
          }),
          minHeight: 60,
          mx: { xs: 4, md: 2 },
          my: { xs: 2, md: 0 },
          ...ButtonProps?.sx,
        }}
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        type="submit"
        {...ButtonProps}
      >
        Search
      </Button>
    </Stack>
  )
}

export default MegaSearch
