import React from 'react'
import { Stack as MuiStack, StackProps as MuiStackProps } from '@mui/material'

export interface StackProps extends MuiStackProps {}

const Stack: React.FC<StackProps> = props => {
  const { sx, ...rest } = props
  return (
    <MuiStack
      sx={{
        width: '100%',
        ...sx,
      }}
      {...rest}
    />
  )
}

export default Stack
