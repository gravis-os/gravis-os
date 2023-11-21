import type { FormSectionsProps } from '@gravis-os/form'

import React, { useEffect, useMemo, useRef } from 'react'

import { useUser } from '@gravis-os/auth'
import { UseListProps, useList } from '@gravis-os/query'
import { CrudModule } from '@gravis-os/types'
import { getObjectWithGetters } from '@gravis-os/utils'
import { RowModelType } from 'ag-grid-community'
// eslint-disable-next-line unicorn/prefer-node-protocol
import { createHash } from 'crypto'
import assign from 'lodash/assign'
import isEqual from 'lodash/isEqual'
import reduce from 'lodash/reduce'
import size from 'lodash/size'
import sortBy from 'lodash/sortBy'

import { CrudTableColumnDef } from '../types'
import CrudDeleteDialog, { CrudDeleteDialogProps } from './CrudDeleteDialog'
import { CrudFormProps } from './CrudForm'
import CrudPreviewDrawer from './CrudPreviewDrawer'
import CrudTableFilterTabs, {
  CrudTableFilterTabsProps,
} from './CrudTableFilterTabs'
import CrudTableHeader, { CrudTableHeaderProps } from './CrudTableHeader'
import DataTable, { DataTableProps } from './DataTable'
import { FilterFormProps } from './FilterForm'
import getFieldsFromFormSections from './getFieldsFromFormSections'
import useCrud from './useCrud'
import useGetCrudTableColumnDefs, {
  UseGetCrudTableColumnDefsProps,
} from './useGetCrudTableColumnDefs/useGetCrudTableColumnDefs'
import usePreviewDrawer from './usePreviewDrawer'
import useRouterQueryFilters from './useRouterQueryFilters'

export interface CrudTableProps {
  actions?: React.ReactNode
  addFormProps?: Partial<CrudFormProps>
  addFormSections?: FormSectionsProps['sections']
  addModule?: CrudModule
  columnDefs?: CrudTableColumnDef[]
  crudDeleteDialogProps?: Omit<CrudDeleteDialogProps, 'module'>
  dataTableProps?: Partial<DataTableProps>
  disableActions?: boolean
  disableAdd?: boolean
  disableDelete?: boolean
  disableManage?: boolean
  disablePreview?: boolean
  disableServerSideRowModel?: boolean
  disableTitle?: boolean
  disableUpload?: CrudTableHeaderProps['disableUpload']
  filterFormProps?: Partial<FilterFormProps>
  filterFormSections?: FormSectionsProps['sections']

  filterTabs?: CrudTableFilterTabsProps['items']
  filterTabsProps?: CrudTableFilterTabsProps

  getUploadValues?: (rows: unknown) => unknown
  headerProps?: Partial<CrudTableHeaderProps>
  isListPage?: boolean
  manyToManyKeys?: string[]
  module: CrudModule
  previewFormProps?: Partial<CrudFormProps>
  previewFormSections?: FormSectionsProps['sections']
  searchFormSections?: FormSectionsProps['sections']
  setQuery?: UseListProps['setQuery']
  uploadFields?: string[]
  useGetCrudTableColumnDefsProps?: UseGetCrudTableColumnDefsProps

  useListProps?: Partial<UseListProps>
}

