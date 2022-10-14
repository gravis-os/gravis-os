import React from 'react'
import { every, toPairs } from 'lodash'
import { CheckboxTableColumns, CheckboxTableRows } from './CheckboxTable'
import CheckboxTableCheckboxColumn from './CheckboxTableCheckboxColumn'
import Typography from '../Typography'
import Stack from '../Stack'

interface CheckboxTableBodyProps<T> {
  isReadOnly?: boolean
  onChangeRow?: (checked: boolean, row: string) => void
  columns: CheckboxTableColumns
  rows: CheckboxTableRows<T>
}

const CheckboxTableBody = <T,>(props: CheckboxTableBodyProps<T>) => {
  const { isReadOnly, onChangeRow, columns, rows } = props

  return (
    <>
      {toPairs(rows).map(([row, cells]) => (
        <Stack direction="row" key={row}>
          <Typography sx={{ flexGrow: 1, overflowWrap: 'anywhere' }}>
            {row}
          </Typography>
          {onChangeRow && (
            <CheckboxTableCheckboxColumn
              checked={every(cells, 'checked')}
              columns={columns}
              disabled={isReadOnly || every(cells, 'disabled')}
              onChange={(_, checked) => onChangeRow(checked, row)}
            />
          )}
          {cells.map((cell) => (
            <CheckboxTableCheckboxColumn
              key={cell.key}
              checked={cell.checked}
              columns={columns}
              disabled={isReadOnly || cell.disabled}
              onChange={(_, checked) => cell?.onChange(checked, cell.value)}
            />
          ))}
        </Stack>
      ))}
    </>
  )
}

export default CheckboxTableBody
