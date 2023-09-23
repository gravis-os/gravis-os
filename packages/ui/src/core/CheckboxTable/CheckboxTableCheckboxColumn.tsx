import React from 'react'

import { Checkbox } from '@mui/material'
import { CheckboxProps } from '@mui/material/Checkbox'

import CheckboxTableColumn, {
  CheckboxTableColumnProps,
} from './CheckboxTableColumn'

interface CheckboxTableCheckboxColumnProps extends CheckboxProps {
  checkboxTableColumnProps?: Partial<CheckboxTableColumnProps>
}

const CheckboxTableCheckboxColumn: React.FC<
  CheckboxTableCheckboxColumnProps
> = ({ checkboxTableColumnProps, checked, ...rest }) => (
  <CheckboxTableColumn
    {...checkboxTableColumnProps}
    sx={{ display: 'flex', justifyContent: 'center' }}
  >
    <Checkbox checked={checked} value={checked} {...rest} />
  </CheckboxTableColumn>
)

export default CheckboxTableCheckboxColumn
