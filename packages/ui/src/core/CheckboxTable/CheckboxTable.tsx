import React, { useMemo } from 'react'
import { pick, toUpper } from 'lodash'
import CheckboxTableHeader from './CheckboxTableHeader'
import CheckboxTableBody, { CheckboxTableBodyProps } from './CheckboxTableBody'
import { CheckboxTableColumns, CheckboxTableRows } from './types'
import Stack, { StackProps } from '../Stack'

export interface CheckboxTableProps<T> extends StackProps {
  bordered?: boolean
  isReadOnly?: boolean
  title: string
  columns: CheckboxTableColumns
  rows: CheckboxTableRows<T>
  onChangeRow?: (checked: boolean, row: string) => void
  checkboxTableBodyProps?: CheckboxTableBodyProps<T>
}

const getDefaultColumnDef = (column, options) => ({
  label: column,
  value: toUpper(column),
  ...pick(options, ['width']),
})

const CheckboxTable = <T,>(props: CheckboxTableProps<T>) => {
  const {
    bordered,
    columns,
    rows,
    isReadOnly,
    title,
    onChangeRow,
    checkboxTableBodyProps,
    ...rest
  } = props

  const width = useMemo(
    () => `calc(100% / ${columns.length + (onChangeRow ? 1 : 0)} - 6%)`,
    [columns.length, onChangeRow]
  )

  const columnDefs = columns.map((column) =>
    getDefaultColumnDef(column, { width })
  )

  return (
    <Stack {...rest}>
      <CheckboxTableHeader
        columnDefs={columnDefs}
        title={title}
        hasToggleAllColumn={Boolean(onChangeRow)}
      />
      <CheckboxTableBody
        {...checkboxTableBodyProps}
        bordered={bordered}
        isReadOnly={isReadOnly}
        columnDefs={columnDefs}
        rows={rows}
        onChangeRow={onChangeRow}
      />
    </Stack>
  )
}

export default CheckboxTable
