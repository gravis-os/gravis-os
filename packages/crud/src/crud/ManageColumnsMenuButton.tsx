import React from 'react'

import { CheckboxGroup } from '@gravis-os/fields'
import { ButtonProps, MenuButton } from '@gravis-os/ui'
import { ColDef } from 'ag-grid-community/dist/lib/entities/colDef'

export interface ManageColumnDef extends ColDef {
  field?: string
}

export interface ManageColumnsMenuButtonProps extends ButtonProps {
  columnDefs: ManageColumnDef[]
  initialColumnDefs: ManageColumnDef[]
  setColumnDefs: React.Dispatch<React.SetStateAction<ManageColumnDef[]>>
}

const getIsExcludedColumn = (field: string) =>
  !field || ['actions', 'checkbox', 'index'].includes(field)

const getCheckboxOptions = (columnDefs: ManageColumnDef[]) => {
  return columnDefs
    .map(({ field, headerName }) => {
      // Exclude certain columns from showing up in the checkbox
      if (getIsExcludedColumn(field)) return null

      // Check if checkbox should be default checked
      const currentKeys = columnDefs
        .filter(({ hide }) => !hide)
        .map(({ field }) => field)

      const isChecked = currentKeys.includes(field)

      return {
        isChecked,
        key: field,
        label: headerName,
        value: field,
      }
    })
    .filter(Boolean)
}

const ManageColumnsMenuButton: React.FC<ManageColumnsMenuButtonProps> = (
  props
) => {
  const { columnDefs, initialColumnDefs, setColumnDefs, sx, ...rest } = props

  return (
    <MenuButton
      color="inherit"
      size="small"
      sx={{ color: 'text.secondary', lineHeight: 1, ...sx }}
      title="Columns"
      variant="text"
      {...rest}
    >
      {() => {
        const options = getCheckboxOptions(initialColumnDefs)
        const value = getCheckboxOptions(columnDefs).filter(
          ({ isChecked }) => isChecked
        )

        return (
          <CheckboxGroup
            checkboxProps={{ size: 'small' }}
            disableLabel
            name="columns"
            onChange={(_, { params }) => {
              const nextColumnDefs = columnDefs.map((columnDef) =>
                columnDef.field === params.key
                  ? { ...columnDef, hide: !params.event.target.checked }
                  : columnDef
              )
              setColumnDefs(nextColumnDefs)
            }}
            options={options}
            sx={{ px: 2 }}
            value={value}
          />
        )
      }}
    </MenuButton>
  )
}

export default ManageColumnsMenuButton
