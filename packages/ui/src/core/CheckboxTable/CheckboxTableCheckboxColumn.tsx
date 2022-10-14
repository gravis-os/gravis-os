import React from 'react'
import { Checkbox } from '@mui/material'
import { CheckboxProps } from '@mui/material/Checkbox'
import CheckboxTableColumn from './CheckboxTableColumn'
import { CheckboxTableColumns } from './CheckboxTable'

interface CheckboxTableCheckboxColumnProps extends CheckboxProps {
  columns: CheckboxTableColumns
}

const CheckboxTableCheckboxColumn: React.FC<
  CheckboxTableCheckboxColumnProps
> = ({ checked, columns, ...rest }) => (
  <CheckboxTableColumn
    columns={columns}
    sx={{ display: 'flex', justifyContent: 'center' }}
  >
    <Checkbox checked={checked} value={checked} {...rest} />
  </CheckboxTableColumn>
)

export default CheckboxTableCheckboxColumn
