import React, { useRef } from 'react'
import { useUser } from '@gravis-os/auth'
import { useQuery } from 'react-query'
import { FormSectionFieldProps, FormSectionsProps } from '@gravis-os/form'
import { CrudModule } from '@gravis-os/types'
import { getObjectWithGetters } from '@gravis-os/utils'
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
import fetchCrudItems from './fetchCrudItems'
import { CrudTableColumnDef } from '../types'
import useCrud from './useCrud'
import CrudDeleteDialog, { CrudDeleteDialogProps } from './CrudDeleteDialog'

export interface CrudTableProps {
  module: CrudModule
  addModule?: CrudModule
  columnDefs?: CrudTableColumnDef[]
  setQuery?: (query) => Promise<any>
  headerProps?: Partial<CrudTableHeaderProps>
  disableAdd?: boolean
  disableDelete?: boolean
  disableManage?: boolean
  disablePreview?: boolean
  disableTitle?: boolean
  disableActions?: boolean
  isListPage?: boolean

  previewFormSections?: FormSectionsProps['sections']
  filterFormSections?: FormSectionsProps['sections']
  searchFormSections?: FormSectionsProps['sections']
  addFormSections?: FormSectionsProps['sections']
  previewFormProps?: Partial<CrudFormProps>
  addFormProps?: Partial<CrudFormProps>
  dataTableProps?: Partial<DataTableProps>
  useGetCrudTableColumnDefsProps?: UseGetCrudTableColumnDefsProps
  crudDeleteDialogProps?: Omit<CrudDeleteDialogProps, 'module'>

  actions?: React.ReactNode
  filters?: Record<string, any>
  filterFields?: FormSectionFieldProps[]
}

const CrudTable: React.FC<CrudTableProps> = (props) => {
  const {
    module,
    addModule = module,
    columnDefs: injectedColumnDefs,

    headerProps,
    disableAdd,
    disableDelete,
    disableManage,
    disablePreview,
    disableTitle,
    disableActions,
    setQuery,
    isListPage,

    previewFormSections: injectedPreviewFormSections = [],
    filterFormSections = [],
    searchFormSections = [],
    addFormSections = [],

    previewFormProps,
    addFormProps,
    dataTableProps: injectedDataTableProps,
    useGetCrudTableColumnDefsProps,
    crudDeleteDialogProps,

    actions,
    filters: injectedFilters,
    filterFields: injectedFilterFields,
  } = props
  const { table } = module
  const { user } = useUser()

  // Filters
  const filterFields = getFieldsFromFormSections([
    ...searchFormSections,
    ...filterFormSections,
  ])
  const { filters, setFilters } = useRouterQueryFilters({ filterFields })

  const combinedFilters = {
    ...filters,
    ...injectedFilters,
  }
  const combinedFilterFields = (filterFields || []).concat(
    injectedFilterFields || []
  )

  // TODO: This needs to be refactored for server-side pagination and filtering
  // List items Fetch items with ReactQuery's composite key using filters as a dep
  const { data: fetchedItems, refetch } = useQuery(
    [table.name, 'list', combinedFilters],
    () =>
      fetchCrudItems({
        filters: combinedFilters,
        module,
        setQuery,
        filterFields: combinedFilterFields,
      }),
    // Only allow authenticated users to fetch CRUD items due to RLS
    { enabled: Boolean(user) }
  )

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

  // CrudContext
  const onUseCrud = useCrud()
  const { setSelectedItems } = onUseCrud

  // AgGrid Ref
  const gridRef = useRef(null)
  const dataTableProps = {
    ...injectedDataTableProps,
    onSelectionChanged: (event) => {
      const selectedRows = event.api.getSelectedNodes()
      const selectedRowData = selectedRows?.map(({ data }) => data)
      setSelectedItems(selectedRowData)
    },
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
      />
      {/* Additional actions (eg. tabs, etc. ) */}
      {actions}

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
