import React, { useState } from 'react'
import { Controller, UseControllerProps } from 'react-hook-form'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { InputAdornment } from '@mui/material'
import { IconButton } from '@gravis-os/ui'
import TextField from './TextField'

type ControlledPasswordFieldProps = UseControllerProps

const ControlledPasswordField: React.FC<ControlledPasswordFieldProps> = (
  props
) => {
  const { name, control, ...rest } = props
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  size="large"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...rest}
        />
      )}
      {...rest}
    />
  )
}

export default ControlledPasswordField
