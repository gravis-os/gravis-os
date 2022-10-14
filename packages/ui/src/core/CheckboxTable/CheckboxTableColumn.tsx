import React, { useMemo } from 'react'
import Box, { BoxProps } from '../Box'
import { CheckboxTableColumns } from './CheckboxTable'

interface CheckboxTableColumnProps extends BoxProps {
  columns: CheckboxTableColumns
}

const CheckboxTableColumn: React.FC<CheckboxTableColumnProps> = (props) => {
  const { children, columns, ...rest } = props

  const width = useMemo(
    () => `calc(100% / ${columns.length} - 6%)`,
    [columns.length]
  )

  return (
    <Box {...rest} sx={{ flexBasis: width, minWidth: width, ...rest?.sx }}>
      {children}
    </Box>
  )
}

export default CheckboxTableColumn
