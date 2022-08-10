import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import getQueryFromFilters from './getQueryFromFilters'

export type FetchCrudItemsProps = any

const fetchCrudItems = async (props: FetchCrudItemsProps = {}) => {
  const { filters = {}, module, setQuery, filterFields } = props
  const { table, select } = module

  // Prepare query
  const defaultQuery = supabaseClient
    .from(table.name)
    .select(select?.list || '*')
    .order('id', { ascending: false })

  const defaultQueryWithFilters = getQueryFromFilters({
    query: defaultQuery,
    filters,
    filterFields,
  })

  // Fire query
  const onQuery = await (setQuery
    ? setQuery(defaultQueryWithFilters)
    : defaultQueryWithFilters)
  const { data, error } = onQuery

  if (error) throw new Error(error.message)

  return data
}

export default fetchCrudItems
