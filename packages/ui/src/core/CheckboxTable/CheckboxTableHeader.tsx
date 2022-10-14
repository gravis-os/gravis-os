import React from 'react'
import CheckboxTableColumn from './CheckboxTableColumn'
import { CheckboxTableColumns } from './CheckboxTable'
import Typography from '../Typography'
import Stack from '../Stack'

interface CheckboxTableHeaderProps {
  columns: CheckboxTableColumns
  title: string
}

const CheckboxTableHeader: React.FC<CheckboxTableHeaderProps> = (props) => {
  const { title, columns } = props

  return (
    <Stack direction="row" mb={2}>
      <Typography sx={{ fontWeight: 700, flexGrow: 1 }}>{title}</Typography>
      {columns.map((column) => (
        <CheckboxTableColumn columns={columns}>
          <Typography key={column} sx={{ textAlign: 'center' }}>
            {column}
          </Typography>
        </CheckboxTableColumn>
      ))}
    </Stack>
  )
}

export default CheckboxTableHeader
