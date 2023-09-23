import React, { ReactNode } from 'react'

import {
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormHelperText,
  FormHelperTextProps,
  FormLabel,
  FormLabelProps,
  RadioGroup as MuiRadioGroup,
  RadioGroupProps as MuiRadioGroupProps,
  Radio,
  RadioProps,
} from '@mui/material'
import pick from 'lodash/pick'
import startCase from 'lodash/startCase'

export interface RadioGroupProps extends MuiRadioGroupProps {
  compact?: boolean
  disableLabel?: boolean
  disabled?: boolean
  error?: boolean
  formControlLabelProps?: Omit<
    FormControlLabelProps,
    'control' | 'label' | 'value'
  >
  formControlProps?: FormControlProps

  formHelperTextProps?: FormHelperTextProps
  formLabelProps?: FormLabelProps
  helperText?: ReactNode | ReactNode[] | string
  label?: ReactNode | ReactNode[] | string
  name: string
  options:
    | {
        formControlLabelProps?: Omit<
          FormControlLabelProps,
          'control' | 'label' | 'value'
        >
        key: string
        label: string
        radioProps?: Omit<RadioProps, 'value'>
        value: MuiRadioGroupProps['value']
      }[]
    | string[]
  radioProps?: Omit<RadioProps, 'value'>
}

const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  const {
    compact,
    disabled,
    disableLabel,
    error,
    formControlLabelProps: injectedFormControlLabelProps,
    formControlProps,
    formHelperTextProps,
    formLabelProps,
    helperText,
    label: injectedLabel,
    name,
    options = [],
    radioProps: injectedRadioProps,
    sx,
    ...rest
  } = props

  const label = injectedLabel || startCase(name)

  return (
    <FormControl {...formControlProps}>
      {!disableLabel && <FormLabel {...formLabelProps}>{label}</FormLabel>}
      <MuiRadioGroup {...rest} sx={{ my: 1, ...sx }}>
        {options?.map((option) => {
          const formControlLabelProps =
            typeof option === 'string'
              ? {
                  key: option,
                  label: option,
                  value: option,
                }
              : {
                  ...pick(option, ['key', 'label', 'value']),
                  ...option.formControlLabelProps,
                }

          return (
            <FormControlLabel
              disabled={disabled}
              {...injectedFormControlLabelProps}
              {...formControlLabelProps}
              control={
                <Radio
                  {...injectedRadioProps}
                  {...option.radioProps}
                  sx={{
                    p: ({ spacing }) => ({
                      xs: spacing(0.5, 1),
                      md: spacing(compact ? 0.5 : 1, 1),
                    }),
                    ...injectedRadioProps?.sx,
                    ...option.radioProps?.sx,
                  }}
                />
              }
            />
          )
        })}
      </MuiRadioGroup>

      {Boolean(helperText) && (
        <FormHelperText
          {...formHelperTextProps}
          sx={{
            ...formHelperTextProps?.sx,
            color: error ? 'error.main' : 'initial',
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default RadioGroup
