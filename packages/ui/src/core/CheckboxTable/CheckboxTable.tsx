import React from 'react'
import CheckboxTableHeader from './CheckboxTableHeader'
import CheckboxTableBody from './CheckboxTableBody'
import Stack from '../Stack'

export type CheckboxTableColumn = string
export type CheckboxTableColumns = CheckboxTableColumn[]

export interface CheckboxTableColumnCell<T> {
  key: string | number
  value: T
  checked: boolean
  disabled?: boolean
  onChange: (checked: boolean, value: T) => void
}

export interface CheckboxTableRows<T> {
  [name: string]: CheckboxTableColumnCell<T>[]
}

interface CheckboxTableProps<T> {
  isReadOnly?: boolean
  title: string
  columns: CheckboxTableColumns
  rows: CheckboxTableRows<T>
  onChangeRow: (checked: boolean, row: string) => void
}

const CheckboxTable = <T,>(props: CheckboxTableProps<T>) => {
  const { columns, rows, isReadOnly, title, onChangeRow } = props

  return (
    <Stack>
      <CheckboxTableHeader columns={columns} title={title} />
      <CheckboxTableBody
        isReadOnly={isReadOnly}
        columns={columns}
        rows={rows}
        onChangeRow={onChangeRow}
      />
    </Stack>
  )
}

export default CheckboxTable
