import React, { useEffect, useState } from 'react'
import { SxProps } from '@mui/material'
import { Stack, Card, Typography, Button } from '@gravis-os/ui'
import { CrudModule } from '@gravis-os/types'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import AgGrid, { AgGridProps } from './AgGrid'
// Framework Components
import AgGridModelFieldEditor from './AgGridModelFieldEditor'
import ManageColumnsMenuButton from './ManageColumnsMenuButton'
import useCrud from './useCrud'

export interface DataTableProps extends AgGridProps {
  sx?: SxProps
  actions?: React.ReactNode
  module?: CrudModule
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
                {selectedItems.length} items selected
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
        rowHeight={56}
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
