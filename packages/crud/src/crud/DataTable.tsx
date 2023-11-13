import type { UseListReturn } from '@gravis-os/query'
import type { CrudModule, RenderPropsFunction } from '@gravis-os/types'
import type { BodyScrollEvent } from 'ag-grid-community'

import React, { useEffect, useState } from 'react'

import { Button, Card, IconButton, Stack, Typography } from '@gravis-os/ui'
import { printSingularOrPluralText } from '@gravis-os/utils'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import { SxProps } from '@mui/material'
import ButtonGroup from '@mui/material/ButtonGroup'

import AgGrid, { AgGridProps } from './AgGrid'
// Framework Components
import AgGridModelFieldEditor from './AgGridModelFieldEditor'
import ManageColumnsMenuButton from './ManageColumnsMenuButton'
import useCrud from './useCrud'

export interface DataTableProps extends AgGridProps {
  actions?: React.ReactNode
  disableHeader?: boolean
  disableManageColumnMenu?: boolean
  disableViewSwitch?: boolean
  module?: CrudModule
  renderGridComponent?: RenderPropsFunction<{
    items
  }>
  defaultViewStyle?: 'list' | 'grid'
  /**
   * To display the total row count
   */
  serverSideRowCount?: number

  /**
   * For managing serverSide rows
   */
  serverSideRowModelProps?: {
    fetchNextPage: () => Promise<any> | void
    pagination: UseListReturn['pagination']
  }
  sx?: SxProps
  tableTitle?: React.ReactNode
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
    columnDefs: injectedColumnDefs,
    components,
    disableHeader,
    disableManageColumnMenu = false,
    disableViewSwitch = true,

    module,
    renderGridComponent,
    defaultViewStyle,
    rowData,

    // Server-side pagination
    rowModelType,

    serverSideRowCount,
    serverSideRowModelProps,
    tableTitle,

    ...rest
  } = props

  const [viewStyle, setViewStyle] = useState<'grid' | 'list'>(defaultViewStyle ?? 'list')

  const [columnDefs, setColumnDefs] = useState(injectedColumnDefs)
  useEffect(() => {
    setColumnDefs(injectedColumnDefs)
  }, [injectedColumnDefs])

  // Selection
  const {
    handleDeleteDialogOpen,
    hasMultipleSelectedItems,
    hasSelectedItems,
    selectedItems,
  } = useCrud()

  // Title
  const TitleIcon = module?.Icon

  const getAgGridPropsByRowModelType = (rowModelType) => {
    switch (rowModelType) {
      // This is our own custom serverSide function
      case 'externalServerSide': {
        const { fetchNextPage, pagination } = serverSideRowModelProps
        const { hasNextPage, nextPage, pageSize } = pagination
        return {
          // To prevent scroll from flickering back to top
          getRowId: (params) => params.data.id,
          // To fetch the next page when we reach the end of the grid
          onBodyScroll: (e: BodyScrollEvent) => {
            const { api: gridApi } = e
            const lastDisplayedRow = gridApi.getLastDisplayedRow() + 1
            const isEndOfScroll = lastDisplayedRow === rowData.length
            const shouldFetchNextPage = isEndOfScroll && hasNextPage
            if (shouldFetchNextPage) fetchNextPage()
          },
          // Load the full data by default
          rowData,
        }
      }
      default: {
        return {
          rowData,
        }
      }
    }
  }

  // AgGridProps
  const agGridProps = {
    ...getAgGridPropsByRowModelType(rowModelType),
    ...rest,
  }

  return (
    <>
      {/* Toolbar */}
      {!disableHeader && (
        <Card
          disableLastGutterBottom
          padding={1}
          square
          sx={{ borderBottom: 1, borderColor: 'divider', px: 1 }}
        >
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={1}
          >
            {/* Left */}
            <Stack alignItems="center" direction="row" spacing={1} width="100%">
              {/* Title */}
              {tableTitle ?? (
                <>
                  {TitleIcon && <TitleIcon sx={{ color: 'primary.main' }} />}
                  <Typography variant="h5">{module?.name?.plural}</Typography>
                </>
              )}

              {/* Server-side Row Count */}
              {Boolean(serverSideRowCount) && (
                <Typography
                  color="text.secondary"
                  sx={{ lineHeight: 1 }}
                  variant="body2"
                >
                  {serverSideRowCount}{' '}
                  {printSingularOrPluralText(serverSideRowCount, 'record')}
                </Typography>
              )}

              {/* Selection Count */}
              {hasSelectedItems && (
                <Typography
                  color="primary.main"
                  sx={{ lineHeight: 1 }}
                  variant="subtitle2"
                >
                  {selectedItems.length}{' '}
                  {printSingularOrPluralText(selectedItems, 'item')} selected
                </Typography>
              )}
            </Stack>

            {/* Right */}
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="flex-end"
              spacing={1}
            >
              {actions}

              {/* BulkDeleteButton */}
              {hasMultipleSelectedItems && (
                <Button
                  color="error"
                  onClick={handleDeleteDialogOpen}
                  size="small"
                  startIcon={<DeleteOutlineOutlinedIcon />}
                  sx={{ lineHeight: 1 }}
                >
                  Bulk Delete
                </Button>
              )}

              {/* View Switch */}
              {!disableViewSwitch && (
                <ButtonGroup variant="outlined">
                  <IconButton
                    aria-label="list"
                    onClick={() => setViewStyle('list')}
                    sx={{
                      ...(viewStyle === 'list' && { bgcolor: '#EEEEEE' }),
                      borderRadius: 0,
                    }}
                  >
                    <FormatListBulletedOutlinedIcon />
                  </IconButton>

                  <IconButton
                    aria-label="grid"
                    onClick={() => setViewStyle('grid')}
                    sx={{
                      ...(viewStyle === 'grid' && { bgcolor: '#EEEEEE' }),
                      borderRadius: 0,
                    }}
                  >
                    <GridViewOutlinedIcon />
                  </IconButton>
                </ButtonGroup>
              )}

              {/* ManageColumnsMenuButton */}
              {!disableManageColumnMenu && (
                <ManageColumnsMenuButton
                  columnDefs={columnDefs}
                  initialColumnDefs={injectedColumnDefs}
                  setColumnDefs={setColumnDefs}
                />
              )}
            </Stack>
          </Stack>
        </Card>
      )}

      {viewStyle === 'list' ? (
        // AgGrid
        <AgGrid
          // Ag Grid Props
          animateRows
          columnDefs={columnDefs}
          components={{
            ModelFieldEditor: AgGridModelFieldEditor,
            ...components,
          }}
          disableResizeGrid
          enableCellChangeFlash
          ref={ref}
          rowDragManaged
          rowDragMultiRow
          rowSelection="multiple"
          suppressMoveWhenRowDragging
          suppressRowClickSelection
          {...agGridProps}
        />
      ) : (
        // Grid
        renderGridComponent({ items: rowData })
      )}
    </>
  )
})

export default DataTable
