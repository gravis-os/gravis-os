import React from 'react'
import startCase from 'lodash/startCase'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'
import { SxProps } from '@mui/material'
import Typography from './Typography'

export interface CheckboxGroupItem {
  key: string
  value: boolean // true / false the checked state
  label: React.ReactNode
}

export interface CheckboxGroupProps {
  checkboxProps?: CheckboxProps
  disableLabel?: boolean
  label?: string
  name: string
  items: CheckboxGroupItem[]
  onChange?: (
    e: React.SyntheticEvent,
    params: CheckboxGroupItem & { name: string; checked: boolean }
  ) => void
  sx?: SxProps
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = (props) => {
  const {
    checkboxProps,
    disableLabel,
    label: injectedLabel,
    onChange: injectedOnChange,
    items,
    name,
    sx,
  } = props

  const label = injectedLabel || startCase(name)

  return (
    <FormControl component="fieldset" variant="standard" sx={sx}>
      {!disableLabel && <FormLabel component="legend">{label}</FormLabel>}
      <FormGroup>
        {items.map((item) => {
          const { key, value, label: injectedLabel } = item
          const label = (
            <Typography variant="subtitle2">
              {injectedLabel || startCase(key)}
            </Typography>
          )
          return (
            <FormControlLabel
              key={key}
              control={<Checkbox defaultChecked={value} {...checkboxProps} />}
              label={label}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const { checked } = e.target
                if (injectedOnChange) {
                  injectedOnChange(e, { checked, key, value, name, label })
                }
              }}
            />
          )
        })}
      </FormGroup>
    </FormControl>
  )
}

export default CheckboxGroup
