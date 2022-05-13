import React from 'react'
import { Box, SxProps, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import AgGrid, { AgGridProps } from '../crud/AgGrid'

export interface DataTableProps extends AgGridProps {
  sx?: SxProps
  editable?: boolean
}

const wrapTextStyles: any = {
  overflow: 'unset',
  textOverflow: 'unset',
  whiteSpace: 'pre-wrap',
  wordBreak: 'keep-all',
}

const baseFontSize = 15

/**
 * This component is used to render a datatable.
 * @param props
 * @constructor
 *
 * ColDef API Docs
 * @link https://www.ag-grid.com/javascript-data-grid/column-properties
 */
const DataTable = React.forwardRef<React.RefObject<any>, React.PropsWithChildren<DataTableProps>>((props, ref) => {
  const { editable, sx, onGridReady: injectedOnGridReady, defaultColDef, rowData, ...rest } = props

  const isLargeData = rowData && rowData?.length > 800
  const defaultAgGridProps: AgGridProps = { domLayout: isLargeData ? 'normal' : 'autoHeight' }

  // Responsive
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Box sx={isLargeData ? { height: '100vh', ...sx } : sx}>
      <AgGrid
        {...defaultAgGridProps}
        ref={ref}
        rowData={rowData}
        // Styles
        rowHeight={50}
        sx={{
          '&.ag-theme-alpine .ag-root-wrapper': { border: 0 },
          '&.ag-theme-alpine, &.ag-theme-alpine .ag-row': {
            fontSize: { xs: baseFontSize - 2, sm: baseFontSize - 1, md: baseFontSize },
          },
          '&.ag-theme-alpine .ag-header-cell, &.ag-theme-alpine .ag-cell': {
            display: 'flex',
            alignItems: 'center',
            px: 2,
            lineHeight: 1.2,
            ...wrapTextStyles,
          },
          '&.ag-theme-alpine .ag-header, &.ag-theme-alpine .ag-header-cell-resize::after': {
            backgroundColor: 'transparent',
          },
          '&.ag-theme-alpine .ag-ltr .ag-floating-filter-button': { ml: 0.5 },

          // ==============================
          // Row
          // ==============================
          '&.ag-theme-alpine .ag-row-hover': {
            backgroundColor: 'action.hover',
          },

          // ==============================
          // Header
          // ==============================
          '&.ag-theme-alpine .ag-header': {
            borderBottomColor: 'divider',
          },
          // Font sizes
          '&.ag-theme-alpine .ag-header-cell *': {
            ...wrapTextStyles,
            fontSize: baseFontSize - 1,
          },

          // ==============================
          // Css Variables
          // ==============================
          '&': {
            '--ag-border-color': theme.palette.divider,
          },

          ...sx,
        }}
        defaultColDef={{
          autoHeight: false,
          editable,
          ...defaultColDef,
        }}
        editType={editable && 'fullRow'}
        onFirstDataRendered={(params) => {
          switch (true) {
            case isDesktop:
              return params.api.sizeColumnsToFit()
            default:
              const allColumnIds = params.columnApi
                .getAllColumns()
                ?.map((column) => {
                  const columnId = column.getId()
                  if (!columnId) return
                  return columnId
                })
                ?.filter(Boolean)
              return params.columnApi.autoSizeColumns(allColumnIds as string[], true)
          }
        }}
        onGridReady={(params) => {
          if (injectedOnGridReady) injectedOnGridReady(params)
        }}
        {...rest}
      />
    </Box>
  )
})

export default DataTable
