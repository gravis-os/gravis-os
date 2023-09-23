import React from 'react'

import first from 'lodash/first'

import Stack from '../Stack'
import Typography from '../Typography'
import CheckboxTableColumn from './CheckboxTableColumn'
import { CheckboxTableColumnDefs } from './types'

interface CheckboxTableHeaderProps {
  columnDefs: CheckboxTableColumnDefs
  hasToggleAllColumn?: boolean
  title: string
}

const CheckboxTableHeader: React.FC<CheckboxTableHeaderProps> = (props) => {
  const { title, columnDefs, hasToggleAllColumn } = props

  return (
    <Stack direction="row" mb={2}>
      <Typography sx={{ flexGrow: 1, fontWeight: 700 }}>{title}</Typography>
      {hasToggleAllColumn && (
        <CheckboxTableColumn width={first(columnDefs).width}>
          <Typography sx={{ textAlign: 'center' }}>All</Typography>
        </CheckboxTableColumn>
      )}
      {columnDefs.map((column) => (
        <CheckboxTableColumn key={column.value} width={column.width}>
          <Typography sx={{ textAlign: 'center' }}>{column.label}</Typography>
        </CheckboxTableColumn>
      ))}
    </Stack>
  )
}

export default CheckboxTableHeader
