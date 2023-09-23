import React, { useMemo } from 'react'

import pick from 'lodash/pick'
import toUpper from 'lodash/toUpper'

import Stack, { StackProps } from '../Stack'
import CheckboxTableBody, { CheckboxTableBodyProps } from './CheckboxTableBody'
import CheckboxTableHeader from './CheckboxTableHeader'
import { CheckboxTableColumns, CheckboxTableRows } from './types'

export interface CheckboxTableProps<T> extends StackProps {
  bordered?: boolean
  checkboxTableBodyProps?: CheckboxTableBodyProps<T>
  columns: CheckboxTableColumns
  isReadOnly?: boolean
  onChangeRow?: (checked: boolean, row: string) => void
  rows: CheckboxTableRows<T>
  title: string
}

const getDefaultColumnDef = (column, options) => ({
  label: column,
  value: toUpper(column),
  ...pick(options, ['width']),
})

const CheckboxTable = <T,>(props: CheckboxTableProps<T>) => {
  const {
    title,
    bordered,
    checkboxTableBodyProps,
    columns,
    isReadOnly,
    onChangeRow,
    rows,
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
        hasToggleAllColumn={Boolean(onChangeRow)}
        title={title}
      />
      <CheckboxTableBody
        {...checkboxTableBodyProps}
        bordered={bordered}
        columnDefs={columnDefs}
        isReadOnly={isReadOnly}
        onChangeRow={onChangeRow}
        rows={rows}
      />
    </Stack>
  )
}

export default CheckboxTable
