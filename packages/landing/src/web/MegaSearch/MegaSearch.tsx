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
} from '@mui/material'
import { SxProps } from '@mui/system'
import React from 'react'
import { ControllerProps, Controller } from 'react-hook-form'

// Styles
const marginBetweenAutocompleteIconAndText = 1
const paddingXInAutocomplete = 2
const marginTopInAutocomplete = 5

interface MegaSearchAutocompleteProps {
  control?: ControllerProps<any, any>['control']
  name: string
  options: Partial<AutocompleteProps<any, any, any, any>['options']>
  Icon?: React.JSXElementConstructor<IconProps>
  sx?: SxProps
  AutocompleteProps?: Partial<AutocompleteProps<any, any, any, any>>
  label: string
  placeholder: string
  title?: React.ReactNode
  onChange?: any
  value?: any
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
    AutocompleteProps,
    onChange,
    value,
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
        <TextField
          {...params}
          InputProps={{
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
        />
      )}
      {...AutocompleteProps}
    />
  )
}

export interface MegaSearchProps extends StackProps {
  ButtonProps?: ButtonProps
  dropdowns?: MegaSearchAutocompleteProps[]
  hideButton?: boolean
}

const MegaSearch: React.FC<MegaSearchProps> = (props) => {
  const { dropdowns, ButtonProps, sx, hideButton, ...rest } = props

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems="center"
      divider={<Divider orientation="vertical" flexItem />}
      sx={{ background: 'white', borderRadius: 2, ...sx }}
      {...rest}
    >
      {dropdowns.map((dropdown) => {
        const { control, onChange: injectedOnChange, ...rest } = dropdown
        const { name } = dropdown
        const dropdownJsx = (
          <MegaSearchAutocomplete
            key={name}
            onChange={injectedOnChange}
            {...rest}
          />
        )

        if (control) {
          return (
            <Controller
              name={name}
              control={control}
              render={({ field }) => {
                return (
                  <MegaSearchAutocomplete
                    key={name}
                    {...rest}
                    {...field}
                    onChange={(value) => {
                      if (injectedOnChange) injectedOnChange(value)
                      field.onChange(value)
                    }}
                  />
                )
              }}
            />
          )
        }

        return dropdownJsx
      })}
      {!hideButton && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          type="submit"
          {...ButtonProps}
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
        >
          {ButtonProps?.children ?? 'Search'}
        </Button>
      )}
    </Stack>
  )
}

export default MegaSearch