const CrudTable: React.FC<CrudTableProps> = (props) => {
  const {
    addFormProps,
    addFormSections = [],
    module,
    addModule = module,
    columnDefs: injectedColumnDefs,

    crudDeleteDialogProps,

    dataTableProps: injectedDataTableProps,
    disableActions,
    // Disables
    disableAdd,
    disableDelete,
    disableManage,
    disablePreview,
    disableServerSideRowModel,

    disableTitle,
    disableUpload,

    filterFormProps,
    filterFormSections = [],
    // Tabs
    filterTabs = [],
    filterTabsProps,
    getUploadValues,
    // Props
    headerProps,
    isListPage,

    manyToManyKeys,
    previewFormProps,
    // Form Sections
    previewFormSections: injectedPreviewFormSections = [],
    searchFormSections = [],
    // Data
    setQuery,
    uploadFields,
    useGetCrudTableColumnDefsProps,
    useListProps,
  } = props
  // Contexts
  const { user } = useUser()
  const onUseCrud = useCrud()
  const { crudQueryOptions, setSelectedItems } = onUseCrud

  // Filters
  const filterFields = getFieldsFromFormSections([
    ...searchFormSections,
    ...filterFormSections,
  ])
  const { filters, setFilters } = useRouterQueryFilters({ filterFields })

  // List Query
  const onUseListProps = {
    defaultSortOrder: 'id.desc',
    disableWorkspacePlugin: true,
    filterByQueryString: true,
    module,
    ...useListProps,
    pagination: { pageSize: 100, ...useListProps?.pagination },
    queryOptions: {
      enabled: Boolean(user),
      ...crudQueryOptions,
      ...useListProps?.queryOptions,
    },
    setQuery,
  }
  const onUseList = useList(onUseListProps)
  const {
    count,
    fetchNextPage,
    isFetching,
    items: fetchedItems,
    pagination,
    refetch,
  } = onUseList

  // Add virtuals
  const items =
    module &&
    fetchedItems?.map((item) => getObjectWithGetters(item, module.virtuals))

  // Preview drawer
  const usePreviewDrawerProps = usePreviewDrawer({
    module,
    previewFormSections: injectedPreviewFormSections,
  })
  const { previewFormSections, setPreview } = usePreviewDrawerProps

  const getSavedColumnStateKey = () => {
    const uniqHash = createHash('sha256')
      .update(
        JSON.stringify({
          injectedColumnDefs,
          name: module.table.name,
          onUseListProps,
        })
      )
      .digest('base64')

    return `${uniqHash}-table-config`
  }

  // AgGrid Ref
  const gridRef = useRef(null)
  const savedColumnStateKey = useMemo(
    () => getSavedColumnStateKey(),
    [injectedColumnDefs, onUseListProps]
  )
  const savedColumnState = JSON.parse(
    localStorage.getItem(savedColumnStateKey) ?? '[]'
  )

  useEffect(() => {
    const gridApi = gridRef.current?.api

    if (isFetching) {
      gridApi?.showLoadingOverlay()
      return
    }

    if (size(items) === 0) {
      gridApi?.showNoRowsOverlay()
      return
    }

    gridApi?.hideOverlay()
  }, [isFetching, items])

  // DataTable props
  const dataTableProps: DataTableProps = {
    onColumnEverythingChanged: (props) => {
      const { columnApi, source } = props

      if (source !== 'gridOptionsChanged') return

      const columnState = columnApi.getColumnState()

      // ignore if new changes are identical to original
      if (
        isEqual(
          columnState?.map((col) => Boolean(col.hide)),
          columnDefs?.map((col) => Boolean(col.hide))
        )
      ) {
        return
      }

      localStorage.setItem(savedColumnStateKey, JSON.stringify(columnState))
    },
    onColumnMoved: (props) => {
      const { columnApi } = props
      const columnState = columnApi.getColumnState()

      localStorage.setItem(savedColumnStateKey, JSON.stringify(columnState))
    },
    onSelectionChanged: (event) => {
      const selectedRows = event.api.getSelectedNodes()
      const selectedRowData = selectedRows?.map(({ data }) => data)
      setSelectedItems(selectedRowData)
    },
    // By default, fetch data from server-side paginated
    ...(!disableServerSideRowModel && {
      height: '60vh',
      rowModelType: 'externalServerSide' as RowModelType,
      serverSideRowCount: count,
      serverSideRowModelProps: { fetchNextPage, pagination },
    }),
    ...injectedDataTableProps,
  }

  const nextColumnDefs = useMemo(() => {
    const savedColConfigMappings = reduce(
      savedColumnState,
      (acc, colState, index) =>
        assign(acc, {
          [colState.colId]: {
            hide: colState.hide,
            index,
          },
        }),
      {}
    )

    return sortBy(
      injectedColumnDefs?.map((colDef) => ({
        ...colDef,
        hide: savedColConfigMappings[colDef.colId ?? colDef.field]?.hide,
      })),
      (colDef) => savedColConfigMappings[colDef.colId ?? colDef.field]?.index
    )
  }, [savedColumnState, injectedColumnDefs])

  // ColumnDefs
  const columnDefs = useGetCrudTableColumnDefs({
    columnDefs: nextColumnDefs,
    disableActions,
    disableDelete,
    disableManage,
    disablePreview,
    disableTitle,
    module,
    previewFormSections,
    // For Preview
    setPreview,
    user,
    // Expose extension
    ...useGetCrudTableColumnDefsProps,
  })

  return (
    <div>
      {/* Search + Add Row */}
      <CrudTableHeader
        addFormSections={addFormSections}
        addModule={addModule}
        disableAdd={disableAdd}
        disableUpload={disableUpload}
        filterFormSections={filterFormSections}
        filters={filters}
        getUploadValues={getUploadValues}
        manyToManyKeys={manyToManyKeys}
        module={module}
        searchFormSections={searchFormSections}
        setFilters={setFilters}
        uploadFields={uploadFields}
        {...headerProps}
        addDialogProps={{
          crudFormProps: addFormProps,
          ...headerProps?.addDialogProps,
        }}
        filterFormProps={filterFormProps}
      />

      {/* Filter Tabs */}
      {Boolean(filterTabs?.length) && (
        <CrudTableFilterTabs items={filterTabs} {...filterTabsProps} />
      )}

      {/* DataTable + Toolbar Row */}
      <DataTable
        columnDefs={columnDefs}
        module={module}
        ref={gridRef}
        rowData={items}
        {...dataTableProps}
      />

      {/* Preview Drawer */}
      <CrudPreviewDrawer
        isListPage={isListPage}
        refetch={refetch}
        {...usePreviewDrawerProps}
        crudFormProps={previewFormProps}
        disableManage={disableManage}
        disablePreview={disablePreview}
      />

      {/* Delete Dialog */}
      <CrudDeleteDialog {...crudDeleteDialogProps} module={module} />
    </div>
  )
}

export default CrudTable
