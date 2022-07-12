import React, { useRef } from 'react'
import { useUser } from '@supabase/supabase-auth-helpers/react/components/UserProvider'
import { ColDef, ColGroupDef } from 'ag-grid-community/dist/lib/entities/colDef'
import { useQuery } from 'react-query'
import { FormSectionsProps } from '@gravis-os/form'
import { CrudModule } from '@gravis-os/types'
import DataTable, { DataTableProps } from './DataTable'
import getFieldsFromFormSections from './getFieldsFromFormSections'
import CrudTableHeader, { CrudTableHeaderProps } from './CrudTableHeader'
import useRouterQueryFilters from './useRouterQueryFilters'
import useGetCrudTableColumnDefs from './useGetCrudTableColumnDefs'
import usePreviewDrawer from './usePreviewDrawer'
import { CrudFormProps } from './CrudForm'
import CrudPreviewDrawer from './CrudPreviewDrawer'
import fetchCrudItems from './fetchCrudItems'

type CrudTableColumn =
  | ColDef
  | (ColGroupDef & {
      hasAvatar?: boolean
    })

export interface CrudTableProps {
  module: CrudModule
  addModule?: CrudModule
  columnDefs?: CrudTableColumn[] | null
  setQuery?: (query) => Promise<any>
  headerProps?: Partial<CrudTableHeaderProps>
  disableAdd?: boolean
  disableDelete?: boolean
  disableManage?: boolean
  disablePreview?: boolean
  isListPage?: boolean

  previewFormSections?: FormSectionsProps['sections']
  filterFormSections?: FormSectionsProps['sections']
  searchFormSections?: FormSectionsProps['sections']
  addFormSections?: FormSectionsProps['sections']

  previewFormProps?: Partial<CrudFormProps>
  addFormProps?: Partial<CrudFormProps>
  dataTableProps?: Partial<DataTableProps>
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
    setQuery,
    isListPage,

    previewFormSections: injectedPreviewFormSections = [],
    filterFormSections = [],
    searchFormSections = [],
    addFormSections = [],

    previewFormProps,
    addFormProps,
    dataTableProps,
  } = props
  const { table, select } = module
  const { user } = useUser()

  // Filters
  const filterFields = getFieldsFromFormSections([
    ...searchFormSections,
    ...filterFormSections,
  ])
  const { filters, setFilters } = useRouterQueryFilters({ filterFields })

  // List items Fetch items with ReactQuery's composite key using filters as a dep
  const { data: items, refetch } = useQuery(
    [table.name, filters],
    () => fetchCrudItems({ filters, module, setQuery, filterFields }),
    // Only allow authenticated users to fetch CRUD items due to RLS
    { enabled: Boolean(user) }
  )

  // Preview drawer
  const usePreviewDrawerProps = usePreviewDrawer({
    module,
    previewFormSections: injectedPreviewFormSections,
  })
  const { setPreview, previewFormSections } = usePreviewDrawerProps

  // AgGrid Ref
  const gridRef = useRef(null)

  // ColumnDefs
  const columnDefs = useGetCrudTableColumnDefs({
    columnDefs: injectedColumnDefs,
    module,
    disableDelete,
    disableManage,
    // For Preview
    setPreview,
    previewFormSections,
  })

  return (
    <>
      {/* Header */}
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

      {/* Preview Drawer */}
      <CrudPreviewDrawer
        isListPage={isListPage}
        refetch={refetch}
        {...usePreviewDrawerProps}
        crudFormProps={previewFormProps}
        disableManage={disableManage}
        disablePreview={disablePreview}
      />

      {/* DataTable */}
      <DataTable
        ref={gridRef}
        rowData={items}
        columnDefs={columnDefs}
        {...dataTableProps}
      />
    </>
  )
}

export default CrudTable
