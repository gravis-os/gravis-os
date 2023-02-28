import React from 'react'
import { every, first, toPairs } from 'lodash'
import { CheckboxTableColumnDefs, CheckboxTableRows } from './types'
import CheckboxTableCheckboxColumn from './CheckboxTableCheckboxColumn'
import Typography from '../Typography'
import Stack, { StackProps } from '../Stack'

export interface CheckboxTableBodyProps<T> extends StackProps {
  bordered?: boolean
  isReadOnly?: boolean
  onChangeRow?: (checked: boolean, row: string) => void
  columnDefs: CheckboxTableColumnDefs
  rows: CheckboxTableRows<T>
}

const CheckboxTableBody = <T,>(props: CheckboxTableBodyProps<T>) => {
  const { bordered, isReadOnly, onChangeRow, columnDefs, rows, ...rest } = props

  const columnWidth = first(columnDefs)?.width

  return (
    <>
      {toPairs(rows).map(([row, cells]) => (
        <Stack
          direction="row"
          key={row}
          {...rest}
          sx={{
            alignItems: 'center',
            minHeight: '3rem',
            margin: '0 -1rem',
            padding: '0 1rem',
            width: 'calc(100% + 2rem)',
            ...(bordered
              ? {
                  borderBottom: '1px solid',
                  borderColor: ({ palette: { mode } }) => {
                    const isDarkMode = mode === 'dark'
                    return isDarkMode ? 'neutral.700' : 'grey.100'
                  },
                }
              : {}),
            ...rest?.sx,
          }}
        >
          <Typography sx={{ flexGrow: 1, overflowWrap: 'anywhere' }}>
            {row}
          </Typography>
          {onChangeRow && (
            <CheckboxTableCheckboxColumn
              checked={every(cells, 'checked')}
              disabled={isReadOnly}
              onChange={(_, checked) => onChangeRow(checked, row)}
              checkboxTableColumnProps={{ width: columnWidth }}
            />
          )}
          {cells.map((cell) => (
            <CheckboxTableCheckboxColumn
              key={cell.key}
              checked={cell.checked}
              disabled={isReadOnly}
              onChange={(_, checked) => cell?.onChange(checked, cell.value)}
              checkboxTableColumnProps={{ width: columnWidth }}
            />
          ))}
        </Stack>
      ))}
    </>
  )
}

export default CheckboxTableBody
