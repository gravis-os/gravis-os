import React from 'react'
import startCase from 'lodash/startCase'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'
import {
  FormHelperText,
  FormLabelProps,
  SxProps,
  Typography,
  TypographyProps,
} from '@mui/material'
import { FormState } from 'react-hook-form'

export interface CheckboxGroupProps {
  checkboxProps?: CheckboxProps
  disableLabel?: boolean
  row?: boolean
  required?: boolean
  error?: boolean
  label?: string
  name: string
  options: string[] | Array<{ key: string; value: string; label: string }>
  onChange?: (params: any) => void
  value?: any[]
  sx?: SxProps
  typographyProps?: TypographyProps
  titleProps?: TypographyProps
  labelProps?: Omit<FormLabelProps, 'ref'>
  formState: FormState<any>
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = (props) => {
  const {
    formState,
    checkboxProps,
    disableLabel,
    label: injectedLabel,
    onChange: injectedOnChange,
    typographyProps,
    labelProps,
    titleProps,
    options,
    value: injectedValue = [],
    name,
    row,
    required,
    error,
    sx,
  } = props

  const { errors } = formState
  const label = injectedLabel || startCase(name)

  return (
    <FormControl
      required={required}
      error={error}
      component="fieldset"
      variant="standard"
      sx={sx}
    >
      {!disableLabel && (
        <FormLabel component="legend" {...labelProps}>
          <Typography display="inline-block" {...titleProps}>
            {label}
          </Typography>
        </FormLabel>
      )}

      <FormGroup row={row}>
        {options?.map((injectedOption) => {
          const option =
            typeof injectedOption === 'string'
              ? {
                  key: injectedOption,
                  value: injectedOption,
                  label: injectedOption,
                }
              : injectedOption
          const { key, value, label: injectedLabel } = option

          return (
            <FormControlLabel
              key={key}
              label={
                <Typography variant="body1" {...typographyProps}>
                  {injectedLabel || startCase(key)}
                </Typography>
              }
              control={
                <Checkbox
                  checked={injectedValue
                    .map(({ value }) => value)
                    .includes(value)}
                  onChange={() => {
                    const injectedValues = injectedValue.map(
                      ({ value }) => value
                    )
                    const isExistingValue = injectedValues.includes(value)

                    const nextValue = isExistingValue
                      ? injectedValue.filter(
                          ({ value }) => value !== option.value
                        )
                      : [...injectedValue, option]

                    return injectedOnChange(nextValue)
                  }}
                  {...checkboxProps}
                  sx={{
                    p: ({ spacing }) => ({ xs: spacing(0.5, 1), md: 1 }),
                    ...checkboxProps?.sx,
                  }}
                />
              }
            />
          )
        })}
      </FormGroup>

      {errors?.[name]?.type === 'required' && (
        <FormHelperText error>This field is required.</FormHelperText>
      )}
    </FormControl>
  )
}

export default CheckboxGroup