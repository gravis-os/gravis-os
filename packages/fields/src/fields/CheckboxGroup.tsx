import React from 'react'
import { FormState } from 'react-hook-form'

import {
  FormHelperText,
  FormLabelProps,
  SxProps,
  Typography,
  TypographyProps,
} from '@mui/material'
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import startCase from 'lodash/startCase'

export interface CheckboxGroupProps {
  checkboxProps?: CheckboxProps
  disableLabel?: boolean
  error?: boolean
  // Required when using in Controller
  formState?: FormState<any>
  label?: string
  labelProps?: Omit<FormLabelProps, 'ref'>
  name: string
  onChange?: (option, { e, isChecked, params }: any) => void
  options: Array<{ key: string; label: string; value: any } | string>
  required?: boolean
  row?: boolean
  sx?: SxProps
  titleProps?: TypographyProps
  typographyProps?: TypographyProps
  value?: any[]
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = (props) => {
  const {
    checkboxProps,
    disableLabel,
    error,
    formState,
    label: injectedLabel,
    labelProps,
    name,
    onChange: injectedOnChange,
    options,
    required,
    row,
    sx,
    titleProps,
    typographyProps,
    value: injectedValue = [],
  } = props

  const { errors } = formState || {}
  const label = injectedLabel || startCase(name)

  return (
    <FormControl
      component="fieldset"
      error={error}
      required={required}
      sx={sx}
      variant="standard"
    >
      {!disableLabel && (
        <FormLabel component="legend" {...labelProps}>
          <Typography display="inline-block" {...titleProps}>
            {label}
          </Typography>
        </FormLabel>
      )}

      <FormGroup row={row}>
        {options?.map((injectedOption, index) => {
          const option =
            typeof injectedOption === 'string'
              ? {
                  key: injectedOption,
                  label: injectedOption,
                  value: injectedOption,
                }
              : injectedOption
          const { key, label: injectedLabel, value } = option

          const isChecked = injectedValue.some((item) => item.value === value)

          return (
            <FormControlLabel
              control={
                <Checkbox
                  checked={isChecked}
                  onChange={(e) => {
                    const injectedValues = injectedValue.map(
                      ({ value }) => value
                    )
                    const isExistingValue = injectedValues.includes(value)

                    const nextValue = isExistingValue
                      ? injectedValue.filter(
                          // eslint-disable-next-line unicorn/consistent-destructuring
                          ({ value }) => value !== option.value
                        )
                      : [...injectedValue, option]

                    // By default we assume this onChange will be used with a Controller.
                    // If this is not the case, we will pass the event and params along in the second argument.
                    return injectedOnChange(nextValue, {
                      e,
                      isChecked,
                      params: { checked: e.target.checked, event: e, key },
                    })
                  }}
                  {...checkboxProps}
                  sx={{
                    p: ({ spacing }) => ({ xs: spacing(0.5, 1), md: 1 }),
                    ...checkboxProps?.sx,
                  }}
                />
              }
              key={key}
              label={
                <Typography variant="body1" {...typographyProps}>
                  {injectedLabel || startCase(key)}
                </Typography>
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
