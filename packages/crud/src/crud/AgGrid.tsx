import React from 'react'
import { AgGridReact, AgGridReactProps } from 'ag-grid-react'
import 'ag-grid-enterprise'
import { Box, BoxProps } from '@gravis-os/ui'

/**
 * Import the following in downstream app to get styles
 * @see https://nextjs.org/docs/messages/css-npm
 */
// import 'ag-grid-community/dist/styles/ag-grid.css'
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

export interface AgGridProps extends AgGridReactProps {
  sx?: BoxProps['sx']
  enableExport?: boolean
  exportProject?: string
}

const AgGrid = React.forwardRef<any, React.PropsWithChildren<AgGridProps>>(
  (props, ref) => {
    const { children, sx, enableExport, exportProject, ...rest } = props

    return (
      <Box
        sx={{ width: '100%', height: '100%', ...sx }}
        className="ag-theme-alpine"
        id="grid-wrapper"
      >
        <AgGridReact
          suppressRowClickSelection
          rowSelection="multiple"
          suppressContextMenu={enableExport}
          {...rest}
          ref={ref}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
            floatingFilter: false,
            suppressMenu: false,
            ...rest.defaultColDef,
          }}
          frameworkComponents={{
            ...rest.frameworkComponents,
          }}
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
        >
          {children}
        </AgGridReact>
      </Box>
    )
  }
)

export default AgGrid
