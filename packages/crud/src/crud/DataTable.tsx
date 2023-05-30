import React, { useEffect, useState } from 'react'
import { SxProps } from '@mui/material'
import ButtonGroup from '@mui/material/ButtonGroup'
import { Button, Card, IconButton, Stack, Typography } from '@gravis-os/ui'
import type { CrudModule, RenderPropsFunction } from '@gravis-os/types'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import { printSingularOrPluralText } from '@gravis-os/utils'
import type { BodyScrollEvent } from 'ag-grid-community'
import type { UseListReturn } from '@gravis-os/query'
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
  /**
   * For managing serverSide rows
   */
  serverSideRowModelProps?: {
    pagination: UseListReturn['pagination']
    fetchNextPage: () => void | Promise<any>
  }
  /**
   * To display the total row count
   */
  serverSideRowCount?: number
  tableTitle?: React.ReactNode

  disableManageColumnMenu?: boolean
  disableViewSwitch?: boolean
  renderGridComponent?: RenderPropsFunction<{
    items
  }>
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
    components,
    rowData,
    columnDefs: injectedColumnDefs,
    module,
    disableHeader,

    // Server-side pagination
    rowModelType,
    serverSideRowModelProps,
    serverSideRowCount,

    tableTitle,

    disableManageColumnMenu = false,
    disableViewSwitch = true,
    renderGridComponent,

    ...rest
  } = props

  const [viewStyle, setViewStyle] = useState<'list' | 'grid'>('list')

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

  const getAgGridPropsByRowModelType = (rowModelType) => {
    switch (rowModelType) {
      // This is our own custom serverSide function
      case 'externalServerSide':
        const { pagination, fetchNextPage } = serverSideRowModelProps
        const { pageSize, hasNextPage, nextPage } = pagination
        return {
          // Load the full data by default
          rowData,
          // To fetch the next page when we reach the end of the grid
          onBodyScroll: (e: BodyScrollEvent) => {
            const { api: gridApi } = e
            const lastDisplayedRow = gridApi.getLastDisplayedRow() + 1
            const isEndOfScroll = lastDisplayedRow === rowData.length
            const shouldFetchNextPage = isEndOfScroll && hasNextPage
            if (shouldFetchNextPage) fetchNextPage()
          },
          // To prevent scroll from flickering back to top
          getRowId: (params) => params.data.id,
        }
      default:
        return {
          rowData,
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
          square
          disableLastGutterBottom
          padding={1}
          sx={{ borderBottom: 1, px: 1, borderColor: 'divider' }}
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
              {tableTitle ?? (
                <>
                  {TitleIcon && <TitleIcon sx={{ color: 'primary.main' }} />}
                  <Typography variant="h5">{module?.name?.plural}</Typography>
                </>
              )}

              {/* Server-side Row Count */}
              {Boolean(serverSideRowCount) && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1 }}
                >
                  {serverSideRowCount}{' '}
                  {printSingularOrPluralText(serverSideRowCount, 'record')}
                </Typography>
              )}

              {/* Selection Count */}
              {hasSelectedItems && (
                <Typography
                  variant="subtitle2"
                  color="primary.main"
                  sx={{ lineHeight: 1 }}
                >
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
                  initialColumnDefs={injectedColumnDefs}
                  columnDefs={columnDefs}
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
          components={{
            ModelFieldEditor: AgGridModelFieldEditor,
            ...components,
          }}
          ref={ref}
          columnDefs={columnDefs}
          // Ag Grid Props
          animateRows
          disableResizeGrid
          enableCellChangeFlash
          rowSelection="multiple"
          rowDragManaged
          rowDragMultiRow
          suppressRowClickSelection
          suppressMoveWhenRowDragging
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
