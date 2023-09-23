import React from 'react'

import Box, { BoxProps } from '../Box'

export interface CheckboxTableColumnProps extends BoxProps {
  children?: React.ReactNode
  width?: number | string
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
