import React from 'react'
import { CheckboxGroup, MenuButton, ButtonProps } from '@gravis-os/ui'
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

        return (
          <CheckboxGroup
            sx={{ px: 2 }}
            name="columns"
            checkboxProps={{ size: 'small' }}
            disableLabel
            onChange={(e, params) => {
              const nextColumnDefs = columnDefs.map((columnDef) =>
                columnDef.field === params.key
                  ? { ...columnDef, hide: !params.checked }
                  : columnDef
              )

              setColumnDefs(nextColumnDefs)
            }}
            items={initialColumnDefs
              .map(({ field, headerName }) => {
                // Exclude certain columns from showing up in the checkbox
                if (getIsExcludedColumn(field)) return

                // Check if checkbox should be default checked
                const currentKeys = columnDefs
                  .filter(({ hide }) => !hide)
                  .map(({ field }) => field)

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
