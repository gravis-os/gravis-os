import React from 'react'
import { SxProps } from '@mui/material'
import AgGrid, { AgGridProps } from './AgGrid'
// Framework Components
import AgGridModelFieldEditor from './AgGridModelFieldEditor'

export interface DataTableProps extends AgGridProps {
  sx?: SxProps
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
  React.RefObject<any>,
  React.PropsWithChildren<DataTableProps>
>((props, ref) => {
  const { frameworkComponents, rowData, ...rest } = props

  return (
    <AgGrid
      frameworkComponents={{
        ModelFieldEditor: AgGridModelFieldEditor,
        ...frameworkComponents,
      }}
      ref={ref}
      rowData={rowData}
      // Ag Grid Props
      animateRows
      enableCellChangeFlash
      rowHeight={50}
      rowSelection="multiple"
      rowDragManaged
      rowDragMultiRow
      suppressRowClickSelection
      suppressMoveWhenRowDragging
      {...rest}
    />
  )
})

export default DataTable
