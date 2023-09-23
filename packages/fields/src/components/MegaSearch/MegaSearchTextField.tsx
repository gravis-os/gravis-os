import React from 'react'
import { ControllerProps } from 'react-hook-form'

import { IconProps } from '@mui/material'
import { SxProps } from '@mui/system'

import TextField, { TextFieldProps } from '../../fields/TextField'

// Constants
const marginBetweenTextFieldIconAndText = 1
const paddingXInTextField = 2
const marginTopInTextField = 5

export interface MegaSearchTextFieldProps {
  Icon?: React.JSXElementConstructor<IconProps>
  TextFieldProps?: Partial<TextFieldProps>
  control?: ControllerProps['control']
  key: string
  label: string
  name: string
  onChange?: any
  placeholder: string
  sx?: SxProps
  title?: React.ReactNode
  value?: any
}

const MegaSearchTextField: React.FC<MegaSearchTextFieldProps> = (props) => {
  const { title, Icon, name, onChange, sx, TextFieldProps, value, ...rest } =
    props

  const iconSpacing = Icon ? 4 : 0

  return (
    <TextField
      InputLabelProps={{ sx: { px: 2.5 } }}
      fullWidth
      onChange={onChange}
      sx={{
        '& .MuiInputBase-root::after, & .MuiInputBase-root::before': {
          display: 'none',
        },
        px: 2,
        ...sx,
      }}
      value={value}
      variant="standard"
      {...rest}
    />
  )
}

export default MegaSearchTextField
