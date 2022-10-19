import React from 'react'
import { first } from 'lodash'
import CheckboxTableColumn from './CheckboxTableColumn'
import { CheckboxTableColumnDefs } from './types'
import Stack from '../Stack'
import { Typography } from '../index'

interface CheckboxTableHeaderProps {
  hasToggleAllColumn?: boolean
  columnDefs: CheckboxTableColumnDefs
  title: string
}

const CheckboxTableHeader: React.FC<CheckboxTableHeaderProps> = (props) => {
  const { hasToggleAllColumn, title, columnDefs } = props

  return (
    <Stack direction="row" mb={2}>
      <Typography sx={{ fontWeight: 700, flexGrow: 1 }}>{title}</Typography>
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
