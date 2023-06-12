import React, { useRef } from 'react'
import { useUser } from '@gravis-os/auth'
import type { FormSectionsProps } from '@gravis-os/form'
import { CrudModule } from '@gravis-os/types'
import { getObjectWithGetters } from '@gravis-os/utils'
import { useList, UseListPaginationType, UseListProps } from '@gravis-os/query'
import DataTable, { DataTableProps } from './DataTable'
import getFieldsFromFormSections from './getFieldsFromFormSections'
import CrudTableHeader, { CrudTableHeaderProps } from './CrudTableHeader'
import useRouterQueryFilters from './useRouterQueryFilters'
import useGetCrudTableColumnDefs, {
  UseGetCrudTableColumnDefsProps,
} from './useGetCrudTableColumnDefs/useGetCrudTableColumnDefs'
import usePreviewDrawer from './usePreviewDrawer'
import { CrudFormProps } from './CrudForm'
import CrudPreviewDrawer from './CrudPreviewDrawer'
import { CrudTableColumnDef } from '../types'
import useCrud from './useCrud'
import CrudDeleteDialog, { CrudDeleteDialogProps } from './CrudDeleteDialog'
import CrudTableFilterTabs, {
  CrudTableFilterTabsProps,
} from './CrudTableFilterTabs'
import { FilterFormProps } from './FilterForm'

export interface CrudTableProps {
  module: CrudModule
  addModule?: CrudModule
  columnDefs?: CrudTableColumnDef[]
  setQuery?: UseListProps['setQuery']
  headerProps?: Partial<CrudTableHeaderProps>
  disableAdd?: boolean
  disableDelete?: boolean
  disableManage?: boolean
  disablePreview?: boolean
  disableTitle?: boolean
  disableActions?: boolean
  disableServerSideRowModel?: boolean
  isListPage?: boolean
  disableUpload?: CrudTableHeaderProps['disableUpload']
  uploadFields?: string[]
  manyToManyKeys?: string[]
  getUploadValues?: (rows: unknown) => unknown

  filterTabs?: CrudTableFilterTabsProps['items']
  filterTabsProps?: CrudTableFilterTabsProps

  previewFormSections?: FormSectionsProps['sections']
  filterFormSections?: FormSectionsProps['sections']
  searchFormSections?: FormSectionsProps['sections']
  addFormSections?: FormSectionsProps['sections']
  previewFormProps?: Partial<CrudFormProps>
  addFormProps?: Partial<CrudFormProps>
  dataTableProps?: Partial<DataTableProps>
  useGetCrudTableColumnDefsProps?: UseGetCrudTableColumnDefsProps
  crudDeleteDialogProps?: Omit<CrudDeleteDialogProps, 'module'>
  useListProps?: Partial<UseListProps>
  filterFormProps?: Partial<FilterFormProps>

  actions?: React.ReactNode
}

const CrudTable: React.FC<CrudTableProps> = (props) => {
  const {
    module,
    addModule = module,
    columnDefs: injectedColumnDefs,
    isListPage,
    disableUpload,

    // Data
    setQuery,

    // Disables
    disableAdd,
    disableDelete,
    disableManage,
    disablePreview,
    disableTitle,
    disableActions,
    disableServerSideRowModel,

    // Tabs
    filterTabs = [],
    filterTabsProps,

    // Form Sections
    previewFormSections: injectedPreviewFormSections = [],
    filterFormSections = [],
    searchFormSections = [],
    addFormSections = [],
    uploadFields,
    manyToManyKeys,
    getUploadValues,

    // Props
    headerProps,
    previewFormProps,
    addFormProps,
    dataTableProps: injectedDataTableProps,
    useGetCrudTableColumnDefsProps,
    crudDeleteDialogProps,
    useListProps,
    filterFormProps,
  } = props
  // Contexts
  const { user } = useUser()
  const onUseCrud = useCrud()
  const { setSelectedItems } = onUseCrud

  // Filters
  const filterFields = getFieldsFromFormSections([
    ...searchFormSections,
    ...filterFormSections,
  ])
  const { filters, setFilters } = useRouterQueryFilters({ filterFields })

  // List Query
  const onUseList = useList({
    module,
    disableWorkspacePlugin: true,
    filterByQueryString: true,
    defaultSortOrder: 'id.desc',
    ...useListProps,
    pagination: { pageSize: 100, ...useListProps?.pagination },
    queryOptions: { enabled: Boolean(user), ...useListProps?.queryOptions },
    setQuery,
  })
  const { items: fetchedItems, refetch, pagination, fetchNextPage } = onUseList

  // Add virtuals
  const items =
    module &&
    fetchedItems?.map((item) => getObjectWithGetters(item, module.virtuals))

  // Preview drawer
  const usePreviewDrawerProps = usePreviewDrawer({
    module,
    previewFormSections: injectedPreviewFormSections,
  })
  const { setPreview, previewFormSections } = usePreviewDrawerProps

  // AgGrid Ref
  const gridRef = useRef(null)

  // DataTable props
  const dataTableProps = {
    onSelectionChanged: (event) => {
      const selectedRows = event.api.getSelectedNodes()
      const selectedRowData = selectedRows?.map(({ data }) => data)
      setSelectedItems(selectedRowData)
    },

    // By default, fetch data from server-side paginated
    ...(!disableServerSideRowModel && {
      rowModelType: 'externalServerSide',
      height: '60vh',
      serverSideRowModelProps: {
        pagination,
        fetchNextPage,
        paginationType:
          useListProps?.pagination?.paginationType ??
          UseListPaginationType.Infinite,
      },
      serverSideRowCount: onUseList?.count,
    }),

    ...injectedDataTableProps,
  }

  // ColumnDefs
  const columnDefs = useGetCrudTableColumnDefs({
    columnDefs: injectedColumnDefs,
    module,
    disableDelete,
    disableManage,
    disablePreview,
    disableTitle,
    disableActions,
    user,
    // For Preview
    setPreview,
    previewFormSections,
    // Expose extension
    ...useGetCrudTableColumnDefsProps,
  })

  return (
    <div>
      {/* Search + Add Row */}
      <CrudTableHeader
        module={module}
        disableUpload={disableUpload}
        uploadFields={uploadFields}
        manyToManyKeys={manyToManyKeys}
        getUploadValues={getUploadValues}
        disableAdd={disableAdd}
        addModule={addModule}
        filters={filters}
        setFilters={setFilters}
        searchFormSections={searchFormSections}
        filterFormSections={filterFormSections}
        addFormSections={addFormSections}
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
        module={module}
        ref={gridRef}
        rowData={items}
        columnDefs={columnDefs}
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
