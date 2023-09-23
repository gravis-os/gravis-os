import React from 'react'

import every from 'lodash/every'
import first from 'lodash/first'
import toPairs from 'lodash/toPairs'

import Stack, { StackProps } from '../Stack'
import Typography from '../Typography'
import CheckboxTableCheckboxColumn from './CheckboxTableCheckboxColumn'
import { CheckboxTableColumnDefs, CheckboxTableRows } from './types'

export interface CheckboxTableBodyProps<T> extends StackProps {
  bordered?: boolean
  columnDefs: CheckboxTableColumnDefs
  isReadOnly?: boolean
  onChangeRow?: (checked: boolean, row: string) => void
  rows: CheckboxTableRows<T>
}

const CheckboxTableBody = <T,>(props: CheckboxTableBodyProps<T>) => {
  const { bordered, columnDefs, isReadOnly, onChangeRow, rows, ...rest } = props

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
            margin: '0 -1rem',
            minHeight: '3rem',
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
              checkboxTableColumnProps={{ width: columnWidth }}
              checked={every(cells, 'checked')}
              disabled={isReadOnly}
              onChange={(_, checked) => onChangeRow(checked, row)}
            />
          )}
          {cells.map((cell) => (
            <CheckboxTableCheckboxColumn
              checkboxTableColumnProps={{ width: columnWidth }}
              checked={cell.checked}
              disabled={isReadOnly}
              key={cell.key}
              onChange={(_, checked) => cell?.onChange(checked, cell.value)}
            />
          ))}
        </Stack>
      ))}
    </>
  )
}

export default CheckboxTableBody
