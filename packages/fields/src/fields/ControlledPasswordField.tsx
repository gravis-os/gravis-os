import React, { useState } from 'react'
import { Controller, UseControllerProps } from 'react-hook-form'

import { IconButton } from '@gravis-os/ui'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { InputAdornment } from '@mui/material'

import TextField from './TextField'

type ControlledPasswordFieldProps = UseControllerProps

const ControlledPasswordField: React.FC<ControlledPasswordFieldProps> = (
  props
) => {
  const { control, name, ...rest } = props
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  size="large"
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          type={showPassword ? 'text' : 'password'}
          {...rest}
        />
      )}
      {...rest}
    />
  )
}

export default ControlledPasswordField
