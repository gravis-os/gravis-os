import React, { useRef } from 'react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { useUser } from '@supabase/supabase-auth-helpers/react/components/UserProvider'
import { ColDef, ColGroupDef } from 'ag-grid-community/dist/lib/entities/colDef'
import { useQuery } from 'react-query'
import { FormSectionsProps } from '@gravis-os/form'
import DataTable from './DataTable'
import { CrudModule } from './typings'
import getFieldsFromFormSections from './getFieldsFromFormSections'
import getQueryFromFilters from './getQueryFromFilters'
import CrudTableHeader, { CrudTableHeaderProps } from './CrudTableHeader'
import useRouterQueryFilters from './useRouterQueryFilters'
import getCrudTableColumnDefs from './getCrudTableColumnDefs'
import usePreviewDrawer from './usePreviewDrawer'
import { CrudFormProps } from './CrudForm'
import CrudPreviewDrawer from './CrudPreviewDrawer'

// TODO@Joel: Abstract this to useListItems()
const fetchItems = async (args: any = {}) => {
  const { filters = {}, module, setQuery, filterFields } = args
  const { table, select } = module

  // Prepare query
  const defaultQuery = supabaseClient
    .from(table.name)
    .select(select?.list || '*')
    .order('id', { ascending: false })
  const defaultQueryWithFilters = getQueryFromFilters(
    defaultQuery,
    filters,
    filterFields
  )

  // Fire query
  const onQuery = await (setQuery
    ? setQuery(defaultQueryWithFilters)
    : defaultQueryWithFilters)
  const { data, error } = onQuery

  if (error) throw new Error(error.message)

  return data
}

type CrudTableColumn =
  | ColDef
  | (ColGroupDef & {
      hasAvatar?: boolean
    })

export interface CrudTableProps {
  module: CrudModule
  columnDefs?: CrudTableColumn[] | null
  setQuery?: (query) => Promise<any>
  headerProps?: Partial<CrudTableHeaderProps>
  disableDelete?: boolean
  disableManage?: boolean
  isListPage?: boolean

  previewFormSections?: FormSectionsProps['sections']
  filterFormSections?: FormSectionsProps['sections']
  searchFormSections?: FormSectionsProps['sections']
  addFormSections?: FormSectionsProps['sections']

  previewFormProps?: Partial<CrudFormProps>
  addFormProps?: Partial<CrudFormProps>
}

const CrudTable: React.FC<CrudTableProps> = (props) => {
  const {
    module,
    columnDefs: injectedColumnDefs,

    headerProps,
    disableDelete,
    disableManage,
    setQuery,
    isListPage,

    previewFormSections: injectedPreviewFormSections = [],
    filterFormSections = [],
    searchFormSections = [],
    addFormSections = [],

    previewFormProps,
    addFormProps,
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
    () => fetchItems({ filters, module, setQuery, filterFields }),
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
  const columnDefs = getCrudTableColumnDefs({
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
      />

      {/* DataTable */}
      <DataTable ref={gridRef} rowData={items} columnDefs={columnDefs} />
    </>
  )
}

export default CrudTable
