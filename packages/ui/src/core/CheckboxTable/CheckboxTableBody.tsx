import React from 'react'
import { every, first, toPairs } from 'lodash'
import { CheckboxTableColumnDefs, CheckboxTableRows } from './types'
import CheckboxTableCheckboxColumn from './CheckboxTableCheckboxColumn'
import Typography from '../Typography'
import Stack from '../Stack'

interface CheckboxTableBodyProps<T> {
  isReadOnly?: boolean
  onChangeRow?: (checked: boolean, row: string) => void
  columnDefs: CheckboxTableColumnDefs
  rows: CheckboxTableRows<T>
}

const CheckboxTableBody = <T,>(props: CheckboxTableBodyProps<T>) => {
  const { isReadOnly, onChangeRow, columnDefs, rows } = props

  const columnWidth = first(columnDefs).width

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
              disabled={isReadOnly}
              onChange={(_, checked) => onChangeRow(checked, row)}
              checkboxTableColumn={{
                width: columnWidth,
              }}
            />
          )}
          {cells.map((cell) => (
            <CheckboxTableCheckboxColumn
              key={cell.key}
              checked={cell.checked}
              disabled={isReadOnly}
              onChange={(_, checked) => cell?.onChange(checked, cell.value)}
              checkboxTableColumn={{
                width: columnWidth,
              }}
            />
          ))}
        </Stack>
      ))}
    </>
  )
}

export default CheckboxTableBody
