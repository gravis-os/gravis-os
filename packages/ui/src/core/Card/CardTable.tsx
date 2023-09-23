import React from 'react'

import {
  CardHeaderProps,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import get from 'lodash/get'
import startCase from 'lodash/startCase'

interface CardTableStyleProps {
  labelCellWidth?: number
}

/**
 * getLabelFromKey
 * Retrieve label ("Title") from the key (e.g. "policy.service.title")
 * @param str {string}
 */
const getLabelFromKey = (str: string): string => {
  const array = str.split('.')
  return startCase(array.at(-1))
}

interface CardTableRowInterface {
  key: string
  label?: string
  value?: (data: any) => React.ReactElement
}

export interface CardTableProps extends CardTableStyleProps {
  CardHeaderProps?: CardHeaderProps
  data: Record<string, any>
  disableBlankRows?: boolean
  rows: Array<CardTableRowInterface | string>
  size?: 'large' | 'medium'
}

const CardTable: React.FC<CardTableProps> = (props) => {
  const {
    data,
    disableBlankRows,
    labelCellWidth,
    rows,
    size = 'medium',
    ...rest
  } = props
  const isLarge = size === 'large'

  return (
    <Table {...rest}>
      <TableBody>
        {rows.map((row) => {
          const key = typeof row === 'object' ? row.key : row
          const label =
            typeof row === 'object'
              ? getLabelFromKey(row.label || key)
              : getLabelFromKey(row)
          const value =
            typeof row === 'object' && typeof row.value === 'function'
              ? row.value(data)
              : get(data, key)

          if (!value && disableBlankRows) return null

          return (
            <TableRow key={key}>
              <TableCell sx={{ width: labelCellWidth || 'inherit' }}>
                <Typography variant={isLarge ? 'h5' : 'h6'}>{label}</Typography>
              </TableCell>

              <TableCell>
                <Typography color="textSecondary" variant="body2">
                  {value}
                </Typography>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default CardTable
