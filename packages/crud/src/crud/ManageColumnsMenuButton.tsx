import React from 'react'
import { CheckboxGroup, MenuButton } from '@gravis-os/ui'
import xor from 'lodash/xor'
import { ColDef } from 'ag-grid-community/dist/lib/entities/colDef'

export interface ManageColumnDef extends ColDef {
  field?: string
}

export interface ManageColumnsMenuButtonProps {
  initialColumnDefs: ManageColumnDef[]
  columnDefs: ManageColumnDef[]
  setColumnDefs: React.Dispatch<React.SetStateAction<ManageColumnDef[]>>
}

const ManageColumnsMenuButton: React.FC<ManageColumnsMenuButtonProps> = (
  props
) => {
  const { columnDefs, setColumnDefs, initialColumnDefs } = props

  return (
    <MenuButton
      title="Columns"
      size="small"
      variant="outlined"
      color="inherit"
      sx={{ color: 'text.secondary' }}
    >
      {() => {
        const getIsExcludedColumn = (field: string) =>
          !field || ['index', 'checkbox', 'actions'].includes(field)

        return (
          <CheckboxGroup
            sx={{ px: 2 }}
            name="columns"
            checkboxProps={{ size: 'small' }}
            disableLabel
            onChange={(e, params) => {
              // Calculate the difference to set in state
              const currentKeys = columnDefs.map(({ field }) => field)
              const newKeys = [params.key]
              const nextKeys = xor(currentKeys, newKeys)
              const nextColumnDefs = initialColumnDefs
                .map((columnDef) => {
                  const { field } = columnDef
                  if (getIsExcludedColumn(field)) return columnDef

                  const shouldShow = nextKeys.includes(field)
                  if (!shouldShow) return
                  return columnDef
                })
                .filter(Boolean)

              setColumnDefs(nextColumnDefs)
            }}
            items={initialColumnDefs
              .map(({ field, headerName }) => {
                // Exclude certain columns from showing up in the checkbox
                if (getIsExcludedColumn(field)) return

                // Check if checkbox should be default checked
                const currentKeys = columnDefs.map(({ field }) => field)
                const isChecked = currentKeys.includes(field)

                return {
                  key: field,
                  value: isChecked,
                  label: headerName,
                }
              })
              .filter(Boolean)}
          />
        )
      }}
    </MenuButton>
  )
}

export default ManageColumnsMenuButton
