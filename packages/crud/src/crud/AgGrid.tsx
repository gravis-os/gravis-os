import React from 'react'

import { Box, BoxProps } from '@gravis-os/ui'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { AgGridReact, AgGridReactProps } from 'ag-grid-react'

import 'ag-grid-enterprise'

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
  // ==============================
  '&.ag-grid .ag-header': {
    borderBottomColor: 'divider',
  },
  // Font sizes
  '&.ag-grid .ag-header-cell *': {
    ...wrapTextStyles,
    fontSize: baseFontSize - 1,
  },
  '&.ag-grid .ag-header-cell, &.ag-grid .ag-cell': {
    alignItems: 'center',
    display: 'flex',
    lineHeight: 1.2,
    px: 2,
    ...wrapTextStyles,
  },
  '&.ag-grid .ag-header, &.ag-grid .ag-header-cell-resize::after': {
    backgroundColor: 'transparent',
  },
  '&.ag-grid .ag-ltr .ag-floating-filter-button': { ml: 0.5 },

  // ==============================
  // Row
  '&.ag-grid .ag-root-wrapper': { border: 0 },

  // ==============================
  // Header
  // ==============================
  '&.ag-grid .ag-row-hover': {
    backgroundColor: 'action.hover',
  },
  '&.ag-grid, &.ag-grid .ag-row': {
    fontSize: {
      xs: baseFontSize - 2,
      sm: baseFontSize - 1,
      md: baseFontSize,
    },
  },
}

export interface AgGridProps extends AgGridReactProps {
  disableResizeGrid?: boolean
  disableSizeColumnsToFit?: boolean
  enableExport?: boolean
  exportProject?: string
  height?: number | string
  sx?: BoxProps['sx']
}

const AgGrid = React.forwardRef<any, React.PropsWithChildren<AgGridProps>>(
  (props, ref) => {
    const {
      children,
      disableResizeGrid,
      disableSizeColumnsToFit,
      enableExport,
      exportProject,
      height: injectedHeight,
      onGridReady: injectedOnGridReady,
      sx,
      ...rest
    } = props
    const { defaultColDef = {}, rowData, statusBar } = rest

    // Height
    const isLargeData = rowData && rowData?.length > 800
    const isFixedHeight = injectedHeight || isLargeData
    const height = injectedHeight || '100vh'

    // Theme
    const theme = useTheme()

    // Dark mode
    const isDarkMode = theme.palette.mode === 'dark'

    // Responsive
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
    const resizeGrid = (params) => {
      if (disableResizeGrid) return
      switch (true) {
        case isDesktop && !disableSizeColumnsToFit: {
          return params.api.sizeColumnsToFit()
        }
        default: {
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
    }

    return (
      <Box
        className={`ag-grid ag-theme-alpine${isDarkMode ? '-dark' : ''}`}
        id="grid-wrapper"
        sx={{
          height,
          width: '100%',
          ...gridWrapperSx,
          // ==============================
          // Css Variables
          // ==============================
          '&': { '--ag-border-color': theme.palette.divider },
          ...sx,
        }}
      >
        <AgGridReact
          {...rest}
          defaultColDef={{
            autoHeight: true,
            filter: true,
            flex: 1,
            floatingFilter: false,
            minWidth: 150,
            resizable: true,
            sortable: true,
            suppressMenu: false,
            ...defaultColDef,
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
            ...statusBar,
            statusPanels: enableExport
              ? [
                  ...(statusBar?.statusPanels || []),
                  {
                    statusPanel: 'statusBarDownloadButton',
                    statusPanelParams: {
                      exportProject,
                    },
                  },
                ]
              : statusBar?.statusPanels || [],
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
