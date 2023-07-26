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
  Radio,
  RadioGroup as MuiRadioGroup,
  RadioGroupProps as MuiRadioGroupProps,
  RadioProps,
} from '@mui/material'
import pick from 'lodash/pick'
import startCase from 'lodash/startCase'

export interface RadioGroupProps extends MuiRadioGroupProps {
  name: string
  label?: string | ReactNode | ReactNode[]
  disableLabel?: boolean
  options:
    | string[]
    | {
        key: string
        label: string
        value: MuiRadioGroupProps['value']
        formControlLabelProps?: Omit<
          FormControlLabelProps,
          'control' | 'label' | 'value'
        >
        radioProps?: Omit<RadioProps, 'value'>
      }[]
  error?: boolean
  helperText?: string | ReactNode | ReactNode[]

  formControlLabelProps?: Omit<
    FormControlLabelProps,
    'control' | 'label' | 'value'
  >
  radioProps?: Omit<RadioProps, 'value'>
  formControlProps?: FormControlProps
  formLabelProps?: FormLabelProps
  formHelperTextProps?: FormHelperTextProps
  compact?: boolean
  disabled?: boolean
}

const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  const {
    name,
    label: injectedLabel,
    disableLabel,
    options = [],
    sx,
    compact,
    error,
    helperText,
    formControlLabelProps: injectedFormControlLabelProps,
    radioProps: injectedRadioProps,
    formControlProps,
    formLabelProps,
    formHelperTextProps,
    disabled,
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
