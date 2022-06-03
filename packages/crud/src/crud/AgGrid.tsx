import React from 'react'
import { AgGridReact, AgGridReactProps } from 'ag-grid-react'
import 'ag-grid-enterprise'
import { Box, BoxProps } from '@gravis-os/ui'
import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'

/**
 * Import the following in downstream app to get styles
 * @see https://nextjs.org/docs/messages/css-npm
 */
// import 'ag-grid-community/dist/styles/ag-grid.css'
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

const wrapTextStyles: any = {
  overflow: 'unset',
  textOverflow: 'unset',
  whiteSpace: 'normal', // Avoid 'pre-wrap' when using checkboxSelection,
  wordBreak: 'keep-all',
}

const baseFontSize = 15

const gridWrapperSx = {
  '&.ag-theme-alpine .ag-root-wrapper': { border: 0 },
  '&.ag-theme-alpine, &.ag-theme-alpine .ag-row': {
    fontSize: {
      xs: baseFontSize - 2,
      sm: baseFontSize - 1,
      md: baseFontSize,
    },
  },
  '&.ag-theme-alpine .ag-header-cell, &.ag-theme-alpine .ag-cell': {
    display: 'flex',
    alignItems: 'center',
    px: 2,
    lineHeight: 1.2,
    ...wrapTextStyles,
  },
  '&.ag-theme-alpine .ag-header, &.ag-theme-alpine .ag-header-cell-resize::after':
    {
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
}

export interface AgGridProps extends AgGridReactProps {
  disableResizeGrid?: boolean
  enableExport?: boolean
  exportProject?: string
  height?: number
  sx?: BoxProps['sx']
}

const AgGrid = React.forwardRef<any, React.PropsWithChildren<AgGridProps>>(
  (props, ref) => {
    const {
      height: injectedHeight,
      children,
      sx,
      disableResizeGrid,
      enableExport,
      exportProject,
      onGridReady: injectedOnGridReady,
      ...rest
    } = props
    const { rowData } = rest

    // Height
    const isLargeData = rowData && rowData?.length > 800
    const isFixedHeight = injectedHeight || isLargeData
    const height = injectedHeight || '100vh'

    // Theme
    const theme = useTheme()
    // Responsive
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
    const resizeGrid = (params) => {
      if (disableResizeGrid) return
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
          return params.columnApi.autoSizeColumns(
            allColumnIds as string[],
            true
          )
      }
    }

    return (
      <Box
        sx={{
          width: '100%',
          height,
          ...gridWrapperSx,
          // ==============================
          // Css Variables
          // ==============================
          '&': { '--ag-border-color': theme.palette.divider },
          ...sx,
        }}
        className="ag-theme-alpine"
        id="grid-wrapper"
      >
        <AgGridReact
          {...rest}
          defaultColDef={{
            autoHeight: false,
            sortable: true,
            filter: true,
            resizable: true,
            floatingFilter: false,
            suppressMenu: false,
            ...rest.defaultColDef,
          }}
          domLayout={isFixedHeight ? 'normal' : 'autoHeight'}
          onFirstDataRendered={(params) => {
            resizeGrid(params)
          }}
          onGridReady={(params) => {
            if (injectedOnGridReady) injectedOnGridReady(params)
          }}
          onGridSizeChanged={(params) => {
            resizeGrid(params)
          }}
          ref={ref}
          statusBar={{
            ...rest.statusBar,
            statusPanels: enableExport
              ? [
                  ...(rest.statusBar?.statusPanels || []),
                  {
                    statusPanel: 'statusBarDownloadButton',
                    statusPanelParams: {
                      exportProject,
                    },
                  },
                ]
              : rest.statusBar?.statusPanels || [],
          }}
          suppressContextMenu={enableExport}
        >
          {children}
        </AgGridReact>
      </Box>
    )
  }
)

export default AgGrid
