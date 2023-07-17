import { ControllerProps } from 'react-hook-form'
import { IconProps } from '@mui/material'
import React from 'react'
import { SxProps } from '@mui/system'
import TextField, { TextFieldProps } from '../../fields/TextField'

// Constants
const marginBetweenTextFieldIconAndText = 1
const paddingXInTextField = 2
const marginTopInTextField = 5

export interface MegaSearchTextFieldProps {
  key: string
  control?: ControllerProps['control']
  name: string
  Icon?: React.JSXElementConstructor<IconProps>
  sx?: SxProps
  TextFieldProps?: Partial<TextFieldProps>
  label: string
  placeholder: string
  title?: React.ReactNode
  onChange?: any
  value?: any
}

const MegaSearchTextField: React.FC<MegaSearchTextFieldProps> = (props) => {
  const { name, title, Icon, sx, TextFieldProps, onChange, value, ...rest } =
    props

  const iconSpacing = Icon ? 4 : 0

  return (
    <TextField
      onChange={onChange}
      value={value}
      fullWidth
      variant="standard"
      sx={{ px: 2, ...sx }}
      InputLabelProps={{ sx: { px: 2.5 } }}
      {...rest}
    />
  )
}

export default MegaSearchTextField
