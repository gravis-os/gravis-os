import { useQuery } from 'react-query'

import { FilterDef } from '@gravis-os/query'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'

import { Attribute, AttributeOption } from './types'

const getDirectoryAttributesFromFilterDefs = (
  attributes?: Array<
    Attribute & {
      attribute_option: AttributeOption[]
      directory_attribute: unknown
    }
  >
): Attribute[] | undefined => {
  return attributes?.map((attribute) => {
    const {
      attribute_option: options,
      directory_attribute,
      ...rest
    } = attribute
    return { ...rest, options }
  })
}

const getFilterDefsFromAttributes = (
  attributes: Attribute[]
): [] | FilterDef[] => {
  if (!attributes?.length) return []

  return attributes.map((attribute: Attribute) => {
    const { title, options } = attribute
    return {
      key: title,
      label: title,
      name: `attr:${title}`,
      op: 'eq',
      options: options.map((option) => ({
        key: option.title,
        label: option.title,
        value: option.title,
      })),
    }
  })
}

const useDirectoryAttributesFilterDefs = (props: { directory_id?: number }) => {
  const { directory_id } = props

  const fetchDirectoryAttributes = async () => {
    return supabaseClient
      .from('attribute')
      .select(
        '*, attribute_option(*), directory_attribute!inner(*, directory!inner(*))'
      )
      .filter('is_filterable', 'eq', true)
      .filter('directory_attribute.directory.id', 'eq', directory_id)
  }
  const fetchedFilterDefs = useQuery(
    ['fetch-filter-defs-from-directory-attributes', directory_id],
    fetchDirectoryAttributes,
    { enabled: Boolean(directory_id) }
  )

  const directoryAttributes = getDirectoryAttributesFromFilterDefs(
    fetchedFilterDefs.data?.data
  )
  const filterDefsFromDirectoryAttributes =
    getFilterDefsFromAttributes(directoryAttributes)

  return filterDefsFromDirectoryAttributes
}

export default useDirectoryAttributesFilterDefs
