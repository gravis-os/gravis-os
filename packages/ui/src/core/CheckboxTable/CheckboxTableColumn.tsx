import React from 'react'
import Box, { BoxProps } from '../Box'

export interface CheckboxTableColumnProps extends BoxProps {
  width?: number | string
  children?: React.ReactNode
}

const CheckboxTableColumn: React.FC<CheckboxTableColumnProps> = (props) => {
  const { children, width, ...rest } = props

  return (
    <Box {...rest} sx={{ flexBasis: width, minWidth: width, ...rest?.sx }}>
      {children}
    </Box>
  )
}

export default CheckboxTableColumn
