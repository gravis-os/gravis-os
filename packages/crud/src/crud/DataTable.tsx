import React, { useEffect, useState } from 'react'
import { SxProps } from '@mui/material'
import { Stack } from '@gravis-os/ui'
import AgGrid, { AgGridProps } from './AgGrid'
// Framework Components
import AgGridModelFieldEditor from './AgGridModelFieldEditor'
import ManageColumnsMenuButton from './ManageColumnsMenuButton'

export interface DataTableProps extends AgGridProps {
  sx?: SxProps
  actions?: React.ReactNode
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
    ...rest
  } = props

  const [columnDefs, setColumnDefs] = useState(injectedColumnDefs)
  useEffect(() => {
    setColumnDefs(injectedColumnDefs)
  }, [injectedColumnDefs])

  return (
    <>
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="flex-end"
        spacing={1}
        sx={{ mb: 1 }}
      >
        {actions}

        {/* ManageColumnsMenuButton */}
        <ManageColumnsMenuButton
          initialColumnDefs={injectedColumnDefs}
          columnDefs={columnDefs}
          setColumnDefs={setColumnDefs}
        />
      </Stack>

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
        rowHeight={50}
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
