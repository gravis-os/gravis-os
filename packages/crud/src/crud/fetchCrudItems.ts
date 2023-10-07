import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import getQueryFromFilters from './getQueryFromFilters'

const supabase = createClientComponentClient()

export type FetchCrudItemsProps = any

const fetchCrudItems = async (props: FetchCrudItemsProps = {}) => {
  const { filterFields, filters = {}, module, setQuery } = props
  const { select, table } = module

  // Prepare query
  const defaultQuery = supabase
    .from(table.name)
    .select(select?.list || '*')
    .order('id', { ascending: false })

  const defaultQueryWithFilters = getQueryFromFilters({
    filterFields,
    filters,
    query: defaultQuery,
  })

  // Fire injected query via setQuery to allow for outer override
  const onQuery = await (setQuery
    ? setQuery(defaultQueryWithFilters)
    : defaultQueryWithFilters)

  const { data, error } = onQuery

  if (error) throw new Error(error.message)

  return data
}

export default fetchCrudItems
