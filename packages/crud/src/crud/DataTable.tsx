import React, { useEffect, useState } from 'react'
import { SxProps } from '@mui/material'
import { Button, Card, Stack, Typography } from '@gravis-os/ui'
import { CrudModule } from '@gravis-os/types'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { printSingularOrPluralText } from '@gravis-os/utils'
import useCrud from './useCrud'
import AgGrid, { AgGridProps } from './AgGrid'
// Framework Components
import AgGridModelFieldEditor from './AgGridModelFieldEditor'
import ManageColumnsMenuButton from './ManageColumnsMenuButton'

export interface DataTableProps extends AgGridProps {
  sx?: SxProps
  actions?: React.ReactNode
  module?: CrudModule

  disableHeader?: boolean
}

/**
 * This component is used to render a datatable.
 * @param props
 * @constructor
 *
 * ColDef API Docs
 * @link https://www.ag-grid.com/javascript-data-grid/column-properties
 */
const DataTable = React.forwardRef<
  unknown,
  React.PropsWithChildren<DataTableProps>
>((props, ref) => {
  const {
    actions,
    frameworkComponents,
    rowData,
    columnDefs: injectedColumnDefs,
    module,
    disableHeader,
    ...rest
  } = props

  const [columnDefs, setColumnDefs] = useState(injectedColumnDefs)
  useEffect(() => {
    setColumnDefs(injectedColumnDefs)
  }, [injectedColumnDefs])

  // Selection
  const {
    hasSelectedItems,
    selectedItems,
    hasMultipleSelectedItems,
    handleDeleteDialogOpen,
  } = useCrud()

  // Title
  const TitleIcon = module?.Icon

  return (
    <>
      {/* Toolbar */}
      {!disableHeader && (
        <Card
          square
          py={1}
          disableLastGutterBottom
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            {/* Left */}
            <Stack direction="row" spacing={1} alignItems="center" width="100%">
              {/* Title */}
              {TitleIcon && <TitleIcon sx={{ color: 'primary.main' }} />}
              <Typography variant="h5">{module?.name?.plural}</Typography>

              {/* Selection Count */}
              {hasSelectedItems && (
                <Typography variant="body2" color="text.secondary">
                  {selectedItems.length}{' '}
                  {printSingularOrPluralText(selectedItems, 'item')} selected
                </Typography>
              )}
            </Stack>

            {/* Right */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="flex-end"
            >
              {actions}

              {/* BulkDeleteButton */}
              {hasMultipleSelectedItems && (
                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteOutlineOutlinedIcon />}
                  onClick={handleDeleteDialogOpen}
                >
                  Bulk Delete
                </Button>
              )}

              {/* ManageColumnsMenuButton */}
              <ManageColumnsMenuButton
                initialColumnDefs={injectedColumnDefs}
                columnDefs={columnDefs}
                setColumnDefs={setColumnDefs}
              />
            </Stack>
          </Stack>
        </Card>
      )}

      {/* AgGrid */}
      <AgGrid
        frameworkComponents={{
          ModelFieldEditor: AgGridModelFieldEditor,
          ...frameworkComponents,
        }}
        ref={ref}
        columnDefs={columnDefs}
        rowData={rowData}
        // Ag Grid Props
        animateRows
        disableResizeGrid
        enableCellChangeFlash
        rowSelection="multiple"
        rowDragManaged
        rowDragMultiRow
        suppressRowClickSelection
        suppressMoveWhenRowDragging
        {...rest}
      />
    </>
  )
})

export default DataTable
