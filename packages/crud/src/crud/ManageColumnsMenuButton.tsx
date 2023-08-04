import React from 'react'
import { MenuButton, ButtonProps } from '@gravis-os/ui'
import { CheckboxGroup } from '@gravis-os/fields'
import { ColDef } from 'ag-grid-community/dist/lib/entities/colDef'

export interface ManageColumnDef extends ColDef {
  field?: string
}

export interface ManageColumnsMenuButtonProps extends ButtonProps {
  initialColumnDefs: ManageColumnDef[]
  columnDefs: ManageColumnDef[]
  setColumnDefs: React.Dispatch<React.SetStateAction<ManageColumnDef[]>>
}

const ManageColumnsMenuButton: React.FC<ManageColumnsMenuButtonProps> = (
  props
) => {
  const { columnDefs, setColumnDefs, initialColumnDefs, sx, ...rest } = props

  return (
    <MenuButton
      title="Columns"
      size="small"
      color="inherit"
      variant="text"
      sx={{ color: 'text.secondary', lineHeight: 1, ...sx }}
      {...rest}
    >
      {() => {
        const getIsExcludedColumn = (field: string) =>
          !field || ['index', 'checkbox', 'actions'].includes(field)

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
                key: field,
                value: field,
                label: headerName,
                isChecked,
              }
            })
            .filter(Boolean)
        }

        const options = getCheckboxOptions(initialColumnDefs)
        const value = getCheckboxOptions(columnDefs).filter(
          ({ isChecked }) => isChecked
        )

        return (
          <CheckboxGroup
            sx={{ px: 2 }}
            name="columns"
            checkboxProps={{ size: 'small' }}
            disableLabel
            onChange={(_, { params }) => {
              const nextColumnDefs = columnDefs.map((columnDef) =>
                columnDef.field === params.key
                  ? { ...columnDef, hide: !params.event.target.checked }
                  : columnDef
              )
              setColumnDefs(nextColumnDefs)
            }}
            options={options}
            value={value}
          />
        )
      }}
    </MenuButton>
  )
}

export default ManageColumnsMenuButton
